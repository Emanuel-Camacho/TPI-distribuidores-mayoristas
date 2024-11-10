import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import './SysAdmin.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EditUserModal from './EditUserModal';
import { useAuth } from '../../services/auth/Auth.context';
import FooterSysAdmin from './nav-footer-sysadmin/FooterSysAdmin';
import NavSysAdmin from './nav-footer-sysadmin/NavSysAdmin';

const SysAdmin = () => {

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://localhost:7121/api/User', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Error al obtener los usuarios');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleShowModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };
    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`https://localhost:7121/api/User/${selectedUser.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                setUsers(users.filter(user => user.id !== selectedUser.id));
                alert(`Usuario eliminado: ${selectedUser.userName}`);
            } else {
                console.error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleAddUser = () => {
        navigate(`/adduser`);
    };

    const handleShowEditModal = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    return (
        <>
            <NavSysAdmin />
            <h1 className='mt-3 mb-3'>PAGINA SYSADMIN</h1>
            <div className="admin-table-container">
                <h3 className="table-title">Usuarios</h3>
                <Button variant="primary" className="create-user-btn" onClick={handleAddUser}>
                    Crear Usuario
                </Button>
                <Table striped bordered hover className="user-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.userType}</td>
                                <td className='actions'>
                                <a 
                                        href="#" 
                                        className="edit-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleShowEditModal(user);
                                        }}
                                    >
                                        Editar
                                    </a>/
                                    <a 
                                        href="#" 
                                        className="delete-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleShowModal(user);
                                        }}
                                    >
                                        Eliminar
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {selectedUser && (
                <>
                    <ConfirmDeleteModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleConfirmDelete={handleConfirmDelete}
                        userName={selectedUser.userName}
                    />
                    <EditUserModal
                            show={showEditModal}
                            handleClose={handleCloseEditModal}
                            user={selectedUser}
                            token={token}
                        />
                </>
                )}
            </div>
            <FooterSysAdmin />
        </>
    );
};

export default SysAdmin;
