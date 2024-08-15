import bookIcon from '../../assets/book.png';
import './style.css';
import {Link} from "react-router-dom";
import Auth from "../../utils/auth.js";

function Navbar() {
    const isLoggedIn = Auth.loggedIn();

  return (
    <nav className="navbar">
      <div className="navbar-left">
      <div className="navbar-logo">
          <img src={bookIcon} alt="Book Nook" className="navbar-logo-icon" />
        </div>
        <div className="navbar-nav">
            <Link to={"/"} className="navbar-nav-link">Home</Link>
            {isLoggedIn
                ?   <>
                        <Link to={"/profile"} className="navbar-nav-link">Profile</Link>
                        <Link to={"/signOut"} className="navbar-nav-link">SignOut</Link>
                    </>
                :   <>
                        <Link to={"/signIn"} className="navbar-nav-link">SignIn</Link>
                        <Link to={"/signUp"} className="navbar-nav-link">SignUp</Link>
                    </>
            }
            <Link to={"#cart"} className="navbar-nav-link">Cart</Link>
        </div>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-input"
        />
        <button className="search-button">
          Search
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
