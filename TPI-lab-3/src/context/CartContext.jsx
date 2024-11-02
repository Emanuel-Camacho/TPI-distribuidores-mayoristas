import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const isProductInCart = prevItems.some((item) => item.id === product.id);
            if (!isProductInCart) {
                return [...prevItems, { ...product }];
            } else {
                alert("El producto ya está en el carrito.");
                return prevItems;
            }
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};