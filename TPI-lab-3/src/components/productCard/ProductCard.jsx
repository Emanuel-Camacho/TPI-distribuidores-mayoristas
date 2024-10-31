import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './productCard.css';
import { listCart } from "../dashboard/Dashboard";
import { products } from "../dashboard/Dashboard";

const ProductCard = ({ productName = "Unnamed Product", productBrand = "Unknown Brand", productPrice = "0.00", productImage = "", id = -1 }) => {
    const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNILEZppKJCs1LHgBaUGbbFzQJsv6b5bt-w&s";
    const navigate = useNavigate();

    const [userCart, setUserCart] = useState(listCart);

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handlerAddToCart = (product) => {
        // Verifica si el producto ya está en el carrito
        const isProductInCart = userCart.some((cartItem) => cartItem.id === product.id);

        if (!isProductInCart) {
            // Si no está en el carrito, lo agrega
            setUserCart([...userCart, product]);
        } else {
            alert("El producto ya está en el carrito.");
        }
    };

    return (
        <Card className="card-container" key={id}>
            <Card.Img
                className="card-image"
                src={productImage !== "" ? productImage : placeholderImage}
                alt={productName}
            />
            <Card.Body>
                <Card.Subtitle>{productName}</Card.Subtitle>
                <Card.Title>${productPrice}</Card.Title>
                <Card.Text>{productBrand}</Card.Text>
                <Button
                    variant="success"
                    onClick={() => handlerAddToCart({ id, productName, productBrand, productPrice, productImage })}
                >
                    Añadir
                </Button>
                <Button onClick={() => handleCardClick(id)}>Ver producto</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
