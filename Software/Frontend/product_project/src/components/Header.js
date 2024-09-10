import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light header">
      <div className="container-fluid">
        <h5 className="header-home">Products Management</h5>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto"> {/* ms-auto aligns to the right */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link header-link">
                    {user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link header-link" onClick={logoutUser} style={{ cursor: 'pointer' }}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link header-link">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
