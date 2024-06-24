//#region imports
import { createContext, useContext } from "react";
import useAsyncStorage from "../services/useAsyncStorage";
//#endregion imports

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  //#region Background Save
  const { set: setDarkMode, value: isDarkMode } = useAsyncStorage(
    "DarkMode",
    false
  );

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    //#region Background children
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
    //#endregion
  );
  //#endregion
};

export const useTheme = () => useContext(ThemeContext);
