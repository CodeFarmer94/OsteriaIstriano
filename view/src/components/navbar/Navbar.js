import './navbar.css';
import Istriano_logo from '../../images/Istriano_logo.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, setIsLoggedIn, setUserId } from '../../store/store';
import { FaHome, FaUser } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { RiLoginCircleFill} from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { BiRestaurant } from "react-icons/bi";
import {BsFillTelephoneFill } from "react-icons/bs";




export default function Navbar() {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()
    
const handleScrollToContacts = async () => {
    return new Promise((resolve, reject) => {
        navigate('/');
        resolve(); 
    }).then(() => {
        console.log("Navigation completed!");
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Use 'auto' for instant scrolling
        });
    });
}

        
    return (
        <nav className="navbar">
             <Link to='/'><img src= {Istriano_logo} alt='navbar-logo' id='logo'/></Link>
            <ul className="nav-links">
                <li><Link to='/menu'>Menù<span><BiRestaurant/></span></Link></li>
                <li><Link to='/'>Home<span><FaHome/></span></Link></li>
                <li>{isLoggedIn === true ? <Link to='/profile'>Profilo<span><HiUser/></span></Link> : 
                <Link to='/login'>Login<span id='login-icon' ><RiLoginCircleFill/></span></Link>}</li>
                <li><div style={{cursor:'pointer'}}onClick={handleScrollToContacts}>Contatti<span id='phone-icon' ><BsFillTelephoneFill/></span></div></li>
            </ul>
        </nav>
        
      
    );
}
