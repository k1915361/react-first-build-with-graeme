import { NavLink } from 'react-router-dom';
import './Navbar.css';


function NavBar() {
    
    const getLinkStyle = ({isActive}) => (isActive ? 'navSelected' : null);

    return (
        <nav>
            <div className="navItem">
                <NavLink to="/" className={getLinkStyle}>Home</NavLink>
            </div>
            <div className="navItem">
                <NavLink to="/users" className={getLinkStyle}>Users</NavLink>
            </div>
            <div className="navItem">
                <NavLink to="/signin" className={getLinkStyle}>Sign In</NavLink>
            </div>
            <div className="navItem">
                <NavLink to="/contact" className={getLinkStyle} >Contact us</NavLink>
            </div>
        </nav>
    )
}

export default NavBar;