import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/errorSchema";
import { unexpectedMsg } from "@/messages/errorMessage";
import localForage from "localforage";

export const axiosInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1",
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: AxiosError<ErrorResponse>) {
    if (error.response?.data) {
      const { statusCode, message } = error?.response?.data;
      switch (statusCode) {
        case 409:
          toast.error(message);
          break;
        default:
          toast.error(unexpectedMsg);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const myStore = localForage.createInstance({
  driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE],
  name: "react-database",
  version: 1.0,
  size: 1024 * 1024 * 10,
  storeName: "React_Store",
  description:
    "We can store the access token and refresh token to validate the user",
});
