import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate("/");
    };
    return (
        <div className="text-center mt-5">
            <h2 className="mb-5">La página que intentas buscar no existe.</h2>
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5 py-4 ">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1THseam-yBpdGJYlt60zc_zFR-vlRSHuiRw&s" 
                    alt="Not found"
                    style={{ maxWidth: "150px", width: "100%" }}
                />
                <Button 
                    variant="secondary" 
                    className="px-3 py-3 fw-bold" 
                    onClick={goBackHandler}
                >
                    Volver al inicio
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
