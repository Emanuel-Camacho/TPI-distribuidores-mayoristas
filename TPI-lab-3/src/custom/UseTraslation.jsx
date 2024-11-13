import { useState } from 'react';

const useTranslation = () => {
    const [language, setLanguage] = useState('es'); 

    const translations = {
        es: {
            welcome: "Bienvenidos a",
            title: "Todo al Por Mayor",
            description: "En Todo al Por Mayor, nos enorgullece ofrecer una gran variedad de productos al mejor precio. Encuentra tus bebidas favoritas, snacks, dulces y mucho más. Estamos comprometidos en brindar productos de alta calidad y un servicio excepcional a todos nuestros clientes.",
            login: "Iniciar Sesión",
            register: "Registrarse",
            support: "¿Necesitas ayuda? Contáctanos",
            membership: "¡Únete hoy y aprovecha nuestras ofertas exclusivas!"
        },
        en: {
            welcome: "Welcome to",
            title: "Todo al Por Mayor",
            description: "At Todo al Por Mayor, we take pride in offering a wide variety of products at the best price. Find your favorite drinks, snacks, sweets, and much more. We are committed to providing high-quality products and exceptional service to all our customers.",
            login: "Log In",
            register: "Register",
            support: "Need help? Contact us",
            membership: "Join today and take advantage of our exclusive offers!"
        }
    };

    const toggleLanguage = (lang) => {
        setLanguage(lang);
    };

    return { t: translations[language], toggleLanguage };
};

export default useTranslation;