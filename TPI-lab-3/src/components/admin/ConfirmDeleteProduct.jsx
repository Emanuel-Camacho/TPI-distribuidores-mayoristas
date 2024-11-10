import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../sysadmin/ConfirmDeleteModal.css';

function ConfirmDeleteProduct({ show, handleClose, handleConfirmDelete, productName }) {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
            <Modal.Header className='modal-header-custom' closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-custom'>
                ¿Estás seguro de que deseas eliminar {productName}?
            </Modal.Body>
            <Modal.Footer className='modal-footer-custom'>
                <Button className='cancel-button' onClick={handleClose}>
                    Cancelar
                </Button>
                <Button className='confirm-button' variant='danger' onClick={() => {
                    handleConfirmDelete();
                    handleClose();
                }}>
                    Confirmar Eliminación
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDeleteProduct;
