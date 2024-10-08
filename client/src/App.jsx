import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Single from './pages/Single';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Write from './pages/Write';

import './style.scss'
// import './style.css'

import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Ant from './pages/Ant';



const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'/post/:id',
        element: <Single/>
      },
      {
        path:'/write',
        element: <Write/>
      },
      {
        path:'/profile/:id',
        element: <Profile/>
      },
      {
        path:'/profile-edit/:id',
        element: <ProfileEdit/>
      },
      {
        path:'/register',
        element: <Register/>
      },
      {
        path:'/login',
        element: <Login/>
      }
    ]
  },
  {
    path:'/test',
    // element: <div>this is test</div>
    element: <Ant/>
  },
  {
    path:'/register',
    element: <Register/>
  },
  {
    path:'/login',
    element: <Login/>
  }
])

function App() {
  return (
    <div className='app'>
      <div className='container'>

      <RouterProvider router={router}/>
      </div>
    </div>
  )
}




export default App;
