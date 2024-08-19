import bookIcon from '../assets/book.png';
import '../styles/navbar.css';
import {Link} from "react-router-dom";
import Auth from "../utils/auth.js";

function Navbar() {
    const isLoggedIn = Auth.loggedIn();

  return (
    <nav className="navbar">
    <div className="navbar-left">
        <div className="navbar-logo">
            <Link to="/" className="navbar-nav-link"><img src={bookIcon} alt="Book Nook" className="navbar-logo-icon"/>&nbsp;&nbsp;The Book Nook</Link>
        </div>
    </div>
    <div className="navbar-right">
        <Link to="/cart" className="navbar-nav-link">Cart</Link>
        {isLoggedIn
            ? <>
                <Link to="/profile" className="navbar-nav-link">Profile</Link>
                <Link to="/signOut" className="navbar-nav-link">Sign Out</Link>
              </>
            : <>
                <Link to="/signIn" className="navbar-nav-link">Sign In</Link>
                <Link to="/signUp" className="navbar-nav-link">Sign Up</Link>
              </>
        }
    </div>
</nav>
  );
}

export default Navbar;
