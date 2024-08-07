import { Routes, Route } from "react-router-dom";
import SignupPage from "@/pages/auth/SignupPage";
import LoginPage from "@/pages/auth/LoginPage";
import PrivateRoutes from "./PrivateRoutes";
import CommanRoutes from "./CommanRoutes";

const IndexRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<CommanRoutes />}>
          <Route path="/" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Route>
        <Route path="/app" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<h1>Dashboard...</h1>}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default IndexRoutes;
