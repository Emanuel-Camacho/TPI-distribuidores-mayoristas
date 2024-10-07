import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import ProductCard from "../productCard/ProductCard";
import './Dashboard.css'
import NavBar from "../nav-footer/nav";
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
    return (
        <>
            <NavBar/>
            <div className="card-list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        productName={product.productName}
                        productBrand={product.productBrand}
                        productDetail={product.productDetail}
                        productPrice={product.productPrice}
                        productImage={product.productImage}
                    />
                ))}
            </div>
        </>
    );
};

export default Dashboard;