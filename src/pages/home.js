import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axiosInstance from "../components/auth/axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('');
    const navigate = useNavigate();

    const clearModal = async (id) => {
        setTitle("")
        setDescription("")
        setDuration("")
        setPriority("")
        setDate("")
    };

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
            await axiosInstance.post('http://localhost:8080/api/todos/save', payload)
            fetchData()
            handleClose()
            clearModal()
        } catch (error) {
            console.log(error)
        }
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [items, setItems] = useState([]);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`http://localhost:8080/api/todos/delete/${id}`)
            fetchData();
        } catch (error) {
            console.log(error)
        }
    };

    const handleUpdate = async (id) => {
        navigate(`/update/${id}`);
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:8080/api/todos/get-all')
            setItems(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    };

    const signOut = async () => {
        localStorage.removeItem('token');
        navigate("/login")
    };


    useEffect(() => {
        fetchData();
        return () => {
        };
    }, []);

    return <div>

        <Button className="custom-button" variant="primary" onClick={handleShow}>
            Oluştur
        </Button>

        <Button className="custom-button" variant="danger" onClick={()=>signOut()}>
            Çıkış Yap
        </Button>

        <Table striped="columns">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Başlık</th>
                    <th>Açıklama</th>
                    <th>Başlangıç Tarihi</th>
                    <th>Süre</th>
                    <th>Öncelik</th>
                    <th>Durum</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {items.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.startDateTime}</td>
                        <td>{item.duration}</td>
                        <td>{item.priority}</td>
                        <td>{item.priority}</td>
                        <td>
                            <Button className="custom-button" variant="danger" onClick={() => handleDelete(item.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <Button className="custom-button" variant="primary" onClick={() => handleUpdate(item.id)}>
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                            placeholder="dakika"
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
                    <Button className="custom-button" variant="primary" type="submit">
                        Gönder
                    </Button>
                    <Button className="custom-button" variant="secondary" onClick={handleClose}>
                    Kapat
                </Button>
                </Form>
            </Modal.Body>

        </Modal>
    </div>;
}

export default Home;