import React from "react";
import AuthLayout from "../components/auth/authLayout";
import LoginForm from "../components/auth/loginForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
const Login = () => {
    return (<AuthLayout>
        <LoginForm />
    </AuthLayout>);
}

export default Login;