import './navbar.css';
import Istriano_logo from '../../images/Istriano_logo.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/store';
export default function Navbar() {

    const isLoggedIn = useSelector(selectIsLoggedIn)

    return (
        <nav className="navbar">
            <img src= {Istriano_logo} alt='navbar-logo' id='logo'/>
            <ul className="nav-links">
                <li><Link to='/menu'>Menù</Link></li>
                <li><Link to='/'>Home</Link></li>
                <li>{isLoggedIn === true ? <Link to='/profile'>Profile</Link> : <Link to='/login'>Login</Link>}</li>
                <li><Link to='/contacts'>Contatti</Link></li>
            </ul>
        </nav>
    );
}
