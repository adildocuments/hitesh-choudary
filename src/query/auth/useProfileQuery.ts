import { axiosInstance } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useProfileQuery = () => {
  const getCurrentUserData = async () => {
    const res = await axiosInstance({
      url: "/users/current-user",
      method: "get",
    });
    return res?.data;
  };

  const formMethods = useForm({
    defaultValues: {
      email: "",
      username: "",
      role: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUserData,
  });

  useEffect(() => {
    if (data?.data) {
      formMethods.setValue("email", data?.data?.email);
      formMethods.setValue("username", data?.data?.username);
      formMethods.setValue("role", data?.data?.role);
    }
  }, [data]);

  return formMethods;
};

export default useProfileQuery;
