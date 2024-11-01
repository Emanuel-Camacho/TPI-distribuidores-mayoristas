import React from 'react';
import { Button, Container, Row, Col, Navbar } from 'react-bootstrap';
import Footer from "../nav-footer/footer";
import './PaymentMethod.css'

const PaymentMethod = () => {
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
                    <Button variant="success" size="lg" className="w-75 mx-auto py-5 btn btn-primary cash-button">
                        Efectivo
                    </Button>
                    <Button variant="primary" size="lg" className="w-75 mx-auto py-5 btn btn-secondary debit-card-button">
                        Tarjeta de Débito
                    </Button>
                </div>
            </Container>
            <Footer />
        </>
    )
}
export default PaymentMethod;