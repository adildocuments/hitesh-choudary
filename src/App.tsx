import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "@/routes/IndexRoutes";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <QueryClientProvider client={queryClient}>
          <IndexRoutes />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
