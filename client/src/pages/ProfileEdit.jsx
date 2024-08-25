import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const ProfileEdit = () => {
  const { logout } = useContext(AuthContext);

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        img: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/users/${id}`, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate(`/profile/${id}`);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/users/${id}`);
            logout()
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-edit">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={user.username} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={user.email} onChange={handleChange} />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="img" value={user.img} onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={handleDelete}>Delete Account</button>
            </form>
        </div>
    );
};

export default ProfileEdit;
