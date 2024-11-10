import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './productCard.css';
import { useCart } from '../../context/CartContext.jsx';

const ProductCard = ({ productName = "Producto sin nombre",
    productBrand = "Marca desconocida", 
    productPrice = "0.00", 
    productImageUrl = "", 
    productId = -1 }) => {
    const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNILEZppKJCs1LHgBaUGbbFzQJsv6b5bt-w&s";
    const navigate = useNavigate();
    const { addToCart } = useCart(); 

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <Card className="card-container" key={productId}>
            <Card.Img
                className="card-image"
                src={productImageUrl !== "" ? productImageUrl : placeholderImage}
                alt={productName}
            />
            <Card.Body>
                <Card.Subtitle>{productName}</Card.Subtitle>
                <Card.Title>${productPrice}</Card.Title>
                <Card.Text>{productBrand}</Card.Text>
                <Button
                    variant="success"
                    onClick={() => addToCart({ productId, productName, productBrand, productPrice, productImageUrl })}
                >
                    Añadir
                </Button>
                <Button onClick={() => handleCardClick(productId)}>Ver producto</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
