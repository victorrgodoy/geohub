import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import OverviewPage from "./pages/OverviewPage";
import ContinentsPage from "./pages/ContinentsPage";
import CountriesPage from "./pages/CountriesPage";
import CitiesPage from "./pages/CitiesPage";

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
        element: <ContinentsPage />,
      },
      {
        path: "countries",
        element: <CountriesPage />,
      },
      {
        path: "cities",
        element: <CitiesPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
