import { useNavigate, Outlet } from "react-router-dom";
import { myStore } from "@/utils/config";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const checkAuth = async () => {
    const auth = await myStore.getItem("auth");
    if (!auth) {
      navigate("/login");
      setLoading(false);
    }

    if (auth) {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }
  return <Outlet />;
};

export default PrivateRoutes;
