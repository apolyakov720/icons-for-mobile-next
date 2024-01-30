"use client";

import { createContext, useContext } from "react";

const AppStateContext = createContext(null);

const useAppState = () => {
  const appState = useContext(AppStateContext);

  return appState;
};

const AppStateProvider = ({ children, defaultValue = {} }) => {
  return (
    <AppStateContext.Provider value={defaultValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateProvider, useAppState };
