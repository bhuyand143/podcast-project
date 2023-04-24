import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// import Listened from "../ListenedF/Listened";

import "./Header.css";

const Header = () => {
  const { watchlist, watched } = useContext(GlobalContext);
  let navigate=useNavigate();

  const handleLogout=()=>{
      
      localStorage.removeItem('users');
      navigate('/signin');
  }
  
  // console.log(watchlist ? true : false)
  return (
    <>
      <header>
        <div className="inner-content">
          <div class="brand">
            <Link to="/">Home</Link>
          </div>

          <ul className="nav-links">
          <li>
              <Link to="/continue" activeClassName="active">
                Continue Watching{" "}
                {watchlist.length > 0 ? (
                  <ArrowRightIcon style={{ color: "red" }}/>
                ) : (
                  <ArrowRightIcon/>
                )}
              </Link>
            </li>
            <li>
              <Link to="/watchlist" activeClassName="active">
                Favourite List{" "}
                {watchlist.length > 0 ? (
                  <StarBorderIcon style={{ color: "red" }}/>
                ) : (
                  <StarBorderIcon/>
                )}
              </Link>
            </li>
            <li>
                <span style={{color:'wheat'}}>{localStorage.getItem('users') && JSON.parse(localStorage.getItem('users')).username}</span>
            </li>
            <li>
            <div class="dropdown">
                <a
                  href="/Home"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img id="avatar" src="/netflix_avatar.jpg" alt="img"></img>
                </a>
              <div class="dropdown-content">
                <div className="dropdown-divider"></div>
                <p style={{cursor:'pointer',textAlign:'center',padding:'10px'}} onClick={handleLogout} className="dropdown-item">
                  Logout
                </p>
              </div>
            </div>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
