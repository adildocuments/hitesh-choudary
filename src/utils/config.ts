import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/errorSchema";
import { unexpectedMsg } from "@/messages/errorMessage";
import localForage from "localforage";

export const axiosInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1",
});

export const myStore = localForage.createInstance({
  driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE],
  name: "react-database",
  version: 1.0,
  size: 1024 * 1024 * 10,
  storeName: "React_Store",
  description:
    "We can store the access token and refresh token to validate the user",
});

interface Auth {
  accessToken: string;
}

export const getToken = async (navigate: any) => {
  // myStore.clear();
  const auth = (await myStore.getItem("auth")) as Auth;
  if (auth) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`;
  }

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error: AxiosError<ErrorResponse>) {
      if (error.response?.data) {
        const { statusCode, message } = error?.response?.data;
        switch (statusCode) {
          case 409:
            toast.error(message);
            break;
          default:
            toast.error(unexpectedMsg);
        }
        console.log("error", error);
        await myStore.clear();
        navigate("/login");
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
};
