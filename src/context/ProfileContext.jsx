/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const EMPTY_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  location: "",
  joinedDate: "",
  department: "",
};

const ProfileContext = createContext(null);

const normalizeProfile = (value) => {
  const savedProfile = value && typeof value === "object" ? value : {};

  return Object.fromEntries(
    Object.keys(EMPTY_PROFILE).map((key) => [
      key,
      typeof savedProfile[key] === "string" ? savedProfile[key] : "",
    ]),
  );
};

export function ProfileProvider({ children }) {
  const [storedProfile, setStoredProfile] = useLocalStorage(
    "startup-crm-profile",
    EMPTY_PROFILE,
  );
  const profile = useMemo(() => normalizeProfile(storedProfile), [storedProfile]);

  const setProfile = useCallback((value) => {
    setStoredProfile((currentProfile) => {
      const current = normalizeProfile(currentProfile);
      const nextProfile =
        value instanceof Function ? value(current) : value;

      return normalizeProfile(nextProfile);
    });
  }, [setStoredProfile]);

  const contextValue = useMemo(
    () => ({ profile, setProfile }),
    [profile, setProfile],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
}
