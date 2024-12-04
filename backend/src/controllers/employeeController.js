const db = require('../config/db');

const { body, validationResult } = require('express-validator');

exports.validateEmployee = [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('position').notEmpty().withMessage('Position is required.'),
    body('salary').isFloat({ gt: 0 }).withMessage('Salary must be a positive number.')
];

exports.addEmployee = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { name, email, position, salary } = req.body;

    // Check if the employee already exists
    const checkQuery = 'SELECT * FROM employees WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking employee existence:', err);
            return res.status(500).json({ error: 'Failed to check employee existence.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Employee with this email already exists.' });
        }

        // Add the new employee if not exists
        const insertQuery = 'INSERT INTO employees (name, email, position, salary, date_created) VALUES (?, ?, ?, ?, NOW())';
        db.query(insertQuery, [name, email, position, salary], (err, result) => {
            if (err) {
                console.error('Error adding employee:', err);
                return res.status(500).json({ error: 'Failed to add employee.' });
            }
            res.status(201).json({ message: 'Employee added successfully.', employeeId: result.insertId });
        });
    });
};

exports.getEmployees = (req, res) => {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving employees:', err);
            res.status(500).json({ error: 'Failed to retrieve employees.' });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg  });
    }
    const { name, email, position, salary } = req.body;

    // Check if the employee already exists
    const checkQuery = 'SELECT * FROM employees WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking employee existence:', err);
            return res.status(500).json({ error: 'Failed to check employee existence.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Employee with this email already exists.' });
        }

        // update the new employee if not exists
        const updateQuery = 'UPDATE employees SET name = ?, email = ?, position = ?, salary = ? WHERE id = ?';
        db.query(updateQuery, [name, email, position, salary, id], (err, result) => {
            if (err) {
                console.error('Error adding employee:', err);
                return res.status(500).json({ error: 'Failed to add employee.' });
            }
            res.status(200).json({ message: 'Employee added successfully.', employeeId: result.insertId });
        });
    });
};

exports.deleteEmployee = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM employees WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            res.status(500).json({ error: 'Failed to delete employee.' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Employee not found.' });
        } else {
            res.status(200).json({ message: 'Employee deleted successfully.' });
        }
    });
};
