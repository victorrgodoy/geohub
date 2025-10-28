import { RouterProvider } from "react-router-dom";
import { router } from "./router"
import { ThemeProvider } from "../context/theme/themeProvider";
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;