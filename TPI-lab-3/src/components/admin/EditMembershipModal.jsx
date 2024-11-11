import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditMembershipModal = ({ show, handleClose, token }) => {
    const [membershipDetails, setMembershipDetails] = useState({
        title: "",
        price: "",
        description: "",
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchMembershipDetails = async () => {
            try {
                const response = await fetch("https://localhost:7121/api/DateMembership/details", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMembershipDetails(data);
                } else {
                    console.error("Error al obtener los detalles de la membresía.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (show) {
            fetchMembershipDetails();
        }
    }, [show, token]);

    const handleChange = (e) => {
        setMembershipDetails({ ...membershipDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = async () => {
        try {
            const response = await fetch("https://localhost:7121/api/DateMembership/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(membershipDetails),
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
                <Modal.Header closeButton>
                    <Modal.Title>Editar Membresía</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={membershipDetails.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice" className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={membershipDetails.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={membershipDetails.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Confirmar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas actualizar la membresía?</Modal.Body>
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
