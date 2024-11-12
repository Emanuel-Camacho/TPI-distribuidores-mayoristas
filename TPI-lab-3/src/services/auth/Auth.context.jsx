import { createContext, useState, useContext, useEffect } from "react";
export const AuthenticationContext = createContext();
import { useCart } from '../../context/CartContext';

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const { clearCart } = useCart();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        if (token && storedUser) {
            setUser(storedUser);
        }
    }, [token]);

    const handleLogin = (email, userType, id, token) => {
        const userData = {email, userType, id};
        setUser({ email, userType, id });
        setToken(token);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    const handleLogout = () => {
        clearCart();
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
    };

    console.log("User in Auth Context:", user);

    return (
        <AuthenticationContext.Provider value={{ user, token, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuth = () => useContext(AuthenticationContext);
