import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./themeContext";

type Props = {
  children: ReactNode;
};

export function ThemeProvider({children}: Props){
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const body = document.body;
    body.classList.remove("dark", "light")
    body.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return(
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
} 