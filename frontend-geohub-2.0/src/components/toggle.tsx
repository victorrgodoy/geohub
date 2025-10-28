import { useContext } from "react";
import { ThemeContext } from "../context/theme/themeContext";

function ThemeController() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <input 
            type="checkbox" 
            className="
                toggle toggle-sm 
                bg-(--color-background)
                border-gray-400 text-(--color-text)" 
            checked={theme === "dark"}
            onChange={toggleTheme}
            />
    )
}

export default ThemeController;