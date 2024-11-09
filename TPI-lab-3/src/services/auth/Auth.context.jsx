import { createContext, useState, useContext } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken"));

    const handleLogin = (email, userType, id, token) => {
        setUser({ email, userType, id });
        setToken(token);
        localStorage.setItem("authToken", token);
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
    };

    console.log("User in Auth Context:", user);

    return (
        <AuthenticationContext.Provider value={{ user, token, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuth = () => useContext(AuthenticationContext);
