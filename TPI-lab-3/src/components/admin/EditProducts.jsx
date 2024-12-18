import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import EditProductModal from './EditProductModal';
import FooterAdmin from './nav-footer-admin/FooterAdmin';
import NavAdmin from './nav-footer-admin/NavAdmin';


const EditProduct = () => {
    const { id } = useParams();
    const product = products.find((prod) => prod.id === Number(id));
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <NavAdmin/>
            <Container className="my-5">
                <Row>
                <Col md={6} className="text-center">
                        <Image src={product.productImage} alt={product.productName} fluid className= "product-image" />
                        <div className="d-flex justify-content-center mt-3">
                            <Image src={product.productImage} alt={product.productName} thumbnail width="50" className="me-2 product-thumbnail" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <p className="text-muted mt-3">{product.productBrand}</p>
                        <h1 className='mt-3' >{product.productName}</h1>
                        <div className="my-3 mt-3">
                            <span className="fw-bold fs-4 text-primary mt-3">${product.productPrice}</span>{' '}</div>
                        <p className="text-muted mt-3">{product.productDetail}</p>
                        <Button variant="dark"  className="mt-5" onClick={handleShowModal}>Editar Producto</Button>
                        <EditProductModal 
                            show={showModal} 
                            handleClose={handleCloseModal} 
                            product={product}  
                        />
                    </Col>
                </Row>
            </Container>
        <FooterAdmin/>
        </>
    );
};

export default EditProduct;
