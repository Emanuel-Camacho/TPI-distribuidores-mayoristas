import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const Protected = ({ isSignedIn, children }) => {
    if (!isSignedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

Protected.propTypes = {
    isSignedIn: PropTypes.bool,
    children: PropTypes.object,
};

export default Protected;
