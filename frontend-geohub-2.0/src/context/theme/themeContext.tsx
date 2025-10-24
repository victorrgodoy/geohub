import { createContext } from "react";

type ThemeContextType = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => {}
});
