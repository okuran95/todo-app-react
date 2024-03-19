import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axiosInstance from "../components/auth/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const UpdateForm = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('');
    const navigation = useNavigate()
    const { id } = useParams();
    const hourPart = 0
    const minutePart = 0
    const secondPart = 0
    const parseDuration = (duration) => {
        const parts = duration.replace('PT', '');
        if (parts.includes("H")){
             hourPart = parts.split('H')[0];
            parts = parts[1]
        }
        console.log(parts)
        if (parts.includes("M")){
             minutePart = parts.split('M')[0];
            parts = parts[1]
        }
        console.log(parts)
        if (parts.includes("S")){
             secondPart = parts.split('S')[0];
          
        }
        console.log(parts)
        return String((((parseInt(minutePart) + (parseInt(hourPart) * 60)) * 60) + parseInt(secondPart))/60)
    }

    const home = async (e) => {
        navigation("/")
    }

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`http://localhost:8080/api/todos/get/${id}`)
            const item = response.data?.data
            setTitle(item.title)
            setDescription(item.description)
            setDuration(item.duration)
            setDate(item.startDateTime)
            setPriority(item.priority)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchData();
        return () => {
        };
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            "title": title,
            "description": description,
            "duration": parseFloat(duration) * 60,
            "startDateTime": date,
            "priority": priority
        }


        try {
            await axiosInstance.put(`http://localhost:8080/api/todos/update/${id}`, payload)
            navigation("/")    
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">

            <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group controlId="formItemName">
                        <Form.Label>Başlık</Form.Label>
                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Adı girin" />
                    </Form.Group>
                    <Form.Group controlId="formItemDescription">
                        <Form.Label>Açıklama</Form.Label>
                        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} placeholder="Açıklama girin" />
                    </Form.Group>
                    <Form.Group controlId="formDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="HH.MM"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDateTime">
                        <Form.Label>Date and Time:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSelectBox">
                        <Form.Label>Öncelik:</Form.Label>
                        <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="3">Yüksek</option>
                            <option value="2">Orta</option>
                            <option value="1">Düşük</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Gönder
                    </Button>
                    <Button className="custom-button" variant="primary" onClick={()=>home()}>
                        Geri
                    </Button>
                </Form>

        </div>
    );
}

export default UpdateForm;