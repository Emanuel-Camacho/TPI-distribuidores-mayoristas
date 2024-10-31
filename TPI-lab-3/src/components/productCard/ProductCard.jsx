import { Card, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import './productCard.css';

const ProductCard = ({ productName = "Unnamed Product", productBrand = "Unknown Brand", productPrice = "0.00", productImage = "",id = -1 }) => {
    const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNILEZppKJCs1LHgBaUGbbFzQJsv6b5bt-w&s";

    const navigate = useNavigate();

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
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
                <Button variant="success">Añadir</Button> {/* Botón de Bootstrap */}

                <Button onClick={() => handleCardClick(id)} >Ver producto</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
