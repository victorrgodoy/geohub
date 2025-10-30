import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "../context/theme/themeProvider";
import { ContinentProvider } from "../context/continent/continentProvider";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ContinentProvider>
        <RouterProvider router={router} />
      </ContinentProvider>
    </ThemeProvider>
  );
}

export default App;
