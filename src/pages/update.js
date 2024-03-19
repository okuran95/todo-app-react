import React from "react";
import AuthLayout from "../components/auth/authLayout";
import UpdateForm from "../components/updateForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
const Login = () => {
    return (<AuthLayout>
        <UpdateForm />
    </AuthLayout>);
}

export default Login;