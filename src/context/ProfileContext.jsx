/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const emptyProfile = {
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
    Object.keys(emptyProfile).map((key) => [
      key,
      typeof savedProfile[key] === "string" ? savedProfile[key] : "",
    ]),
  );
};

export function ProfileProvider({ children }) {
  const [storedProfile, setStoredProfile] = useLocalStorage(
    "startup-crm-profile",
    emptyProfile,
  );
  const profile = normalizeProfile(storedProfile);

  const setProfile = (value) => {
    setStoredProfile((currentProfile) => {
      const current = normalizeProfile(currentProfile);
      const nextProfile =
        value instanceof Function ? value(current) : value;

      return normalizeProfile(nextProfile);
    });
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
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
