import { useContext } from "react";

//context
import { ThemeContext } from "../context/theme/themeContext";

function ThemeController() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <input 
            type="checkbox" 
            className="
                toggle toggle-sm theme-controller 
                border-(--color-text) text-(--color-text)" 
            checked={theme === "dark"}
            onChange={toggleTheme}
            />
    )
}

export default ThemeController;