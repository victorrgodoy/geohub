import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import OverviewPage from "./pages/OverviewPage";
import ContinentsManagePage from "./pages/ContinentsManagePage";
import CountriesPage from "./pages/CountriesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "continents",
        element: <ContinentsManagePage />,
      },
      {
        path: "continents/:continentId/countries",
        element: <CountriesPage />,
      },
      {
        path: "countries",
        element: <CountriesPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
