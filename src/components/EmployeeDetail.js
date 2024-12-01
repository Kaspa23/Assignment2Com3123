import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8089/api/v1/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  return (
    <div className="container mt-5">
      {employee ? (
        <div>
          <h2>Employee Details</h2>
          <p>First Name: {employee.first_name}</p>
          <p>Last Name: {employee.last_name}</p>
          <p>Email: {employee.email}</p>
          <p>Gender: {employee.gender}</p>
          <p>Salary: ${employee.salary}</p>
          <Link to="/employee" className="btn btn-primary">
            Back
          </Link>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default EmployeeDetail;
