import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
// import Dashboard from "./pages/Dashboard";
import Continent from "./pages/Continent";
import Country from "./pages/Country";
// import Country from "./pages/Country";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index:true, element: <Continent /> },
      {
        path: "/continent/:continentId/country",
        element: <Country/>
      }
    ],
  },
]);
