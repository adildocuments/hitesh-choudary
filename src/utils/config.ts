import axios from "axios";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1",
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error(error?.message);
    return Promise.reject(error);
  }
);
