import React, { useState } from 'react';
import { Form, Button, Container, Modal, Alert } from 'react-bootstrap';
import { products } from '../dashboard/Dashboard';
import NavBar from '../nav-footer/nav';
import Footer from '../nav-footer/footer';
import './AddProduct.css';

const AddProduct = ({ addProduct }) => {
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productDetail, setProductDetail] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [category, setCategory] = useState('Bebidas');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpenConfirmModal = (e) => {
        e.preventDefault();

        if (!productName || !productBrand || !productDetail || !productPrice || !category) {
            alert('Por favor, complete todos los campos requeridos.');
            return; 
        }

        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleConfirmSubmit = () => {
        const maxId = Math.max(...products.map((prod) => prod.id), 0);
        const newProduct = {
            id: maxId + 1,
            productName,
            productBrand,
            productDetail,
            productPrice,
            productImage,
            category,
        };
        setShowConfirmModal(false);
        addProduct(newProduct); //logica para agregar nuevo producto
        setProductName('');
        setProductBrand('');
        setProductDetail('');
        setProductPrice('');
        setProductImage('');
        setCategory('Bebidas');
    };

    return (
        <>
            <NavBar />
            <Container className="addproduct-form-container mt-5 mb-5 p-4 bg-light form-container">
                <h2>Crear Nuevo Producto</h2>
                <Form onSubmit={handleOpenConfirmModal}>
                    <Form.Group controlId="formProductName" className="mb-3">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="input-custom"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductBrand" className="mb-3">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            value={productBrand}
                            onChange={(e) => setProductBrand(e.target.value)}
                            className="input-custom"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductDetail" className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            value={productDetail}
                            onChange={(e) => setProductDetail(e.target.value)}
                            className="input-custom"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice" className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="input-custom"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImage" className="mb-3">
                        <Form.Label>URL de la Imagen</Form.Label>
                        <Form.Control
                            type="text"
                            value={productImage}
                            onChange={(e) => setProductImage(e.target.value)}
                            className="input-custom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory" className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="input-custom"
                            required
                        >
                            <option value="Bebidas">Bebidas</option>
                            <option value="Bebidas Alcohólicas">Bebidas Alcohólicas</option>
                            <option value="Dulces">Dulces</option>
                            <option value="Snacks">Snacks</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="success" type="submit" className="mt-3 confirm-buttom">
                        Crear Producto
                    </Button>
                </Form>
            </Container>
            <Footer />

            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered className='modal-addproduct'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Creación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas crear este producto?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleConfirmSubmit}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddProduct;
