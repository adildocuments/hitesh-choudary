import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./routes/indexRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <IndexRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
