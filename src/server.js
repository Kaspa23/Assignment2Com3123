// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
const PORT = 8089;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/employeeDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

// POST /api/v1/employees
app.post('/api/v1/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/v1/employees
app.get('/api/v1/employees', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // GET /api/v1/employees/:id
app.get('/api/v1/employees/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id); // Assuming Employee is your MongoDB model
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // PUT /api/v1/employees/:id
app.put('/api/v1/employees/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true } // Returns updated document and runs validation
      );
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.status(200).json(updatedEmployee);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // DELETE /api/v1/employees/:id
app.delete('/api/v1/employees/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
