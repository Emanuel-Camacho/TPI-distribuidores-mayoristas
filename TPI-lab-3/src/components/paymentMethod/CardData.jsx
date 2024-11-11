import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Container, Button, Navbar} from 'react-bootstrap';
import './CardData.css';
import ConfirmPurchaseModal from './ConfirmPurchaseModal';
import Footer from '../nav-footer/footer';


function CardData() {
    const [selectedOption, setSelectedOption] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [dni, setDni] = useState('');
    //modal confirmar compra
    const handleConfirmShow = () => setShowConfirmModal(true);   
    const handleConfirmClose = () => setShowConfirmModal(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const navigate = useNavigate(); 
    const handleCancelClick = () => {
        navigate('/paymentmethod');
    };
    const handlerDashboard = () => {
        navigate('/dashboard');
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (cardHolder && cardNumber && expiration && cvv && dni) {
            handleConfirmShow();
        } else {
            alert("Por favor, completa todos los campos requeridos.");
        }
    };

    return (
        <>
            <Navbar expand="lg" className="navbar w-100">
                <Container fluid className="container">
                <Navbar.Brand onClick={handlerDashboard} className="nombre-logo" >
                    <img src="https://cdn.discordapp.com/attachments/1230880736777736363/1302353991325188189/images-removebg-preview.png?ex=672d152c&is=672bc3ac&hm=cb1b67374a887792655a231d6b30770a15cd86c4abbbf82c082622e7268682d4&" alt="logo" className="logo-img mb-2" />
                    Todo al Por Mayor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    </Navbar.Collapse>
                </Container>
            </Navbar>           
            <Container className=" mt-5 mb-5 p-4 bg-light form-container">
                <h2 className="text-center">Pago con Tarjeta</h2>
                <h4>Ingrese sus Datos</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCardHolder" className="mb-3">
                        <Form.Label>Nombre del titular</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="input-custom" 
                            placeholder="Ingrese nombre del titular" 
                            required  
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formCardNumber" className="mb-3">
                        <Form.Label>Número de tarjeta</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="input-custom" 
                            placeholder="Ingrese número de tarjeta" 
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formExpirationAndCVV" className="d-flex mb-3">
                        <div className="me-3">
                            <Form.Label>VTO</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="input-custom" 
                                placeholder="MM/AA" 
                                required
                                value={expiration}
                                onChange={(e) => setExpiration(e.target.value)} />
                        </div>
                        <div>
                            <Form.Label>CVV</Form.Label>
                            <Form.Control 
                                type="password" 
                                className="input-custom" 
                                placeholder=" Ingrese CVV" 
                                required
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formDNI" className="mb-3">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="input-custom" 
                            placeholder="Ingrese su DNI" 
                            required
                            value={dni}
                            onChange={(e) => setDni(e.target.value)} />
                    </Form.Group>
                    <h4>Tipo de Tarjeta</h4>
                    <Form.Group>
                        <Form.Check 
                            type="radio"
                            id="creditCard"
                            label="Credit card"
                            value="creditCard"
                            checked={selectedOption === 'creditCard'}
                            onChange={handleOptionChange}
                            name="paymentOptions"
                            required
                            
                        />
                        <Form.Check 
                            type="radio"
                            id="debitCard"
                            label="Debit card"
                            value="debitCard"
                            checked={selectedOption === 'debitCard'}
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
                        <ConfirmPurchaseModal 
                            show={showConfirmModal} 
                            handleClose={handleConfirmClose} 
                        />
                    </div>
                </Form>
            </Container>
            <Footer />
        </>
    );
};


export default CardData;
