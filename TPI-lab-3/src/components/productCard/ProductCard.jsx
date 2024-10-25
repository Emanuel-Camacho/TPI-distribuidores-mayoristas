import { Card, Button } from "react-bootstrap";
import './productCard.css';

const ProductCard = ({ productName = "Unnamed Product", productBrand = "Unknown Brand", productPrice = "0.00", productImage = "" }) => {
    const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNILEZppKJCs1LHgBaUGbbFzQJsv6b5bt-w&s";

    return (
        <Card className="card-container">
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
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
