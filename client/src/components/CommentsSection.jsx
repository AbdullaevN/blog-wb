import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import ButtonAnt from './Button';
const { TextArea } = Input;


const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const postId = location.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`/api/posts/${postId}/comments`)
            .then(response => setComments(response.data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const commentData = { content };
            const response = await axios.post(`/api/posts/${postId}/comments`, commentData);
            setComments([...comments, { ...commentData, createdAt: new Date() }]);
            setContent('');
        } catch (error) {
            console.error('Error adding comment:', error.response ? error.response.data : error.message);
            alert('Failed to add comment');
        }
    };

    return (
        <div>
            <h3>Комментарий</h3>
            <ul>
                {comments.map((comment, index )=> (
                    <li key={index}>
                        <img style={{ width: "50px", height: "50px" }} src={comment.userImg} alt={comment.username} />
                        <strong>{comment.username}</strong>
                        <p>{comment.content}</p>
                        <span>{new Date(comment.createdAt).toLocaleString()}</span>
                    </li>
                ))}
            </ul>

            {
                currentUser ? (
                    <form onSubmit={handleSubmit}>
                        <TextArea rows={4} placeholder="Enter your comment" value={content} onChange={(e) => setContent(e.target.value)} required />
                        {/* <ButtonAnt title="Add Comment" type="submit" /> */}
                        {/* <button type='submit'>add</button> */}  
                          <ButtonAnt title="Add Comment"/>

                    </form>
                ) : (
                    <>
                        <span>Чтобы оставить комментарий авторизуйтесь</span> <br />
                        <Link to="/login" className='link login'>Login</Link>
                    </>
                )
            }
        </div>
    );
};


export default CommentsSection;
