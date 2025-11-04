import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import { OverviewWithSuspense } from "./pages/overview/OverviewWithSuspense";
import Continent from "./pages/continent/Continent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <OverviewWithSuspense /> },
      { path: "continent/:continentId/country", element:<Continent/>}
    ],
  },
]);
