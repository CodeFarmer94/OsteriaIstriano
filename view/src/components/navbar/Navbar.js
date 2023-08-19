import './navbar.css';
import Istriano_logo from '../../images/Istriano_logo.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, setIsLoggedIn, setUserId } from '../../store/store';
import { FaHome, FaUser } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { RiLoginCircleFill} from "react-icons/ri";

import { BiRestaurant } from "react-icons/bi";
import {BsFillTelephoneFill } from "react-icons/bs";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
export default function Navbar() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)
   
    
       
        
    return (
        <nav className="navbar">
             <Link to='/'><img src= {Istriano_logo} alt='navbar-logo' id='logo'/></Link>
            <ul className="nav-links">
                <li><Link to='/menu'>Menù<span><BiRestaurant/></span></Link></li>
                <li><Link to='/'>Home<span><FaHome/></span></Link></li>
                <li>{isLoggedIn === true ? <Link to='/profile'>Profilo<span><HiUser/></span></Link> : 
                <Link to='/login'>Login<span style={{fontSize:'1.5rem'}}><RiLoginCircleFill/></span></Link>}</li>
                <li><Link to='/contacts'>Contatti<span style={{fontSize:'1.3rem'}}><BsFillTelephoneFill/></span></Link></li>
            </ul>
        </nav>
    );
}
