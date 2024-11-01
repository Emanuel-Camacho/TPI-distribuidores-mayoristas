import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Form, InputGroup, FormControl, Card } from 'react-bootstrap';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../nav-footer/nav';
import Footer from '../nav-footer/footer';
import PaymentMethod from '../paymentMethod/PaymentMethod';


const Cart = () => {
    const { cartItems } = useCart();
    const shippingCost = 5000;
    const navigate = useNavigate();

    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
    );

    const totalPrice = cartItems.reduce((acc, product) => acc + product.productPrice * quantities[product.id], 0);

    const handlePymentMethod = () => {
        navigate("/paymentmethod");
    };

    const handleQuantityChange = (productId, type) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: type === 'increment'
                ? prevQuantities[productId] + 1
                : Math.max(prevQuantities[productId] - 1, 1)
        }));
    };

    return (
        <>
            <NavBar />
            <Container className="my-5">
                <h2>Tu carrito</h2>
                <Row>
                    {/* Tabla del carrito */}
                    <Col md={8}>
                        <Table responsive  >
                            <thead>
                                <tr>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <Row>
                                                <Col xs={4}>
                                                    <img
                                                        src={product.productImage}
                                                        alt={product.productName}
                                                        className="img-fluid"
                                                    />
                                                </Col>
                                                <Col xs={8}>
                                                    <h5>{product.productName}</h5>
                                                    <p>{product.productBrand}</p>
                                                    <p>{product.productDetail}</p>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td><strong>${product.productPrice.toFixed(2)}</strong></td>
                                        <td>
                                            <InputGroup>
                                                <Button variant="outline-secondary" onClick={() => handleQuantityChange(product.id, 'decrement')}>-</Button>
                                                <FormControl
                                                    value={quantities[product.id]}
                                                    readOnly
                                                    style={{ width: '50px', textAlign: 'center' }}
                                                />
                                                <Button variant="outline-secondary" onClick={() => handleQuantityChange(product.id, 'increment')}>+</Button>
                                            </InputGroup>
                                        </td>
                                        <td><strong>${(product.productPrice * quantities[product.id]).toFixed(2)}</strong></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>

                    {/* Cart Totals */}
                    <Col md={4}>
                        <Card className="p-6 p-md-12  bg-black text-white">
                            <Card.Body>
                                <Card.Title>Total carrito</Card.Title>
                                <Row className="my-3">
                                    <Col>Subtotal</Col>
                                    <Col className="text-end">${totalPrice.toFixed(2)}</Col>
                                </Row>
                                <Row className="my-3">
                                    <Col>Envio</Col>
                                    <Col className="text-end">${shippingCost.toFixed(2)}</Col>
                                </Row>
                                <Row className="my-3">
                                    <Col>Total</Col>
                                    <Col className="text-end">
                                        <strong>${(totalPrice + shippingCost).toFixed(2)}</strong>
                                    </Col>
                                </Row>
                                <Button variant="warning" className="w-100 mt-5" onClick={handlePymentMethod}>Comprar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Cart;
