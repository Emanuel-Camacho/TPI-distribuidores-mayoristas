import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import ProductCard from "../productCard/ProductCard";
import './Dashboard.css'
import NavBar from "../nav-footer/nav";
import Footer from "../nav-footer/footer";
import { useAuth } from "../../services/auth/Auth.context";

const Dashboard = () => {
    const [products, setProducts] = useState([]);  
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
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

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.productCategory === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    
    const handleMembershipClick = () => {
        navigate(`/membership`);
    };

    return (
        <>
            <NavBar setSearchTerm={setSearchTerm} setSelectedCategory={setSelectedCategory} />
            <Button 
                variant="success" 
                onClick={handleMembershipClick}
                className="ms-auto my-3 "
                >
                Adquirir Membresia
            </Button>
            <div className="card-list mt-5">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.productId}
                        productId={product.productId}
                        productName={product.productName}
                        productBrand={product.productBrand}
                        productDetail={product.productDetail}
                        productPrice={product.productPrice}
                        productImageUrl={product.productImageUrl}
                        onClick={() => handleCardClick(product.productId)}
                    />
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;