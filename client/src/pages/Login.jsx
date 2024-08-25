// import axios from "axios";
// import React, { useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Form, Input, Button, Checkbox } from 'antd';
// import { AuthContext } from "../context/authContext";

// const Login = () => {
//   const [err, setError] = useState(null);
//   const [show, setShow] = useState(false);

//   const [inputs, setInputs] = useState({
//     username: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleFinish = async (values) => {
//     try {
//       // Assuming login function is defined in AuthContext
//       await axios.post("/api/auth/login", values);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data || "An error occurred");
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(e, )
//     try {
//       await login(inputs)
//       navigate("/");
//     } catch (err) {
//       setError(err.response.data);
//     }
//   };

//   return (
//     <div className="auth">
//       <h1>Login</h1>
//       <Form
//         name="basic"
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         style={{ width: 600 }}
//         initialValues={{ remember: true }}
//         // onFinish={handleFinish}
//         autoComplete="off"
//       >
//         <Form.Item
//           name="username"
//           label="Username"
//           rules={[{ required: true, message: 'Please input your username!' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           label="Password"
//           rules={[{ required: true, message: 'Please input your password!' }]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item
//           name="remember"
//           valuePropName="checked"
//           wrapperCol={{ offset: 8, span: 16 }}
//         >
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         {err && <p>{err}</p>}

//         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//           <Button type="primary" htmlType="submit" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Form.Item>

//         <span>
//           Don't you have an account? <Link to="/register">Register</Link>
//         </span>
//       </Form>
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;