const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/employees', employeeController.validateEmployee, employeeController.addEmployee);
router.get('/employees', employeeController.getEmployees);
router.put('/employees/:id', employeeController.validateEmployee, employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;