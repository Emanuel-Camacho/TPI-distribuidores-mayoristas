import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from
    "react-bootstrap";
import { useNavigate } from "react-router-dom";

import '../login/login.css'

const Register = ({ onRegister }) => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errors, setErrors] = useState({
        user: false,
        email: false,
        password: false,
        passwordRepeat: false,
    });

    const userRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordRepeatRef = useRef(null);
    // referencian los inputs directamente

    const navigate = useNavigate();
    // redirecciona al usuario a otras rutas

    const handleChangeUser = (event) => {
        setUser(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            user: event.target.value.length === 0
        }));
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            email: event.target.value.length === 0
        }));
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            password: event.target.value.length === 0
        }));
    };

    const handleChangePasswordRepeat = (event) => {
        setPasswordRepeat(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            passwordRepeat: event.target.value.length === 0
        }));
    };

    const handleLogin = async () => {
        if (userRef.current.value.length === 0) {
            alert("¡Usuario vacío!");
            userRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                user: true
            }));
            return;
        }

        if (emailRef.current.value.length === 0) {
            alert("¡Email vacío!");
            emailRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                email: true
            }));
            return;
        }

        if (password.length === 0) {
            alert("¡Password vacío!");
            passwordRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                password: true
            }));
            return;
        }

        if (passwordRepeat.length === 0) {
            alert("¡Password vacío!");
            passwordRepeatRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                passwordRepeat: true
            }));
            return;
        }
        else if (password !== passwordRepeat) {
            alert("¡Las contraseñas no coinciden!");
            passwordRepeatRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                passwordRepeat: true
            }));
            return;
        }

        onRegister();
        navigate("/");


        /* try {
            const res = await fetch("http://localhost:5268/api/Authentication",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

            if (!res.ok) {
                throw res;
            }

            const data = await res.text();
            localStorage.setItem("bookchampions-token", data);
            navigate("/");
        }
        catch (error) {
            console.error(error);
        } */
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    }

    return (
        <>
            <Card className="mt-5 mx-3 p-3 px-5 shadow">
                <Card.Body>
                    <Form>
                        {/* Usuario */}
                        <FormGroup className="mb-4">
                            <Form.Control
                                ref={userRef}
                                value={user}
                                onChange={handleChangeUser}
                                type="text"
                                placeholder="Ingresar Usuario" />
                            {errors.user &&
                                <p className="text-danger">El usuario no debe ser vacío</p>
                            }
                        </FormGroup>
                        {/* Email */}
                        <FormGroup className="mb-4">
                            <Form.Control
                                ref={emailRef}
                                value={email}
                                onChange={handleChangeEmail}
                                type="email"
                                placeholder="Ingresar Email" />
                            {errors.email &&
                                <p className="text-danger">El email no debe ser vacío</p>
                            }
                        </FormGroup>
                        {/* Password */}
                        <FormGroup className="mb-4">
                            <Form.Control
                                ref={passwordRef}
                                value={password}
                                onChange={handleChangePassword}
                                type="password"
                                required
                                placeholder="Ingresar contraseña"
                            />
                            {errors.password &&
                                <p className="text-danger">El password no debe ser vacío</p>}
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                ref={passwordRepeatRef}
                                value={passwordRepeat}
                                onChange={handleChangePasswordRepeat}
                                type="password"
                                required
                                placeholder="Repetir contraseña"
                            />
                            {errors.passwordRepeat &&
                                <p className="text-danger">Las contraseñas deben coincidir</p>}
                        </FormGroup>
                    </Form>
                    <Row>
                        <Col />
                        <Col md={8} className="d-flex justify-content-end">
                            <Button className="register-button" variant="secondary"
                                onClick={handleLogin}
                                type="button">
                                Registrarse
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Row className="justify-content-end mt-3"> {/* no podemos alinear a la derecha */}
                <Col md="auto" className="d-flex">
                    <p className="mb-0">¿Ya tienes cuenta? <a onClick={handleLoginRedirect} href="#">Iniciar sesion</a></p>
                </Col>
            </Row>
        </>
    );
};
export default Register;