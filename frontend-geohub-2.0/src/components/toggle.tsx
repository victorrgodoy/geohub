import { useContext } from "react";
import { ThemeContext } from "../context/theme/themeContext";

function ThemeController() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <input
      type="checkbox"
      className="
                toggle toggle-sm
                bg-(--color-primary-700)
                border-none  text-(--color-bg-secondary)"
      checked={theme === "dark"}
      onChange={toggleTheme}
    />
  );
}

export default ThemeController;
