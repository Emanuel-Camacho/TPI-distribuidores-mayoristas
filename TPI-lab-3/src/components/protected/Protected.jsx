import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth/Auth.context";

const Protected = ({ allowedRoles, children }) => {
    const { user } = useContext(AuthenticationContext);

    useEffect(() => {
        console.log("User changed in Protected:", user); 
    }, [user]);

    if (!user) return <Navigate to="/login" replace />;
    
    if (!allowedRoles.includes(user.userType)) {
    
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
