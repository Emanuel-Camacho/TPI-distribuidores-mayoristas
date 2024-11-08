import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import './SysAdmin.css';
import NavBar from '../nav-footer/nav';
import Footer from '../nav-footer/footer';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EditUserModal from './EditUserModal';

const SysAdmin = () => {

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const users = [
        { id: 1, name: 'Nombre 1', email: 'email1@example.com', userType:"Client" },
        { id: 2, name: 'Nombre 2', email: 'email2@example.com', userType:"Client" },
        { id: 3, name: 'Nombre 3', email: 'email3@example.com', userType:"Admin" },
        { id: 4, name: 'Nombre 4', email: 'email4@example.com', userType:"Admin" },
        { id: 5, name: 'Nombre 5', email: 'email5@example.com', userType:"SysAdmin" },
    ];
    const handleShowModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };
    const handleConfirmDelete = () => {
        alert(`Usuario eliminado: ${selectedUser.name}`);
        // logica para eliminar al usuario de la lista
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

    const handleSaveUser = (updatedUser) => {
        alert(`Usuario actualizado: ${updatedUser.name} (${updatedUser.email})`);
        // lógica para actualizar el usuario en la lista
    };

    return (
        <>
            <NavBar />
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
                                <td>{user.name}</td>
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
                        userName={selectedUser.name}
                    />
                    <EditUserModal
                            show={showEditModal}
                            handleClose={handleCloseEditModal}
                            user={selectedUser}
                            handleSave={handleSaveUser}
                        />
                </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SysAdmin;
