import React, { useContext, useEffect, useState } from 'react'
import logo from '../img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import LogoutButton from './LogoutButton';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger and close icons





const Navbar = ({user}) => {

  const { currentUser } = useContext(AuthContext);
  const [isDarkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check local storage for dark mode preference
    const savedDarkMode = localStorage.getItem('dark-mode') === 'enabled';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
  }, [isDarkMode]);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
 
  
  return (

    <div className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='container'>
        <div className="logo">
          <Link to="/" className='logo-href'>          
          {/* <img className='logo-image' src={logo}   alt="" /> */}
          <h1 >BLOG </h1>
          </Link>
        </div>
        <div className='menu-toggle' onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className={`links ${isMobileMenuOpen ? 'active' : ''}`}>
       
           
            <Link to='/?cat=art' className='link'><h6>ART</h6></Link>
            <Link to='/?cat=science' className='link'><h6>SCIENCE</h6></Link>
            <Link to='/?cat=technology' className='link'><h6>TECHNOLOGY</h6></Link>
            <Link to='/?cat=cinema' className='link'><h6>CINEMA</h6></Link>
            <Link to='/?cat=design' className='link'><h6>DESIGN</h6></Link>
            <Link to='/?cat=food' className='link'><h6>FOOD</h6></Link>
              
            {/* <Link to={`/profile/${currentUser?.id}`}><span>{currentUser?.username}</span></Link> */}



              {/* { currentUser ?  <span onClick={logout} className='logout'>logout</span> : <Link className='link login ' to="/login">Login</Link>} */}
              {currentUser ? (
            <>
              <Link to={`/profile/${currentUser?.id}`}><span>{currentUser?.username ? currentUser.username : "no"}</span></Link>
              <LogoutButton />
            </>
          ) : (
            <Link to="/login" className='link login'>Login</Link>
          )}


              <span className='write'>
                <Link className='link' to='/write'>Write</Link>
              </span>

            <div className='link'>
            <DarkModeSwitch
              style={{ marginBottom: '0' }}
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={40}
            />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar