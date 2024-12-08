// routes/receives.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a patient-treatment relationship
router.post('/', (req, res) => {
    const { PatientID, TreatmentID } = req.body;
    const sql = `
        INSERT INTO Receives (PatientID, TreatmentID)
        VALUES (?, ?)
    `;
    const values = [PatientID, TreatmentID];

    db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid PatientID or TreatmentID' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Patient-treatment relationship added successfully' });
    });
});

// Get all patient-treatment relationships
router.get('/', (req, res) => {
    const sql = `
        SELECT r.PatientID, p.Name AS PatientName, 
               r.TreatmentID, t.TreatmentName
        FROM Receives r
        JOIN Patient p ON r.PatientID = p.PatientID
        JOIN Treatment t ON r.TreatmentID = t.TreatmentID
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get treatments received by a specific patient
router.get('/patient/:PatientID', (req, res) => {
    const { PatientID } = req.params;
    const sql = `
        SELECT r.PatientID, p.Name AS PatientName, 
               r.TreatmentID, t.TreatmentName
        FROM Receives r
        JOIN Patient p ON r.PatientID = p.PatientID
        JOIN Treatment t ON r.TreatmentID = t.TreatmentID
        WHERE r.PatientID = ?
    `;
    const values = [PatientID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No treatments found for this patient' });
        }
        res.json(results);
    });
});

// Update a patient-treatment relationship
router.put('/:PatientID/:TreatmentID', (req, res) => {
    const { PatientID, TreatmentID } = req.params;
    const { newTreatmentID } = req.body;
    const sql = `
        UPDATE Receives
        SET TreatmentID = ?
        WHERE PatientID = ? AND TreatmentID = ?
    `;
    const values = [newTreatmentID, PatientID, TreatmentID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid new TreatmentID' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Patient-treatment relationship not found' });
        }
        res.status(200).json({ message: 'Patient-treatment relationship updated successfully' });
    });
});

// Delete a patient-treatment relationship
router.delete('/:PatientID/:TreatmentID', (req, res) => {
    const { PatientID, TreatmentID } = req.params;
    const sql = `
        DELETE FROM Receives
        WHERE PatientID = ? AND TreatmentID = ?
    `;
    const values = [PatientID, TreatmentID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Patient-treatment relationship not found' });
        }
        res.status(200).json({ message: 'Patient-treatment relationship deleted successfully' });
    });
});

module.exports = router;