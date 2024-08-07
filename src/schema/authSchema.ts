import * as yup from "yup";

export const signUpSchema = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .email("Email must be valid."),
  username: yup.string().required("Username is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password length must be alteast 6 character."),
  cpassword: yup
    .string()
    .required("Confirm Password is required.")
    .oneOf([yup.ref("password")], "Passwords must match."),
  role: yup.string().required("User role is required."),
});

export const loginSchema = yup.object({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});
