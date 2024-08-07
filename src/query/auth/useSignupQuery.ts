import { axiosInstance } from "@/utils/config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const signUpUser = async (payload: any) => {
  return await axiosInstance({
    url: "/users/register",
    method: "post",
    data: payload,
  });
};

const useSignupQuery = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });
  return { ...mutation };
};

export default useSignupQuery;
