import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { Button } from 'antd';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  };

  return <Button className='logout' onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
