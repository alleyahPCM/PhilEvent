import * as yup from "yup";

export const userSchema = yup.object().shape({
    uname: yup.string().required("Username is required!"),
    email: yup.string().email().required("Email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email!"),
    password: yup.string().min(8, "Password must be at least 8 characters!").required().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least 1 number and uppercase letter!"),
    confirmPassword: yup.string().required("Confirm Password is required!").oneOf([yup.ref("password"), null], "Passwords do not match!"),
    terms: yup.boolean().oneOf([true], 'You must agree terms and conditions!'),
    emailOrUname: yup.string().required('This field is required.').matches(/^(?:\w+@\w+\.\w+|\w{3,})$/,'Please enter a valid email or username.'),
    cpassword: yup.string().min(8, "This field is required.").required().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    remember: yup.boolean()
})