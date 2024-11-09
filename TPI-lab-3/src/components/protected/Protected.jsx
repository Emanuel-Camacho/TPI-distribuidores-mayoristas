import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth/Auth.context";

const Protected = ({ allowedRoles, children }) => {
    const { user, token } = useContext(AuthenticationContext);

    useEffect(() => {
        console.log("User changed in Protected:", user); 
    }, [user]);

    if (!user && !token) return <Navigate to="/login" replace />;
    
    if (user && !allowedRoles.includes(user.userType)) {
    
    return <Navigate to="/login" replace />;
    }

    return (
        <>
        {console.log("Outlet is rendered")}
        {children}
        </>
    )
    
};

export default Protected;
