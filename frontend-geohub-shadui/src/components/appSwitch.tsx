import { useContext } from "react";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { ThemeContext } from "../context/theme/themeContext";

export function AppSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center space-x-2 ">
      <Switch
        id="dark-mode"
        className="cursor-pointer data-[state=checked]:bg-foreground data-[state=unchecked]:bg-foreground "
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <Label htmlFor="dark-mode">Dark mode</Label>
    </div>
  );
}
