import React from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import './PaymentMethodModal.css';

function PaymentMethodModal({ show, handleClose}) {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className="modal-header-custom" closeButton >
                    <Modal.Title>Pago con Tarjeta</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <h4>Ingrese sus Datos</h4>
                    <Form>
                        <Form.Group controlId="formCardHolder">
                            <Form.Label>Nombre del titular</Form.Label>
                            <Form.Control type="text" className="input-custom" />
                        </Form.Group>
                        <Form.Group controlId="formCardNumber">
                            <Form.Label>Número de tarjeta</Form.Label>
                            <Form.Control type="text" className="input-custom" />
                        </Form.Group>
                        <Form.Group controlId="formExpirationAndCVV" className="d-flex">
                            <div className="mr-2 mx-3">
                                <Form.Label>VTO</Form.Label>
                                <Form.Control type="text" className="input-custom" />
                            </div>
                            <div className="ml-2">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="password" className="input-custom" />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formDNI">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control type="text" className="input-custom" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="link" onClick={handleClose} className="cancel-button">
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleClose} className="confirm-button">
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PaymentMethodModal;
