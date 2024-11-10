import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ConfirmPurchaseModal.css';
import { useNavigate } from 'react-router-dom';


function ConfirmPurchaseModal({ show, handleClose }) {
    const navigate = useNavigate();
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered >
            <Modal.Header className='modal-header-custom' closeButton>
                <Modal.Title>Confirmación de compra</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-custom'>
                ¿Estás seguro de realizar la compra?
            </Modal.Body>
            <Modal.Footer className='modal-footer-custom'>
                <Button className='cancel-button' onClick={handleClose}>
                    Cancelar
                </Button>
                <Button className='confirm-button' variant="primary" onClick={() => {
                    handleClose();
                    navigate('/mypurchases');
                }}>
                    Confirmar Compra
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmPurchaseModal;
