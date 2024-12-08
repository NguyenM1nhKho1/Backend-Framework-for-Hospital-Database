// routes/consult.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new patient-doctor consultation
router.post('/', (req, res) => {
    const { PatientID, DoctorID } = req.body;
    const sql = `
        INSERT INTO Consult (PatientID, DoctorID)
        VALUES (?, ?)
    `;
    const values = [PatientID, DoctorID];

    db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid PatientID or DoctorID' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Consultation added successfully' });
    });
});

// Get all consultations
router.get('/', (req, res) => {
    const sql = `
        SELECT c.PatientID, p.Name AS PatientName, c.DoctorID, d.Name AS DoctorName
        FROM Consult c
        JOIN Patient p ON c.PatientID = p.PatientID
        JOIN Doctor d ON c.DoctorID = d.DoctorID
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get consultations for a specific patient
router.get('/patient/:PatientID', (req, res) => {
    const { PatientID } = req.params;
    const sql = `
        SELECT c.PatientID, p.Name AS PatientName, c.DoctorID, d.Name AS DoctorName
        FROM Consult c
        JOIN Patient p ON c.PatientID = p.PatientID
        JOIN Doctor d ON c.DoctorID = d.DoctorID
        WHERE c.PatientID = ?
    `;
    const values = [PatientID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No consultations found for this patient' });
        }
        res.json(results);
    });
});

// Update a consultation
router.put('/:PatientID/:DoctorID', (req, res) => {
    const { PatientID, DoctorID } = req.params;
    const { newDoctorID } = req.body;
    const sql = `
        UPDATE Consult
        SET DoctorID = ?
        WHERE PatientID = ? AND DoctorID = ?
    `;
    const values = [newDoctorID, PatientID, DoctorID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid new DoctorID' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        res.status(200).json({ message: 'Consultation updated successfully' });
    });
});

// Delete a consultation
router.delete('/:PatientID/:DoctorID', (req, res) => {
    const { PatientID, DoctorID } = req.params;
    const sql = `
        DELETE FROM Consult
        WHERE PatientID = ? AND DoctorID = ?
    `;
    const values = [PatientID, DoctorID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        res.status(200).json({ message: 'Consultation deleted successfully' });
    });
});

module.exports = router;