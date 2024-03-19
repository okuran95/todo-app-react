import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const RegisterForm = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [tryPassword, setTryPassword] = useState("");
    const navigation = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            "email": email,
            "password": password,
            "validPassword": tryPassword,
            "firstName": firstName,
            "lastName": lastName
        }

        try {
            await axios.post('http://localhost:8080/api/auth/register', payload)
            navigation("/login")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
            <h5 className="centered"> Kayıt Ol </h5>
            <Form onSubmit={(e) => handleSubmit(e)} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-posta adresinizi giriniz" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>İsim</Form.Label>
                    <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="İsminizi giriniz." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Soyisim</Form.Label>
                    <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Soyisminizi giriniz." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Şifre</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Şifrenizi giriniz" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Tekrar Şifre</Form.Label>
                    <Form.Control value={tryPassword} onChange={(e) => setTryPassword(e.target.value)} type="password" placeholder="Şifrenizi tekrar giriniz" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Gönder
                </Button>
            </Form>
        </div>
    );
}

export default RegisterForm;