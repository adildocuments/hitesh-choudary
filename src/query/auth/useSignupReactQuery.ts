import { axiosInstance } from "@/utils/config";

export const signUpUser = async (payload: any) => {
  const response = await axiosInstance({
    url: "/users/register",
    method: "post",
    data: payload,
  });
  return response;
};
