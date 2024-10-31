import { useParams } from 'react-router-dom';
import { products } from '../dashboard/Dashboard';
import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import NavBar from "../nav-footer/nav";
import Footer from "../nav-footer/footer";


const SingleProduct = () => {
    const { id } = useParams();
    const product = products.find((prod) => prod.id === Number(id));

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (type) => {
        setQuantity((prevQuantity) => (type === 'increment' ? prevQuantity + 1 : Math.max(prevQuantity - 1, 1)));
    };

    return (
        <>
            <NavBar/>
            <Container className="my-5">
                <Row>
                    <Col md={6} className="text-center">
                        <Image src={product.productImage} alt={product.productName} fluid className="w-75" />
                        <div className="d-flex justify-content-center mt-3">
                            <Image src={product.productImage} alt={product.productName} thumbnail width="50" className="me-2" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <p className="text-muted">{product.productBrand}</p>
                        <h1>{product.productName}</h1>
                        <div className="my-3">
                            <span className="fw-bold fs-4 text-primary">${product.productPrice}</span>{' '}
                            {/* <span className="text-muted text-decoration-line-through">$PRECIO ANTERIOR</span> */}
                        </div>
                        <p className="text-muted">{product.productDetail}</p>

                        <Row className="my-4">
                            <Col xs={6}>
                                <Form.Label>Cantidad</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Button variant="outline-secondary" onClick={() => handleQuantityChange('decrement')}>-</Button>
                                    <Form.Control type="text" value={quantity} readOnly className="text-center mx-2" style={{ maxWidth: '50px' }} />
                                    <Button variant="outline-secondary" onClick={() => handleQuantityChange('increment')}>+</Button>
                                </div>
                            </Col>
                        </Row>

                        <Button variant="warning" className="w-100 my-3">Añadir al carrito</Button>
                    </Col>
                </Row>
            </Container>
        <Footer/>
        </>
    );
};

export default SingleProduct;
