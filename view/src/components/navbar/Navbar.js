import './navbar.css';
import Istriano_logo from '../../images/Istriano_logo.png'

export default function Navbar() {
    return (
        <nav className="navbar">
            <img src= {Istriano_logo} alt='navbar-logo' id='logo'/>
            <ul className="nav-links">
            </ul>
        </nav>
    );
}
