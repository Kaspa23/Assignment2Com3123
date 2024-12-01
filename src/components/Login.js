import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {
    axios
      .post('http://localhost:8089/api/v1/user/login', loginData)
      .then((response) => {
        console.log(response.data);
        setIsLoggedIn(true);
        setValidationErrors(null);
      })
      .catch((error) => {
        console.error('Error logging in', error);

        if (error.response && error.response.data && error.response.data.errors) {
          setValidationErrors(error.response.data.errors);
        } else {
          setValidationErrors({ general: 'An error occurred while logging in.' });
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h2 className="mb-4 text-center">Login</h2>
              {validationErrors && (
                <div className="alert alert-danger">
                  <p>Validation Errors:</p>
                  <ul>
                    {Object.values(validationErrors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
