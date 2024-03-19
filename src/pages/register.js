import React from "react";
import AuthLayout from "../components/auth/authLayout";
import RegisterForm from "../components/auth/registerForm";

const Register = () => {
    return (<AuthLayout>
        <RegisterForm />
    </AuthLayout>);
}

export default Register;