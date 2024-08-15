import * as yup from "yup";

export const todoSchema = yup.object({
  title: yup.string().required(""),
  description: yup.string().required(""),
});
