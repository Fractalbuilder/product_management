import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../App.css';

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="main-container">
      <div className="centered-form">
        <div>
          <h1 className='title' style={{ textAlign: "center" }}>Login</h1>
          <form onSubmit={loginUser}>
            <input type="text" name="username" placeholder="Enter Username" />
            <input type="password" name="password" placeholder="Enter Password" />
            <input type="submit" value="Login" />
          </form>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Link to="/register" style={{ color: "white" }}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
