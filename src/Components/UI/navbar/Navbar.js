import React, { useContext } from 'react';
import classes from './Navbar.module.css';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const exit = (e) => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <div className={classes.navbar}>
      <Link to="/posts" className={classes.link}>Posts</Link>
      <Link to="/about" className={classes.link}>About</Link>
      <Link to="/login" className={classes.link} onClick={exit}>Exit</Link>
    </div>
  )
}

export default Navbar
