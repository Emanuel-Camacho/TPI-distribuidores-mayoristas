import { useParams } from 'react-router-dom';
import { products } from '../dashboard/Dashboard';
import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import NavBar from "../nav-footer/nav";
import Footer from "../nav-footer/footer";


const EditProduct = () => {
    const { id } = useParams();
    const product = products.find((prod) => prod.id === Number(id));

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
                        </div>
                        <p className="text-muted">{product.productDetail}</p>
                    </Col>
                </Row>
            </Container>
        <Footer/>
        </>
    );
};

export default EditProduct;
