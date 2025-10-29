import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./routes/Dashboard";
import Continent from "./routes/Continent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      // {path: "/city", element: <City/>}
      // {path: "/country", element: <Country/>}
      { path: "/continent", element: <Continent /> },
    ],
  },
]);
