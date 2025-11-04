import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/theme/themeProvider";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageTitleProvider } from "./context/pageTitle/pageTitleProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <PageTitleProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      </PageTitleProvider>
    </ThemeProvider>
  );
}

export default App;
