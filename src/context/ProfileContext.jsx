/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@startupcrm.io",
  phone: "9876543210",
  company: "Acme Enterprises",
  role: "Founder & CEO",
  location: "San Francisco, CA",
  joinedDate: "June 2025",
  department: "Executive Operations",
};

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useLocalStorage(
    "startup-crm-profile",
    defaultProfile,
  );

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
