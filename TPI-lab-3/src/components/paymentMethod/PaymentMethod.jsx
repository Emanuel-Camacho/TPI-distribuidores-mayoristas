import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../nav-footer/footer";
import './PaymentMethod.css'
import ConfirmPurchaseModal from './ConfirmPurchaseModal';

const PaymentMethod = () => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    //modal confirmar compra
    const handleConfirmShow = () => setShowConfirmModal(true);   
    const handleConfirmClose = () => setShowConfirmModal(false);


    const navigate = useNavigate(); 
    const handleCardClick = () => {
        navigate('/carddata');
    };



    return (
        <>
            <Navbar expand="lg" className="navbar w-100">
                <Container fluid className="container">
                    <Navbar.Brand href="#" className="nombre-logo" >Todo al Por Mayor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="text-center mt-4">
                <h3>Seleccione un método de pago</h3>
                <div className="d-grid gap-5 mt-3">
                    <Button 
                        variant="success" 
                        size="lg" 
                        className="w-75 mx-auto py-5 btn btn-primary cash-button"
                        onClick={handleConfirmShow}
                    >
                        Efectivo
                    </Button>
                    <Button variant="primary" onClick={handleCardClick}  size="lg" className="w-75 mx-auto py-5 btn btn-secondary card-button">
                        Tarjeta
                    </Button>
                    <ConfirmPurchaseModal 
                        show={showConfirmModal} 
                        handleClose={handleConfirmClose} 
                    />
                </div>
            </Container>
            <Footer />
        </>
    )
}
export default PaymentMethod;