import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../App.css';

const RegisterPage = () => {
  let { registerUser } = useContext(AuthContext);

  return (
    <div className="main-container">
      <div className="centered-form">
        <div>
          <h1 className='title' style={{ textAlign: "center" }}>Register</h1>
          <form onSubmit={registerUser}>
            <input type="text" name="username" placeholder="Enter Username" />
            <input type="password" name="password" placeholder="Enter Password" />
            <input type="submit" value="Register" />
          </form>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Link to="/login" style={{ color: "white" }}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
