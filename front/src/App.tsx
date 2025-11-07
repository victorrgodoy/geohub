import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import ContinentsPage from "./pages/ContinentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ContinentsPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
