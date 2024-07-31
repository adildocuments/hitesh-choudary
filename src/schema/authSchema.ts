import * as yup from "yup";

export const signUpSchema = yup.object({
  email: yup.string().required().email(),
  username: yup.string().required(),
  password: yup.string().required(),
  cpassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
  role: yup.string().required(),
});
