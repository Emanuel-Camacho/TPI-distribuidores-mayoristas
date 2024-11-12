import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ConfirmPurchaseModal.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../services/auth/Auth.context";
import { useCart } from '../../context/CartContext';


function ConfirmPurchaseModal({ show, handleClose, quantities }) {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { cartItems, clearCart } = useCart();

    const handleConfirmarCompra = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userId = userData?.id;

            if (!userId) {
                alert("No se pudo obtener la información del usuario.");
                return;
            }

            const ticket = {
                UserBuysId: userId,
                PurchaseDate: new Date(),
                Details: cartItems.map(item => ({
                    ProductId: item.productId,
                    ProductName: item.productName,
                    UnitPrice: item.productPrice,
                    Quantity: quantities[item.productId] || 1
                })),
                TotalBuy: cartItems.reduce((acc, item) => acc + item.productPrice * (quantities[item.productId] || 1), 0)
            };

            const response = await fetch("https://localhost:7121/api/Buys", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(ticket)
            });

            if (response.ok) {
                clearCart();
                navigate('/mypurchases');
            } else {
                throw new Error("Error al confirmar la compra.");
            }
        } catch (error) {
            console.error("Error al confirmar la compra:", error);
            alert("Hubo un problema al procesar la compra, intenta nuevamente.");
        } finally {
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered >
            <Modal.Header className='modal-header-custom' closeButton>
                <Modal.Title>Confirmación de compra</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-custom text-white'>
                ¿Estás seguro de realizar la compra?
            </Modal.Body>
            <Modal.Footer className='modal-footer-custom'>
                <Button className='cancel-button' onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => {
                    const updatedTicket = {
                        items: cartItems.map(item => ({
                            productName: item.productName,
                            unitPrice: item.productPrice,
                            quantity: quantities[item.productId] || 1,
                            subtotalTicket: (item.productPrice * (quantities[item.productId] || 1)).toFixed(2)
                        })),
                        total: cartItems.reduce((acc, item) => acc + item.productPrice * (quantities[item.productId] || 1), 0).toFixed(2)
                    };
                    localStorage.setItem('ticket', JSON.stringify(updatedTicket));

                    handleConfirmarCompra();  
                }}>
                    Confirmar Compra
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmPurchaseModal;
