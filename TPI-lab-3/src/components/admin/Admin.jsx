import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import NavBar from "../nav-footer/nav";
import Footer from "../nav-footer/footer";
import './Admin.css'
import { useAuth } from "../../services/auth/Auth.context";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";


const Admin = () => {
    const [products, setProducts] = useState([]);  
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://localhost:7121/api/Product", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }); 
                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
                }
                const data = await response.json();
                setProducts(data); 
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchProducts();
    }, []);
    const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNILEZppKJCs1LHgBaUGbbFzQJsv6b5bt-w&s";

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
        window.location.reload();
    };

    const handleCardClick = (productId) => {
        navigate(`/edit/${productId}`);
    };

    const handleAddProduct = () => {
        navigate(`/addproduct`);
    };
    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`https://localhost:7121/api/Product/${selectedProduct.productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                alert(`Producto eliminado: ${selectedProduct.productName}`);
            } else {
                console.error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    return (
        <>
            <NavBar />
            <p>PAGINA ADMIN</p>
            <div className="card-list">
                <Card className="card-container new-product-card">
                    <Button variant="light" className="new-product-button" onClick={handleAddProduct}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <p className="new-product-text">Añadir Producto</p>
                    </Button>
                </Card>
                {products.map((product) => (
                    <Card className="card-container" key={product.id}>
                        <Card.Img
                            className="card-image"
                            src={product.productImageUrl !== "" ? product.productImageUrl : placeholderImage}
                            alt={product.productName}
                        />
                        <Card.Body>
                            <Card.Subtitle>{product.productName}</Card.Subtitle>
                            <Card.Title>${product.productPrice}</Card.Title>
                            <Card.Text>{product.productBrand}</Card.Text>
                            <Button variant="dark" onClick={() => handleCardClick(product.id)}>Editar producto</Button>
                            <Button 
                                variant="danger" 
                                onClick={() => handleShowModal(product)}>
                                    Eliminar producto
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
                {selectedProduct&& (
                <>
                    <ConfirmDeleteProduct
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleConfirmDelete={handleConfirmDelete}
                        productName={selectedProduct.productName}
                    />
                </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Admin;