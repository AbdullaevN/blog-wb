import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import one from '../img/delete.png'
import { Link,  useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment/moment'
import { AuthContext } from '../context/authContext'
import CommentsSection from '../components/CommentsSection'

const Single = () => {
  const [post, setPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate()
  const postId = location.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext)

  console.log(post, 'post');

  useEffect(  () => {
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/api/posts/${postId}`)
        setPost(res.data)
      }catch(e){
        console.log(e)
      }
    } 
    fetchData()
  },[postId])


  const handleDelete = async ()=> {
    try{
       await axios.delete(`/api/posts/${postId}`)
      navigate('/')
    }catch(e){
      console.log(e)
    }
  }

  
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
    <div className="content">
      <img src={`../public/upload/${post?.img}`} alt="" className="post-image" />
      <div className="user-info">
        {post.userImg ? (
          <img src={post.userImg} alt="User" className="user-image" />
        ) : (
          <img
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Default"
            className="user-image"
          />
        )}
        <div className="user-details">
          <span className="username">{post?.username}</span>
          <p className="post-date">Posted {moment(post.date).fromNow()}</p>
        </div>
        {currentUser && currentUser.username === post.username && (
          <div className="edit-options">
            <Link to={`/write?edit=${postId}`} state={post}>
              <img src={Edit} alt="Edit" className="icon" />
            </Link>
            <img src={one} alt="Delete" className="icon" onClick={handleDelete} />
          </div>
        )}
      </div>
      <h1 className="post-title">{post.title}</h1>
      <p className="post-description">{getText(post.desc)}</p>
      <CommentsSection />
    </div>
    <div className="menu">
      <Menu cat={post.cat} />
    </div>
  </div>
);
}

export default Single