import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditUserModal.css';

function EditUserModal({ show, handleClose, user, token }) {
    const [userName, setUserName] = useState(user?.userName || '');
    const [userEmail, setUserEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        setUserName(user?.userName || '');
        setUserEmail(user?.email || '');
    }, [user]);

    const handleShowConfirmModal = () => {
        if (!userName || !userEmail) {
            alert('Todos los campos son obligatorios.');
        } else {
            setShowConfirmModal(true);
        }
    };

    const handleCloseConfirmModal = () =>{
        setShowConfirmModal(false);
        window.location.reload();
    }; 


    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const updatedUser = {
                id: user.id,
                userName: userName.trim() || user.userName,
                email: userEmail.trim() || user.email,
                password: "...", //ya toma la password actual del usuario seleccionado
                userType: user.userType
            };
            const response = await fetch(`https://localhost:7121/api/User/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                handleClose();
                handleCloseConfirmModal();
            } else {
                setError('Error al actualizar el usuario');
            }
        } catch (err) {
            setError('Error en la solicitud: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <Form>
                        <Form.Group controlId="formUserName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={userName} 
                                onChange={(e) => setUserName(e.target.value)} 
                                required
                                className="form-control-custom"
                            />
                        </Form.Group>
                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={userEmail} 
                                onChange={(e) => setUserEmail(e.target.value)} 
                                required
                                className="form-control-custom"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleShowConfirmModal}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton className="modal-confirmation-header">
                    <Modal.Title>Confirmar Cambios</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-confirmation">
                    ¿Estás seguro de que deseas guardar los cambios?
                </Modal.Body>
                <Modal.Footer className="modal-confirmation-footer">
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUserModal;
