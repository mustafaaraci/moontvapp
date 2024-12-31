import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

//burasının biraz karışık olduğunu düşünüyorum.yapıcaz
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = {
    isDarkTheme,
    colors: isDarkTheme
      ? {
          background: "#000000",
          headerBackground: "#000000",
          text: "#ffffff",
          icon: "#ffffff",
          iconTabBar: "#737373",
          textTabBar: "#737373",
          selectedIconTabBar: "#ffffff",
          selectedTextTabBar: "#ffffff",
          selectedText: "#333333",
          border: "#444444",
          card: "#1e1e1e",
        }
      : {
          background: "#ffffff",
          headerBackground: "#ffffff",
          text: "#000000",
          icon: "#4a044e",
          iconTabBar: "#737373",
          textTabBar: "#737373",
          selectedIconTabBar: "#4a044e",
          selectedTextTabBar: "#4a044e",
          selectedText: "#000000",
          border: "#dddddd",
          card: "#f5f5f5",
        },
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

//custom hook oluşturduk
export const useTheme = () => useContext(ThemeContext);
