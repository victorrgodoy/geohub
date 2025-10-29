import { useContext } from "react";
import { theme as antdTheme } from "antd";
import { ThemeContext } from "../context/theme/themeContext";

export const useCustomTheme = () => {
  const { theme } = useContext(ThemeContext);

  return {
    algorithm: theme ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };
};
