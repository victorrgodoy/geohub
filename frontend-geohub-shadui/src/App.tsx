import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/theme/themeProvider";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
