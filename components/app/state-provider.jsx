"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AppStateContext = createContext(null);

const useAppState = () => {
  const appState = useContext(AppStateContext);

  return appState;
};

const isObj = (value) =>
  value && typeof value === "object" && !Array.isArray(value);

const deepMerge = (from, to) => {
  const result = { ...to };

  for (let prop in from) {
    if (isObj(to[prop]) && isObj(from[prop])) {
      result[prop] = deepMerge(from[prop], to[prop]);
    } else {
      if (prop in to) {
        result[prop] = to[prop];
      } else {
        result[prop] = from[prop];
      }
    }
  }

  return result;
};

const AppStateProvider = ({ children, defaultValues = {} }) => {
  const [values, setValues] = useState(defaultValues);

  const setVals = useCallback((vals) => {
    console.log("vals: ", vals);
    setValues((state) => deepMerge(state, vals));
  }, []);

  const providerValue = useMemo(
    () => ({
      values,
      setValues: setVals,
    }),
    [values, setVals]
  );

  return (
    <AppStateContext.Provider value={providerValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateProvider, useAppState };
