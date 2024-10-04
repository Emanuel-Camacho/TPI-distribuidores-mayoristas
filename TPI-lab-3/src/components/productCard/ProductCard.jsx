import { Card } from "react-bootstrap";
import './productCard.css'


const ProductCard = ({ productName, productBrand, productPrice, productImage }) => {
    return (
        <Card className="card-container">
            <Card.Img className="card-image" src={productImage !== "" ? productImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNILEZppKJCs1LHgBaUGbbFzQJsv6b5bt-w&s"} />
            <Card.Body>
                <Card.Subtitle>{productName}</Card.Subtitle>
                <Card.Title>${productPrice}</Card.Title>
                <Card.Text>{productBrand}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default ProductCard;