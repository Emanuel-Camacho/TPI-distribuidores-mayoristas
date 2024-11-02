import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { products } from "../dashboard/Dashboard";
import NavBar from "../nav-footer/nav";
import Footer from "../nav-footer/footer";
import './Admin.css'
import SingleProduct from "./EditProducts";

const Admin = () => {
    const navigate = useNavigate();
    const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNILEZppKJCs1LHgBaUGbbFzQJsv6b5bt-w&s";

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    return (
        <>
            <NavBar />
            <p>PAGINA ADMIN</p>
            <div className="card-list">
                {products.map((product) => (
                    <Card className="card-container" key={product.id}>
                        <Card.Img
                            className="card-image"
                            src={product.productImage !== "" ? product.productImage : placeholderImage}
                            alt={product.productName}
                        />
                        <Card.Body>
                            <Card.Subtitle>{product.productName}</Card.Subtitle>
                            <Card.Title>${product.productPrice}</Card.Title>
                            <Card.Text>{product.productBrand}</Card.Text>
                            <Button variant="dark" onClick={() => handleCardClick(product.id)}>Editar producto</Button>
                            <p>(falta crear la pag de cada uno) y copiardo de dashboard (eliminar del codigo esta etiqueta p para que quede mejor)</p>
                        </Card.Body>
                    </Card>
                ))}
                <Card className="card-container new-product-card">
                    <Button variant="light" className="new-product-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <p className="new-product-text">Añadir Producto</p>
                    </Button>
                </Card>

            </div>
            <Footer />
        </>
    );
};

export default Admin;