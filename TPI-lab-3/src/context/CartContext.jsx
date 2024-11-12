import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const isProductInCart = prevItems.some((item) => item.productId === product.productId);
            if (!isProductInCart) {
                return [...prevItems, { ...product }];
            } else {
                alert("El producto ya está en el carrito.");
                return prevItems;
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("carrito");
        localStorage.removeItem("quantities");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("ticket");
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};