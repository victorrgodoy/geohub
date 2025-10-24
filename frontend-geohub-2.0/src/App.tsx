import { Routes, Route } from "react-router-dom";

//layout
import Layout from './app/layout';
import Overview from "./app/pages/overview";

//context
import { ThemeProvider } from "./context/theme/themeProvider";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;