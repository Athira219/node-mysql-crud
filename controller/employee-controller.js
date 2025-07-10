const express = require('express');
const router = express.Router();
const employeeService = require('./service/employee-service');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await employeeService.allEmployeeList();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await employeeService.employeeById(req.params.id);
    if (employee.length === 0) {
      return res.status(404).json({ message: 'No record with given id: ' + req.params.id });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const affectedRows = await employeeService.deleteEmployee(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No record with given id: ' + req.params.id });
    }
    res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create new employee
router.post('/', async (req, res) => {
  try {
    await employeeService.addOrEditEmployee(req.body);
    res.status(201).json({ message: 'Employee created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update existing employee
router.put('/:id', async (req, res) => {
  try {
    const affectedRows = await employeeService.addOrEditEmployee(req.body, req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No record with given id: ' + req.params.id });
    }
    res.status(200).json({ message: 'Employee updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;