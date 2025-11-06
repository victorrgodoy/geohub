import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import OverviewPage from "./pages/OverviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
