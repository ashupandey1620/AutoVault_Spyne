/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [state, setState] = useState("");
  const [userData, setUserData] = useState({});
  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        userData,
        setUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}
