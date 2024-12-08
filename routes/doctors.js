// routes/doctors.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new doctor
router.post('/', (req, res) => {
    const { DoctorID, Name, Specialization, PhoneNumber, DepartmentID } = req.body;

    if (!DoctorID || !Name) {
        return res.status(400).json({ error: 'DoctorID and Name are required' });
    }

    const sql = `
        INSERT INTO Doctor (DoctorID, Name, Specialization, PhoneNumber, DepartmentID)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [DoctorID, Name, Specialization || null, PhoneNumber || null, DepartmentID || null];

    db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Doctor added successfully' });
    });
});

// Get all doctors
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Doctor';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get a specific Doctor
router.get('/:DoctorID', (req, res) => {
    const { DoctorID } = req.params;
    db.query('SELECT * FROM Doctor WHERE DoctorID = ?', [DoctorID], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Doctor not found' });
        res.json(results[0]);
    });
});

//Update an existing Doctor's details
router.put('/:DoctorID', (req, res) => {
    const { DoctorID } = req.params;
    const { Name, Specialization, PhoneNumber, DepartmentID } = req.body;

    db.query(
        'UPDATE Doctor SET Name = ?, Specialization = ?, PhoneNumber = ?, DepartmentID = ?',
        [Name, Specialization, PhoneNumber, DepartmentID],
        (err, results) => {
            if (err)
                {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });   
                } 
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Doctor not found' });
            res.json({ message: 'Doctor updated successfully' });
        }
    );
});

// Delete a doctor
router.delete('/:DoctorID', (req, res) => {
    const { DoctorID } = req.params;

    const sql = 'DELETE FROM Doctor WHERE DoctorID = ?';
    db.query(sql, [DoctorID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted successfully' });
    });
});

module.exports = router;