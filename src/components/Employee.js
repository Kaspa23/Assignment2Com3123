import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Employee = ({ setIsLoggedIn }) => {
  const [employees, setEmployees] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8089/api/v1/emp/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee details', error);
      }
    };

    fetchEmployeeDetails();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  const viewEmployeeDetails = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  const updateEmployee = (employeeId) => {
    navigate(`/employee/update/${employeeId}`);
  };

  const deleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:8089/api/v1/emp/employees?eid=${employeeId}`);
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== employeeId));
        setShowSuccessMessage(true);
      } catch (error) {
        console.error('Error deleting employee', error);
      }
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };


  return (
    <div className="container mt-5">
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Employee deleted successfully!
        </div>
      )}

      <h2 className="mb-4">All Employees Details</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Salary</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>${employee.salary}</td>
              <td>
                <button className="btn btn-primary" onClick={() => viewEmployeeDetails(employee._id)}>
                  View
                </button>
                <button className="btn btn-warning ml-2" onClick={() => updateEmployee(employee._id)}>
                  Update
                </button>
                <button className="btn btn-danger ml-2" onClick={() => deleteEmployee(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="mt-4">
          <h3>Employee Details</h3>
          <p>First Name: {selectedEmployee.first_name}</p>
          <p>Last Name: {selectedEmployee.last_name}</p>
          <p>Email: {selectedEmployee.email}</p>
          <p>Gender: {selectedEmployee.gender}</p>
          <p>Salary: ${selectedEmployee.salary}</p>
        </div>
      )}

      <div className="container mt-5">
      <Link to="/employee/add" className="btn btn-success">
        Add New Employee
      </Link>
    </div>

    <div className="container mt-5">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
    
  );
};

export default Employee;
