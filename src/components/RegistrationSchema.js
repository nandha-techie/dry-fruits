import * as Yup from "yup";

export const registrationSchema = Yup.object({
  email: Yup.string().email().required("Email id is required"),
  username: Yup.string().min(2).max(30).required("Username name is required"),
  password: Yup.string().min(6).required("Please enter your password"),
  repassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email id is required"),
  password: Yup.string().min(6).required("Please enter your password")
});
