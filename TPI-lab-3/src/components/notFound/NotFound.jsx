import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const goBackLoginHandler = () => {
        navigate("/login");
    };
    return (
        <div className="text-center mt-3">
            <h2> ¡Ups! La página solicitada no fue encontrada</h2>
            <Button className="text-center" onClick={goBackLoginHandler}>
                Volver a iniciar sesión
            </Button>
        </div>
    );
};

export default NotFound;
