import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditUserModal.css';

function EditUserModal({ show, handleClose, user, handleSave }) {
    const [userName, setUserName] = useState(user?.name || '');
    const [userEmail, setUserEmail] = useState(user?.email || '');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        setUserName(user?.name || '');
        setUserEmail(user?.email || '');
    }, [user]);

    const handleShowConfirmModal = () => {
        if (!userName || !userEmail) {
            alert('Todos los campos son obligatorios.');
        } else {
            setShowConfirmModal(true);
        }
    };

    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    const handleSubmit = () => {
        handleSave({ ...user, name: userName, email: userEmail });
        handleCloseConfirmModal();
        handleClose();
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
                    <Button variant="secondary" onClick={handleClose}>
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
                    <Button variant="primary" onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUserModal;
