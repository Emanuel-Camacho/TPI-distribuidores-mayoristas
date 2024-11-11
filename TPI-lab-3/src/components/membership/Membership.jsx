import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Modal, Row, Col, Form, Container } from "react-bootstrap";
import { useAuth } from "../../services/auth/Auth.context";
import { useNavigate } from "react-router-dom";
import "./Membership.css";
import NavBar from "../nav-footer/nav";
import Footer from "../nav-footer/footer";
const Membership = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();

    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [cvv, setCvv] = useState("");
    const [dni, setDni] = useState("");
    const [selectedOption, setSelectedOption] = useState("creditCard");

    const [membershipTitle, setMembershipTitle] = useState("");
    const [membershipDescription, setMembershipDescription] = useState("");
    const [membershipPrice, setMembershipPrice] = useState(0);

    useEffect(() => {
        const fetchMembershipDetails = async () => {
            try {
                const response = await fetch("https://localhost:7121/api/DateMembership/details", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMembershipTitle(data.membershipTitle);
                    setMembershipDescription(data.membershipDescription);
                    setMembershipPrice(data.membershipPrice);
                } else {
                    throw new Error("Error al obtener los detalles de la membresía.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema al obtener los detalles de la membresía.");
            }
        };

        fetchMembershipDetails();
    }, [token]);

    const handleSubscribe = async () => {
        try {
            const response = await fetch("https://localhost:7121/api/Membership/activate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user.id,
                }),
            });
            if (response.ok) {
                alert("Te has suscrito con éxito a la membresía!");
                navigate("/dashboard");
            } else {
                throw new Error("Error al suscribirse a la membresía.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al procesar la suscripción.");
        }
        setShowSubscribeModal(false);
    };

    const handleUnsubscribe = async () => {
        try {
            const response = await fetch("https://localhost:7121/api/Membership/desactivate", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user.id,
                }),
            });

            if (response.ok) {
                alert("Has cancelado tu membresía.");
                navigate("/dashboard");
            } else {
                throw new Error("Error al cancelar la membresía.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al procesar la cancelación.");
        }
        setShowUnsubscribeModal(false);
    };

    const handleSubscribeClick = () => {
        setShowPaymentForm(true); 
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setShowPaymentForm(false); 
        setShowSubscribeModal(true); 
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleCancelClick = () => {
        setShowPaymentForm(false); 
    };

    return (
        <>
            <NavBar />
            <Card className="centered-card shadow-lg mb-5">
                <Card.Body>
                    <Card.Title className="text-center mb-4" style={{ fontSize: "2rem" }}>
                        {membershipTitle}
                    </Card.Title>
                    <Card.Text className="mb-4" style={{ fontSize: "1.25rem" }}>
                        {membershipDescription}
                    </Card.Text>
                    <Row className="align-items-center">
                        <Col xs={12} md={6} className="mb-3 mb-md-0">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-100"
                                onClick={handleSubscribeClick}
                            >
                                Suscribirse
                            </Button>
                        </Col>
                        <Col xs={12} md={6} className="text-md-end">
                            <span className="fw-bold" style={{ fontSize: "1.5rem" }}>
                                ${membershipPrice}/mes
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="text-center">
                            <Button variant="danger" onClick={() => setShowUnsubscribeModal(true)}>
                                Cancelar Membresía
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Modal show={showPaymentForm} onHide={() => setShowPaymentForm(false)}>
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title  className="modal-title-custom">Pago con Tarjeta</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <Container className="payment-form-container mt-5 mb-5 p-4">
                        <h2 className="text-center title-custom">Ingrese sus Datos</h2>
                        <Form onSubmit={handlePaymentSubmit} >
                            <Form.Group controlId="formCardHolder" className="mb-4">
                                <Form.Label className="label-custom">Nombre del titular</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-custom"
                                    placeholder="Ingrese nombre del titular"
                                    required
                                    value={cardHolder}
                                    onChange={(e) => setCardHolder(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCardNumber" className="mb-3">
                                <Form.Label className="label-custom">Número de tarjeta</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-custom"
                                    placeholder="Ingrese número de tarjeta"
                                    required
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formExpirationAndCVV" className="d-flex mb-3">
                                <div className="me-3">
                                    <Form.Label className="label-custom">VTO</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="input-custom"
                                        placeholder="MM/AA"
                                        required
                                        value={expiration}
                                        onChange={(e) => setExpiration(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Form.Label className="label-custom">CVV</Form.Label>
                                    <Form.Control
                                        type="password"
                                        className="input-custom"
                                        placeholder="Ingrese CVV"
                                        required
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formDNI" className="mb-3">
                                <Form.Label className="label-custom">DNI</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-custom"
                                    placeholder="Ingrese su DNI"
                                    required
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                />
                            </Form.Group>
                            <h4 className="label-custom">Tipo de Tarjeta</h4>
                            <Form.Group className="d-flex align-items-center gap-3">
                                <Form.Check
                                    type="radio"
                                    id="creditCard"
                                    label="Credit card"
                                    value="creditCard"
                                    checked={selectedOption === "creditCard"}
                                    onChange={handleOptionChange}
                                    name="paymentOptions"
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    id="debitCard"
                                    label="Debit card"
                                    value="debitCard"
                                    checked={selectedOption === "debitCard"}
                                    onChange={handleOptionChange}
                                    name="paymentOptions"
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-between mt-4">
                                <Button variant="link" className="cancel-button" onClick={handleCancelClick}>
                                    Cancelar
                                </Button>
                                <Button variant="success" type="submit" className="confirm-button">
                                    Confirmar
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>

            <Modal show={showSubscribeModal} onHide={() => setShowSubscribeModal(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title>Confirmar Suscripción</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-white" >
                    ¿Estás seguro de que quieres suscribirte a la membresía premium?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="modal-footer-secondary" onClick={() => setShowSubscribeModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" className="modal-footer-button" onClick={handleSubscribe}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUnsubscribeModal} onHide={() => setShowUnsubscribeModal(false)} centered>
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title>Cancelar Membresía</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom text-white">
                    ¿Estás seguro de que quieres cancelar tu membresía premium?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUnsubscribeModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleUnsubscribe}>
                        Confirmar Cancelación
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </>
    );
};

export default Membership;
