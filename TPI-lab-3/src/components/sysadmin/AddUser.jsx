import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import './AddUser.css';

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();

    const handleOpenConfirmModal = (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };
    const handleBack =()=>{
        navigate('/sysadmin');
    }

    const handleConfirmSubmit = () => {
        /* const newUser = {
            username,
            email,
            password,
            userType,
        }; */

        setShowConfirmModal(false);
        //addUser(newUser); lógica para agregar el nuevo usuario
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('Client');
    };

    return (
        <>
            
            <Container className="createuser-form-container mt-5 mb-5 p-4 bg-light form-container">
                <h2>Crear Nuevo Usuario</h2>
                <Form onSubmit={handleOpenConfirmModal}>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-custom"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-custom"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-custom"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                        <Form.Label>Repetir Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-custom"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formRole" className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control
                            as="select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="input-custom"
                            required
                        >
                            <option value="user">Client</option>
                            <option value="admin">Admin</option>
                            <option value="sysAdmin">SysAdmin</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                        <Button variant='secondary' className='mt-3' onClick={handleBack}>Volver</Button>
                    <Button variant="primary" type="submit" className="mt-3 confirm-button" >
                        Crear Usuario
                    </Button>
                    </div>
                </Form>
            </Container>
            

            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered className='modal-create-user'>
                <Modal.Header closeButton className='modal-header-custom'>
                    <Modal.Title>Confirmar Creación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de crear este usuario?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" className='confirm-button-modal' onClick={handleConfirmSubmit}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateUser;
