import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditProductModal.css'

function EditProductModal({ show, handleClose, product }) {
    const [productName, setProductName] = useState(product.productName);
    const [productBrand, setProductBrand] = useState(product.productBrand);
    const [productDetail, setProductDetail] = useState(product.productDetail);
    const [productPrice, setProductPrice] = useState(product.productPrice);
    const [productImage, setProductImage] = useState(product.productImage);
    const [category, setCategory] = useState(product.category);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleShowConfirmModal = () => setShowConfirmModal(true);
    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    const handleSubmit = () => {
        //Falta funcionamiento para que se guarde el producto editado
        const updatedProduct = {
            ...product,
            productName,
            productBrand,
            productDetail,
            productPrice,
            productImage,
            category
        };

        handleCloseConfirmModal();
        handleClose();
    };

    return (
        <>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
                <Form>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={productName} 
                            onChange={(e) => setProductName(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductBrand">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={productBrand} 
                            onChange={(e) => setProductBrand(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductDetail">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={productDetail} 
                            onChange={(e) => setProductDetail(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={productPrice} 
                            onChange={(e) => setProductPrice(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImage">
                        <Form.Label>URL de la Imagen</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={productImage} 
                            onChange={(e) => setProductImage(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Bebidas">Bebidas</option>
                            <option value="Bebidas Alcohólicas">Bebidas Alcohólicas</option>
                            <option value="Dulces">Dulces</option>
                            <option value="Snacks">Snacks</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer-custom">
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleShowConfirmModal}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered className="modal-confirmation">
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Cambios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas guardar los cambios?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirmModal}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default EditProductModal;