// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db');
const Employee = require('./models/employee');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create Employee
app.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const result = await employee.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// List Employees with Pagination
app.get('/employees', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const employees = await Employee.find().skip(skip).limit(limit);
    res.json(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Employee
app.put('/employees/:id', async (req, res) => {
  try {
    const result = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Employee
app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
