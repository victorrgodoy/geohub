import { useContext } from "react";
import { ThemeContext } from "../context/theme/themeContext";

function ThemeController() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <input
      type="checkbox"
      className="
                toggle toggle-sm
                bg-(--color-primary)/60
                border-none  text-(--color-background)/80"
      checked={theme === "dark"}
      onChange={toggleTheme}
    />
  );
}

export default ThemeController;
