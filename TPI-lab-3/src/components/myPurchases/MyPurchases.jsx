import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col} from 'react-bootstrap';
import NavBar from '../nav-footer/nav';
import Footer from '../nav-footer/footer';
import './MyPurchases.css';
import { useAuth } from '../../services/auth/Auth.context';

const MyPurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const userId = userData?.id; 
                
                if (!userId) {
                    throw new Error('No se encontró el ID de usuario.');
                }

                const response = await fetch(`https://localhost:7121/api/Buys/user/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }); 
                if (!response.ok) {
                    throw new Error('Error al obtener las compras.');
                }

                const data = await response.json();
                setPurchases(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <>
            <NavBar />
            <Container className="my-5">
                <h2 className="text-center mb-5">Mis Compras</h2>
                {loading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    purchases.map((purchase) => (
                        <Row className="purchase-row" key={purchase.buysId}>
                            <Card className="purchase-card border border-success ms-3">
                                <Row>
                                    <Col xs={12}>
                                        <p><strong>Fecha de compra:</strong> {new Date(purchase.purchaseDate).toLocaleString()}</p>
                                        <Row className="px-3">
                                            <Col><strong>Producto</strong></Col>
                                            <Col className="text-center"><strong>Cantidad</strong></Col>
                                            <Col className="text-center"><strong>Precio Unitario</strong></Col>
                                            <Col className="text-end"><strong>Subtotal</strong></Col>
                                        </Row>
                                        {purchase.details.map((product, index) => (
                                            <Row key={index} className="px-3">
                                                <Col>{product.productName}</Col>
                                                <Col className="text-center">{product.quantity}</Col>
                                                <Col className="text-center">${product.unitPrice.toFixed(2)}</Col>
                                                <Col className="text-end">${(product.unitPrice * product.quantity).toFixed(2)}</Col>
                                            </Row>
                                        ))}
                                        <Row className="mt-3 ms-3">
                                            <Col className="text-end"><strong>Total: ${purchase.totalBuy.toFixed(2)}</strong></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    ))
                )}
            </Container>
            <Footer />
        </>
    );
};

export default MyPurchases;
