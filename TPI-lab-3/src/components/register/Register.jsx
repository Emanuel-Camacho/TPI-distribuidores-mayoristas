import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from
    "react-bootstrap";
import { useNavigate } from "react-router-dom";

import '../register/Register.css'
/* import '../login/login.css' */

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
        <Row className="align-items-center min-vh-100 mx-0">
            <Col xs={12} md={5} className="text-center">
                <a href="/">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1THseam-yBpdGJYlt60zc_zFR-vlRSHuiRw&s" alt="logo" className="logo-img mb-2" />
                </a>
            </Col>
            <Col xs={12} md={7} className="mx-auto">
                <Card className="mt-5 mx-3 p-3 px-5 no-shadow">
                    <Card.Body>
                        <Form>
                            {/* Usuario */}
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className="input"
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
                                    className="input"
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
                                    className="input"
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
                                    className="input"
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
                            <Button className="w-100 register-button mb-3" variant="secondary"
                                onClick={handleLogin}
                                type="button">
                                Registrarse
                            </Button>
                        </Form>
                    </Card.Body>
                    <Row className="center-text mt-3">
                        <Col md="auto">
                            <p className="mb-0">
                                ¿Ya tienes cuenta?
                                <a onClick={handleLoginRedirect} href="#"> Iniciar sesión</a>
                            </p>
                        </Col>
                    </Row>

                </Card>
            </Col>

        </Row>
    );
};
export default Register;