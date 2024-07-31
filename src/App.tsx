import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./routes/indexRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <IndexRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
