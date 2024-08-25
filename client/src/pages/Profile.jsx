import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`);
                setUser(response.data);
                console.log(response,'res' )
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>User not found</p>;
    }

    console.log(user, 'USER')
    return (
        <div className="profile">
          <div>
          <h1>{user.username}'s Profile</h1>
            <p>Email: {user.email}</p>
            <img className='profile_user_img' src={user.img  } alt="" />
            <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
          <Link to={`/profile-edit/${user.id}`}>
          <button>Edit profile</button>
          </Link>
          </div>
             
        </div>
    );
};

export default Profile;
