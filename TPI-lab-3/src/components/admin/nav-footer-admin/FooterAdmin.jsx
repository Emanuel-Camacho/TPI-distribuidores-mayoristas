import React from 'react';
import './FooterAdmin.css'
import { useNavigate } from 'react-router-dom';

const FooterAdmin = () => {
    const navigate = useNavigate ();
    const handlerAdmin = () => {
        navigate ('/admin');
    }
    return (
        <div className="footer w-100 fixed-bottom overflow-hidden position-relative">
            <footer className="py-10 my-3" >
                <ul className="nav justify-content-center border-custom pb-3 mb-3" >
                    <li className="nav-item"><a onClick={handlerAdmin} className="nav-link px-2 text-body-secondary">Inicio</a></li>
                </ul>
                <p className="text-center text-body-secondary">&copy; 2024 Distribuidora Mayorista</p>
            </footer>
        </div>
    );
}

export default FooterAdmin;