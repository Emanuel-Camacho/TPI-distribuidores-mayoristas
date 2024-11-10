import React, { useState } from 'react';
import { Form, Button, Container, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../nav-footer/nav';
import Footer from '../nav-footer/footer';
import'./AddProduct.css';
import { useAuth } from "../../services/auth/Auth.context";

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productDetail, setProductDetail] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImageUrl, setProductImageUrl] = useState('');
    const [productCategory, setProductCategory] = useState('Bebidas');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { token } = useAuth();

    

    const handleOpenConfirmModal = (e) => {
        e.preventDefault();

        if (!productName || !productBrand || !productDetail || !productPrice || !productCategory) {
            alert('Por favor, complete todos los campos requeridos.');
            return; 
        }

        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleBack =()=>{
        navigate('/admin');
    }

    const handleConfirmSubmit = async () => {
        const newProduct = {
            productName: productName,
            productBrand: productBrand,
            productDetail: productDetail,
            productPrice: productPrice,
            productImageUrl: productImageUrl || "",
            productCategory: productCategory,
        };
        try {
            const response = await fetch('https://localhost:7121/api/Product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                // Captura el mensaje de error del servidor para saber exactamente la causa
                const errorData = await response.json(); 
                throw new Error(errorData.message || 'Error al crear el producto');
            }

            setShowConfirmModal(false);
            alert('Producto creado exitosamente.');
            
            setProductName('');
            setProductBrand('');
            setProductDetail('');
            setProductPrice('');
            setProductImageUrl('');
            setProductCategory('Bebidas');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            setErrorMessage('Hubo un problema al crear el producto. Intente nuevamente.');
        }
    
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
                            value={productImageUrl}
                            onChange={(e) => setProductImageUrl(e.target.value)}
                            className="input-custom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory" className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control
                            as="select"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            className="input-custom"
                            required
                        >
                            <option value="Bebidas">Bebidas</option>
                            <option value="Bebidas Alcohólicas">Bebidas Alcohólicas</option>
                            <option value="Dulces">Dulces</option>
                            <option value="Snacks">Snacks</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                        <Button variant='secondary' className='mt-3' onClick={handleBack}>Volver</Button>
                        <Button variant="success" type="submit" className="mt-3 confirm-buttom">
                            Crear Producto
                        </Button>
                    </div>
                </Form>
            </Container>
            <Footer />

            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} backdrop="static" keyboard={false} centered className='modal-addproduct'>
                <Modal.Header closeButton className='modal-header-custom'>
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
