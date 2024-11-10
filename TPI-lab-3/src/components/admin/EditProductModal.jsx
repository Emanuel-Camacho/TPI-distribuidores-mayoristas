import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditProductModal.css'

function EditProductModal({ show, handleClose, product, token }) {
    const [productName, setProductName] = useState(product?.productName || '');
    const [productBrand, setProductBrand] = useState(product?.productBrand || '');
    const [productDetail, setProductDetail] = useState(product?.productDetail || '');
    const [productPrice, setProductPrice] = useState(product?.productPrice || '');
    const [productImageUrl, setProductImageUrl] = useState(product?.productImageUrl || '');
    const [productCategory, setProductCategory] = useState(product?.productCategory || '');

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (product) {
            setProductName(product.productName);
            setProductBrand(product.productBrand);
            setProductDetail(product.productDetail);
            setProductPrice(product.productPrice);
            setProductImageUrl(product.productImageUrl);
            setProductCategory(product.productCategory);
        }
    }, [product]);

    const handleShowConfirmModal = () => {
        if (!productName || !productBrand || !productDetail || !productPrice) {
            setErrorMessage('Todos los campos son obligatorios, excepto la URL de la imagen.');
        } else {
            setShowConfirmModal(true);
        }
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
        window.location.reload();
    }
    const handleSubmit = async () => {
        setErrorMessage(null);

        try {
            const updatedProduct = {
                productId: product.productId,
                productName: productName.trim() || product.productName,
                productBrand: productBrand.trim() || product.productBrand,
                productDetail: productDetail.trim() || product.productDetail,
                productPrice: parseFloat(productPrice) || product.productPrice,
                productImageUrl: productImageUrl.trim() || product.productImageUrl,
                productCategory: productCategory.trim() || product.productCategory
            };

            const response = await fetch(`https://localhost:7121/api/Product/${product.productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                handleClose();
                handleCloseConfirmModal();
            } else {
                setErrorMessage('Error al actualizar el producto');
            }
        } catch (err) {
            setErrorMessage('Error en la solicitud: ' + err.message);
        } 
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
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductBrand">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={productBrand} 
                            onChange={(e) => setProductBrand(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductDetail">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={productDetail} 
                            onChange={(e) => setProductDetail(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={productPrice} 
                            onChange={(e) => setProductPrice(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImage">
                        <Form.Label>URL de la Imagen</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={productImageUrl} 
                            onChange={(e) => setProductImageUrl(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={productCategory} 
                            onChange={(e) => setProductCategory(e.target.value)}
                            required
                        >
                            <option value="Bebidas">Bebidas</option>
                            <option value="Bebidas Alcohólicas">Bebidas Alcohólicas</option>
                            <option value="Dulces">Dulces</option>
                            <option value="Snacks">Snacks</option>
                        </Form.Control>
                    </Form.Group>
                    {errorMessage && (
                        <div className="text-danger mt-3">{errorMessage}</div>
                    )}
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

        <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} backdrop="static" keyboard={false} centered className="modal-confirmation">
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Cambios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas guardar los cambios ?
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
