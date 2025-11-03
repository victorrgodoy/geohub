import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Overview from "./pages/overview/Overview";
import Continent from "./pages/continent/Continent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "continent/:continentId/country", element:<Continent/>}
    ],
  },
]);
