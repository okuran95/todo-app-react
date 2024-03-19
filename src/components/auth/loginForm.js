import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate()

    const register = async () => {
        navigation("/register")
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            "email": email,
            "password": password
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', payload)
            localStorage.setItem('token', response?.data?.data)
            navigation("/")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
            <h5 className="centered"> Giriş Yap </h5>
            <Form onSubmit={(e) => handleSubmit(e)} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-posta adresinizi giriniz." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Şifrenizi giriniz." />
                </Form.Group>
                <Button className="custom-button" variant="primary" type="submit">
                    Gönder
                </Button>
                <Button className="custom-button" variant="primary" type="submit" onClick={()=>register()}>
                    Üye Ol
                </Button>
            </Form>
        </div>
    );
}

export default LoginForm;