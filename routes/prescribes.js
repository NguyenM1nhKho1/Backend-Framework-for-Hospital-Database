//routes/prescribes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a prescription
router.post('/', (req, res) => {
    const { TreatmentID, MedicationID } = req.body;

    const sql = 'INSERT INTO Prescribes (TreatmentID, MedicationID) VALUES (?, ?)';
    const values = [TreatmentID, MedicationID];

    db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid TreatmentID or MedicationID' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Prescription added successfully' });
    });
});

// Get all prescriptions
router.get('/', (req, res) => {
    const sql = `
        SELECT p.TreatmentID, t.TreatmentName AS TreatmentName, 
               p.MedicationID, m.Name AS MedicationName
        FROM Prescribes p
        JOIN Treatment t ON p.TreatmentID = t.TreatmentID
        JOIN Medication m ON p.MedicationID = m.MedicationID
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get a specific prescription
router.get('/:TreatmentID/:MedicationID', (req, res) => {
    const { TreatmentID, MedicationID } = req.params;

    const sql = `
        SELECT p.TreatmentID, t.TreatmentName AS TreatmentName, 
               p.MedicationID, m.Name AS MedicationName
        FROM Prescribes p
        JOIN Treatment t ON p.TreatmentID = t.TreatmentID
        JOIN Medication m ON p.MedicationID = m.MedicationID
        WHERE p.TreatmentID = ? AND p.MedicationID = ?
    `;
    const values = [TreatmentID, MedicationID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.json(results[0]);
    });
});

// Update an existing prescription
router.put('/:TreatmentID/:MedicationID', (req, res) => {
    const { TreatmentID, MedicationID } = req.params;
    const { NewMedicationID } = req.body;

    const sql = 'UPDATE Prescribes SET MedicationID = ? WHERE TreatmentID = ? AND MedicationID = ?';
    const values = [NewMedicationID, TreatmentID, MedicationID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid NewMedicationID or TreatmentID' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json({ message: 'Prescription updated successfully' });
    });
});

// Delete a prescription
router.delete('/:TreatmentID/:MedicationID', (req, res) => {
    const { TreatmentID, MedicationID } = req.params;

    const sql = 'DELETE FROM Prescribes WHERE TreatmentID = ? AND MedicationID = ?';
    const values = [TreatmentID, MedicationID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.json({ message: 'Prescription deleted successfully' });
    });
});

module.exports = router;