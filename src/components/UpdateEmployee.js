import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8089/api/v1/emp/employees/${id}`);
        setEmployee(response.data);
        setUpdatedEmployee(response.data); 
      } catch (error) {
        console.error('Error fetching employee details', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8089/api/v1/emp/employees/${id}`, updatedEmployee);
      navigate('/employee');
    } catch (error) {
      console.error('Error updating employee details', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Employee Details</h2>
      {employee ? (
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={updatedEmployee.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={updatedEmployee.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={updatedEmployee.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={updatedEmployee.gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="number"
                className="form-control"
                id="salary"
                name="salary"
                value={updatedEmployee.salary}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <Link to={`/employee`} className="btn btn-secondary ml-2">
              Cancel
            </Link>
          </form>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default UpdateEmployee;
