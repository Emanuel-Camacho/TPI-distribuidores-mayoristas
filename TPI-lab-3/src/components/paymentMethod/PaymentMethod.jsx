import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../nav-footer/footer";
import './PaymentMethod.css'
import ConfirmPurchaseModal from './ConfirmPurchaseModal';

const PaymentMethod = () => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();
    //modal confirmar compra
    const handleConfirmShow = () => setShowConfirmModal(true);  
    const handleConfirmClose = () => setShowConfirmModal(false);
    const quantities = JSON.parse(localStorage.getItem('quantities'));


    const handleCardClick = () => {
        navigate('/carddata');
    };
    const handlerDashboard = () => {
        navigate('/dashboard');
    }



    return (
        <>
            <Navbar expand="lg" className="navbar w-100">
                <Container fluid className="container">
                <Navbar.Brand onClick={handlerDashboard} className="nombre-logo" >
                    <img src="https://cdn.discordapp.com/attachments/1230880736777736363/1302353991325188189/images-removebg-preview.png?ex=6734556c&is=673303ec&hm=2679bad7ba4cb69156116eaaddc91673ea2f9d647cb7c59750c1473c9c2da750&" alt="logo" className="logo-img mb-2" />
                    Todo al Por Mayor</Navbar.Brand>
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
                        quantities = {quantities}
                    />
                </div>
            </Container>
            <Footer />
        </>
    )
}
export default PaymentMethod;