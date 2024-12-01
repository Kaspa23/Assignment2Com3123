import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Employee from './components/Employee';
import EmployeeDetail from './components/EmployeeDetail';
import UpdateEmployee from './components/UpdateEmployee'
import AddEmployee from './components/AddEmployee';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/employee" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route path="/employee" element={<Employee setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/employee" element={isLoggedIn ? <Employee /> : <Navigate to="/" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
        <Route path="/employee/update/:id" element={<UpdateEmployee />} />
        <Route path="/employee/add" element={<AddEmployee />} />
      </Routes>
      {!isLoggedIn && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
    </Router>
  );
};

export default App;
