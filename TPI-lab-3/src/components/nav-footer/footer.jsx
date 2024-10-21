import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <div className="footer w-100 fixed-bottom">
            <footer className="py-10 my-3" >
                <ul className="nav justify-content-center border-custom pb-3 mb-3" >
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Inicio</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Mis compras</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Carrito</a></li>
                    {/* <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"> </a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"> </a></li> */}
                </ul>
                <p className="text-center text-body-secondary">&copy; 2024 Distribuidora tu pollito</p>
            </footer>
        </div>
    );
}

export default Footer;