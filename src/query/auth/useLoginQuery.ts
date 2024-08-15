import { axiosInstance } from "@/utils/config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { myStore } from "@/utils/config";

const loginUser = async (payload: any) => {
  return await axiosInstance({
    url: "/users/login",
    method: "post",
    data: payload,
  });
};

const useLoginQuery = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (response) => {
      await myStore.setItem("auth", response?.data?.data);
      navigate("/app/dashboard");
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
  return { ...mutation };
};
export default useLoginQuery;
