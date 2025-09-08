import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useTranslation from '../../custom/UseTraslation';

const LandingPage = () => {
    const navigate = useNavigate();
    const { t, toggleLanguage } = useTranslation(); 

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Container 
            fluid 
            className="text-center d-flex align-items-center justify-content-center min-vh-100" 
            style={{ 
                backgroundImage: 'url("https://i.blogs.es/8e9a04/resumen-desenfoque-supermercado/500_333.jpeg")', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center center', 
                backgroundAttachment: 'fixed', 
            }}
        >
            <Row className="w-100">
                <Col md={12} className="mb-4">
                    <Image 
                        src="/logo-distribuidora.png"
                        alt="Todo al por mayor" 
                        fluid 
                        width="150" 
                        height="150" 
                        className="mb-3" 
                    />
                </Col>
                <Col md={12}>
                    <h1 style={{ color: 'black', maxWidth: '500px', margin: '0 auto' }}>
                        {t.welcome} <br />
                        {t.title}
                    </h1>
                    <p
                    className="lead mb-4 mt-5"
                    style={{
                        color: "black",
                        maxWidth: "500px",
                        margin: "0 auto",
                        backgroundColor: "rgba(255, 255, 255, 0.7)", 
                        padding: "0.75rem 1rem", 
                        borderRadius: "10px", 
                        textAlign: "center", 
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        backdropFilter: "blur(4px)", 
                    }}
                    >
                    {t.description}
                    </p>
                    <Row className="mt-5">
                        <Col md={12}>
                            {t.membership}
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <Col md="auto" className="mt-5">
                            <Button variant="primary" size="lg" onClick={handleLogin} className="me-2">
                                {t.login}
                            </Button>
                            <Button variant="secondary" size="lg" onClick={handleRegister}>
                                {t.register}
                            </Button>
                        </Col>
                    </Row>
                    <div className="mt-4">
                        <Button variant="link" onClick={() => toggleLanguage('es')} className="text-black">Español</Button> |{' '}
                        <Button variant="link" onClick={() => toggleLanguage('en')} className="text-black">English</Button>
                    </div>
                </Col>
            </Row>
            <div className="position-absolute bottom-0 end-0 p-4">
                <Row className="mt-5">
                    <Col md={12}>
                        <Button variant="link" size="lg" className='text-dark' onClick={() => navigate('/')}
                            style={{
                        color: "black",
                        maxWidth: "500px",
                        margin: "0 auto",
                        backgroundColor: "rgba(255, 255, 255, 0.7)", 
                        padding: "0.75rem 1rem", 
                        borderRadius: "10px", 
                        textAlign: "center", 
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        backdropFilter: "blur(4px)", 
                    }}
                    >
                            {t.support}
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default LandingPage;
