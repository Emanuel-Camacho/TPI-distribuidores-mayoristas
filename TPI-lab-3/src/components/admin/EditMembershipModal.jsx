import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditMembershipModal = ({ show, handleClose, token }) => {
    const [membershipTitle, setMembershipTitle] = useState("Membresia");
    const [membershipDescription, setMembershipDescription] = useState("Descripcion");
    const [membershipPrice, setMembershipPrice] = useState(1);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [membershipId, setMembershipId] = useState(1); 

    const handleChangePrice = (e) => {
        setMembershipPrice(e.target.value);
    };
    const handleChangeTitle = (e) => {
        setMembershipTitle(e.target.value);
    };
    const handleChangeDescription = (e) => {
        setMembershipDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = async () => {
        if (!token) {
            console.log("Token no disponible al intentar actualizar");
            return;
        }
        const updatedMembership ={
            membershipId: membershipId,
            membershipPrice: membershipPrice,
            membershipTitle: membershipTitle,
            membershipDescription: membershipDescription,
        }
        try {
            const response = await fetch("https://localhost:7121/api/DateMembership/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization' : `Bearer ${token}`,
                },
                body: JSON.stringify(updatedMembership),
            });
            if (response.ok) {
                alert("Membresía actualizada correctamente.");
                handleClose();
            } else {
                console.error("Error al actualizar la membresía.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
        setShowConfirmModal(false);
    };


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="bg-light" closeButton>
                    <Modal.Title>Editar Membresía</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-white">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={membershipTitle}
                                onChange={handleChangeTitle}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice" className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={membershipPrice}
                                onChange={handleChangePrice}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={membershipDescription}
                                onChange={handleChangeDescription}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Confirmar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false) }  backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-white">Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-white">¿Estás seguro de que deseas actualizar la membresía?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditMembershipModal;
