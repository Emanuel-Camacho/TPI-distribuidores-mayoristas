import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import ProductCard from "../productCard/ProductCard";
import './Dashboard.css'
const products = [
    {
        id: 1,
        productName: "Goma de borrar",
        productBrand: "FaberCastell",
        productDetail: "... goma de borrar buena",
        productPrice: 100,
        productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzh6i6yakNOKN9T_86brw655ptQoN2ii5Wyg&s",
    },
    {
        id: 2,
        productName: "Lapiz rojo",
        productBrand: "FaberCastell",
        productDetail: "... lapizardo",
        productPrice: 10000,
        productImage: "https://papelerialacomuna.com/2610-home_default/lapiz-rojo-chequeo-faber-castell.jpg",
    },
    {
        id: 3,
        productName: "birome",
        productBrand: "FaberCastell",
        productDetail: "... lapizerarda",
        productPrice: 15700,
        productImage: "https://http2.mlstatic.com/D_NQ_NP_946208-MLA44173637060_112020-O.webp",
    },
    {
        id: 1,
        productName: "Liquid paper",
        productBrand: "FaberCastell",
        productDetail: "... el liqui",
        productPrice: 14000,
        productImage: "",
    },

];
const Dashboard = () => {

    const navigate = useNavigate();

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <>
            <Row className="w-100">
                <Col />
                <Col className="d-flex justify-content-center">
                    <h2 className="my-4">Mayorista Pepa</h2>
                </Col>
                <Col className="d-flex justify-content-end align-items-center me-3">
                    <Button onClick={handleLogout}>Cerrar sesión</Button>
                </Col>
            </Row>
            <div className="card-list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        productName={product.productName}
                        productBrand={product.productBrand}
                        productDetail={product.productDetail}
                        productPrice={product.productPrice}
                        productImage={product.productImage}
                        onClick={() => handleCardClick(product.id)}
                    />
                ))}
            </div>
        </>
    );
};

export {Dashboard, products};