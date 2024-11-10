import React from 'react';
import { Container, Card, Row, Col} from 'react-bootstrap';
import NavBar from '../nav-footer/nav';
import Footer from '../nav-footer/footer';
import './MyPurchases.css';

const MyPurchases = () => {
    const purchases = [
        {
            id: 1,
            products: [
                { productName: 'producto 1', quantities: 1 },
                { productName: 'producto 2', quantities: 2 },
                { productName: 'producto 3', quantities: 3 },
            ],
            total: 50,
        },
        {
            id: 2,
            products: [
                { productName: 'producto 4', quantities: 4 },
                { productName: 'producto 5', quantities: 5 },
            ],
            total: 30,
        },
        {
            id: 3,
            products: [
                { productName: 'producto 6', quantities: 6 },
            ],
            total: 15,
        },
    ];

    return (
        <>
            <NavBar />
            <Container className="my-5">
                <h2 className="text-center mb-5">Mis Compras</h2>
                {purchases.map((purchase) => (
                    <Row className="purchase-row" key={purchase.id}>
                        <Card className="purchase-card border border-success ms-3">
                            <Row>
                                <Col xs={9}>
                                    <h5>Compra {purchase.id}</h5>
                                    {purchase.products.map((purchase, index) => (
                                        <Row key={index} className="px-3">
                                            <Col>{purchase.productName}</Col>
                                            <Col className="text-end">{purchase.quantities}</Col>
                                        </Row>
                                    ))}
                                    <Row className="mt-3 ms-3">
                                        <Col><strong>Total</strong></Col>
                                        <Col className="text-end"><strong>${purchase.total}</strong></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                ))}
            </Container>
            <Footer />
        </>
    );
};

export default MyPurchases;
