import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';


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
        console.log(res.headers.date, 'res')
      }catch(e) {
        console.log(e);
        setError(e.response.data)
      }
  }



    // formik validation
    const SignupSchema = Yup.object().shape({
      username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),

    });
  return (
    <div className='auth'>
      <h1>Register</h1>



      <Formik
      initialValues={{
      
        inputs
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
         console.log(values);
      }}
    
    >
       {({ errors, touched }) => (
      <Form>

        {/* <label htmlFor="username">username</label> */}
        <Field id="username" name="username" placeholder="Username" 
          type="text"
          onChange={handleChange}
          />
            {errors.username && touched.username ? (
             <div>{errors.username}</div>
           ) : null}

        {/* <label htmlFor="email">Email</label> */}
        <Field type="email" id="email" name="email" placeholder="email"   onChange={handleChange} />
        {errors.email && touched.email ? (
             <div>{errors.email}</div>
           ) : null}


<Field type="password" id="password" name="password" placeholder="password"   onChange={handleChange} />
        {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}
     
     <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>Do you have an account? <Link to='/login'> Login</Link></span>
      </Form>
        )}
    </Formik>

      {/* <form action="">
        <input required type="text" name="username" placeholder='name' id="" onChange={handleChange}/>
        <input required type="email" name="email" placeholder='email' id="" onChange={handleChange}/>
        <input required type="password" name="password"  placeholder='password'id="" onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        { error && <p>{error}</p>}
        <span>Do you have an account? <Link to='/login'> Login</Link></span>
      </form> */}
       </div>

  )
}

export default Register