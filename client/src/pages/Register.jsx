import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",

  })
  const [error, setError] = useState(null)

  const navigate = useNavigate()


  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

      try{
        const res = await axios.post("/api/auth/register", inputs)
        navigate('/login')
        console.log(res, 'res')
      }catch(e) {
        console.log(e);
        setError(e.response.data)
      }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>


      <form action="">
        <input required type="text" name="username" placeholder='name' id="" onChange={handleChange}/>
        <input required type="email" name="email" placeholder='email' id="" onChange={handleChange}/>
        <input required type="password" name="password"  placeholder='password'id="" onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        { error && <p>{error}</p>}
        <span>Do you have an account? <Link to='/login'> Login</Link></span>
      </form>
       </div>

  )
}

export default Register