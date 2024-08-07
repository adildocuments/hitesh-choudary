import { Outlet, useNavigate } from "react-router-dom";
import { myStore } from "@/utils/config";
import { useEffect } from "react";

const CommanRoutes = () => {
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      const auth = await myStore.getItem("auth");
      if (auth) {
        navigate("/app/dashboard");
      }
    } catch (error) {
      console.log("Storage Error", error);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return <Outlet />;
};

export default CommanRoutes;
