import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import one from '../img/delete.png'
import { Link,  useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment/moment'
import { AuthContext } from '../context/authContext'

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
    <div className='single'>
      
      <div className="content">
        <img src={`../public/upload/${post?.img}`} alt="" />
        <div className='user'>
       {
        post.userImg ?  <img src={post.userImg} alt="" /> :  <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
       }
        <div className="info">
          <span>{post?.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>


      {currentUser.username === post.username && 
       <div className="edit">
       {/* <Link to={`/white?edit=2`}  state={post}> */}
       <Link to={`/write?edit=${postId}`  }    state={post}> 
         <img src={Edit} alt="" />
       </Link>
       <Link to={`/`}>
         <img onClick={handleDelete} src={one} alt="" />
       </Link>
    </div>
      }
        </div>

      <h1>{post.title}</h1>
            {/* {post.desc} */}
            <p>{getText(post.desc)}</p>

      </div>
      <div className="menu">
        <Menu cat={post.cat }/>
      </div>
    </div>
  )
}

export default Single