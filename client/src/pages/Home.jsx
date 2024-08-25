import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ButtonAnt from '../components/Button';

const Home = () => {

  const [posts, setPosts] = useState([])
  const [valueSearch, setValueSearch] = useState("")
  
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  


  const cat = useLocation().search


  useEffect(  () => {
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/api/posts${cat}`)
        // const res = await axios.get(`/api/posts${cat}&page=${page}&limit=4`);

        setPosts(res.data)
        // setTotalPages(Math.ceil(res.data.total / 4)); // Assuming `total` is returned in the response

      }catch(e){
        console.log(e)
      }
    } 
    fetchData()
  },[cat])

  const filteredBlog = posts.filter(post => {
    return post.title.toLowerCase().includes(valueSearch.toLowerCase())
  })
 
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const textContent = doc.body.textContent || "";
    const words = textContent.split(" ").slice(0, 15).join(" ");
    return words + (textContent.split(" ").length > 15 ? "..." : "");
  };

  const hanldeSubmit = (e)=> {
    e.preventDefault()
  }

  return (
    <div className='home '>
            <div className="posts container-fluid">
            <form  onSubmit={hanldeSubmit} method="post">
          <div className="box">
        <i className="fa-brands fa-searching"></i>
        <input type="text" name="" placeholder='search'  onChange={(e) =>  setValueSearch(e.target.value)} />
    </div>
			</form>
 



              { Array.isArray(filteredBlog) && filteredBlog.map(post => (
                <div className="post" key={post.id}>

                    <div className='img'>
                    {
                      post.img? 
                    <img src={`../public/upload/${post.img}`}  alt="" />
                      :
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga6yisHc6htna4rQdhlFyffWiWv1a1bsC9g&s' />
                    }

                    <div className='bg'></div>
                    </div>  
                    <div className="content">
                      <Link className='link' to={`/post/${post.id}`}>
                      <h1 className='content_link'>{post.title}</h1>
                      </Link>
                      <p>{getText(post.desc)}</p>
                    <Link to={`/post/${post.id}`}>
                    <ButtonAnt   title='Read more'/>
                    </Link>
                      </div>                
                </div>
              ))}
                 
      </div>
    </div>
  )
}

export default Home
 