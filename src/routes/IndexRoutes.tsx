import { Routes, Route, useNavigate } from "react-router-dom";
import SignupPage from "@/pages/auth/SignupPage";
import LoginPage from "@/pages/auth/LoginPage";
import PrivateRoutes from "./PrivateRoutes";
import CommanRoutes from "./CommanRoutes";
import DashboardLayout from "@/layouts/DashboardLayout";
import Profile from "@/pages/auth/Profile";
import TodoContainer from "@/pages/todo/TodoContainer";
import { useEffect } from "react";
import { getToken } from "@/utils/config";
import CategoryContainer from "@/pages/category/CategoryContainer";

const IndexRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const initialize = async () => {
      try {
        await getToken(navigate);
      } catch (error) {
        console.log(error, "error in index route");
      }
    };
    initialize();
  }, []);

  return (
    <>
      <Routes>
        <Route path="" element={<CommanRoutes />}>
          <Route path="/" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Route>
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/app" element={<DashboardLayout />}>
            <Route path="dashboard" element={<h1>Dashboard...</h1>}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="todo" element={<TodoContainer />}></Route>
            <Route path="category" element={<CategoryContainer />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default IndexRoutes;
