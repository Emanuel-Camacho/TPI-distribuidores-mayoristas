import React from 'react';
import './FooterSysAdmin.css'
import { useNavigate } from 'react-router-dom';

const FooterSysAdmin = () => {
    const navigate = useNavigate ();
    const handlerSysAdmin = () => {
        navigate ('/sysadmin');
    }
    return (
        <div className="footer w-100 fixed-bottom overflow-hidden position-relative">
            <footer className="py-10 my-3" >
                <ul className="nav justify-content-center border-custom pb-3 mb-3" >
                    <li className="nav-item"><a onClick={handlerSysAdmin} className="nav-link px-2 text-body-secondary">Inicio</a></li>
                </ul>
                <p className="text-center text-body-secondary">&copy; 2024 Distribuidora Mayorista</p>
            </footer>
        </div>
    );
}

export default FooterSysAdmin;