import { Routes, Route } from "react-router-dom";
import SignupPage from "@/pages/auth/SignupPage";
const indexRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<SignupPage />}></Route>
        <Route path="login" element={<h1>Login page</h1>}></Route>
      </Routes>
    </>
  );
};

export default indexRoutes;
