import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, FormControl, InputGroup, Card } from 'react-bootstrap';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../nav-footer/nav';
import Footer from '../nav-footer/footer';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const shippingCost = 5000;
    const navigate = useNavigate();

    const [quantities, setQuantities] = useState(() => {
        const savedQuantities = localStorage.getItem('quantities');
        return savedQuantities
            ? JSON.parse(savedQuantities)
            : cartItems.reduce((acc, product) => ({ ...acc, [product.productId]: 1 }), {});
    });

    const totalPrice = cartItems.reduce((acc, product) => acc + product.productPrice * quantities[product.productId], 0);

    const handlePaymentMethod = () => {
        if (cartItems.length === 0) {
            alert("Tu carrito está vacío. Por favor, añade productos antes de proceder a la compra.");
        } else {
            navigate("/paymentmethod");
        }
    };

    const handleQuantityChange = (productId, type) => {
        setQuantities((prevQuantities) => {
            const newQuantities = {
                ...prevQuantities,
                [productId]: type === 'increment'
                    ? (prevQuantities[productId] || 1) + 1
                    : Math.max((prevQuantities[productId] || 1) - 1, 1)
            };

            localStorage.setItem('quantities', JSON.stringify(newQuantities));
            return newQuantities;
        });
    };
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);

        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[productId];
            localStorage.setItem('quantities', JSON.stringify(newQuantities)); // Actualiza localStorage
            return newQuantities;
        });
    };

    useEffect(() => {
        setQuantities((prevQuantities) => {
            const savedQuantities = localStorage.getItem('quantities');
            const parsedQuantities = savedQuantities ? JSON.parse(savedQuantities) : {};
            return {
                ...cartItems.reduce((acc, product) => ({
                    ...acc,
                    [product.productId]: parsedQuantities[product.productId] || 1
                }), {}),
                ...prevQuantities
            };
        });
    }, [cartItems]);

    return (
        <>
            <NavBar />
            <Container className="my-5">
                <h2>Tu carrito</h2>
                <Row>
                    {/* Tabla del carrito */}
                    <Col md={8}>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className='text-center'>
                                            <p className="display-6">Carrito Vacío</p>
                                        </td>
                                    </tr>
                                    ) : (
                                        cartItems.map((product) => (
                                            <tr key={product.productId}>
                                                <td>
                                                    <Row>
                                                        <Col xs={4}>
                                                            <img
                                                                src={product.productImageUrl}
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
                                                <td className="price-column"><strong>${product.productPrice.toFixed(2)}</strong></td>
                                                <td className="quantity-column">
                                                    <InputGroup className='d-flex align-items-center'>
                                                        <Button variant="outline-secondary" onClick={() => handleQuantityChange(product.productId, 'decrement')}>-</Button>
                                                        <FormControl
                                                            value={quantities[product.productId]}
                                                            readOnly
                                                            className='quantity-input'
                                                            style={{ textAlign: 'center', maxWidth: '70px' }}
                                                        />
                                                        <Button variant="outline-secondary" onClick={() => handleQuantityChange(product.productId, 'increment')}>+</Button>
                                                    </InputGroup>
                                                </td>
                                                <td className="subtotal-column"><strong>${(product.productPrice * quantities[product.productId]).toFixed(2)}</strong></td>
                                                <td>
                                                    <Button variant="link" className="trash-button" onClick={() => handleRemoveFromCart(product.productId)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                        </svg>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>

                    {/* Cart Totals */}
                    <Col md={4}>
                        <Card className="p-6 p-md-12 bg-black text-white">
                            <Card.Body>
                                <Card.Title>Carrito</Card.Title>
                                <Row className="my-3">
                                    <Col>Total</Col>
                                    <Col className="text-end">
                                        <strong>${(totalPrice).toFixed(2)}</strong>
                                    </Col>
                                </Row>
                                <Button variant="warning" className="w-100 mt-5" onClick={handlePaymentMethod}>Comprar</Button>
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
