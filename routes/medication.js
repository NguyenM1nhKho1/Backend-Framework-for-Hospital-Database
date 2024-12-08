// routes/medication.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add new medication
router.post('/', (req, res) => {
    const { MedicationID, Name, UsagePerDay, Dosage, Effects, SideEffects } = req.body;

    if (!MedicationID || !Name || !UsagePerDay || !Dosage || !Effects)
    {
        return res.status(400).json({ error: 'MedicationID, Name, UsagePerDay, Dosage and Effects are required' });
    }

    const sql = `
        INSERT INTO Medication (MedicationID, Name, UsagePerDay, Dosage, Effects, SideEffects)
        VALUES (?, ?, ?, ?, ?, ?)
        `;
    const values = [MedicationID, Name, UsagePerDay, Dosage, Effects, SideEffects || null];

    db.query(sql, values, (err) => {
        if (err)
        {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Medication added successfully' });
    });
});

// Get all medications
router.get('/', (req, res) => {
    db.query('SELECT * FROM Medication', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get a specific medication by ID
router.get('/:MedicationID', (req, res) => {
    const { MedicationID } = req.params;

    db.query('SELECT * FROM Medication WHERE MedicationID = ?', [MedicationID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Medication not found' });
        }
        res.json(results[0]);
    });
});

// Update an existing medication
router.put('/:MedicationID', (req, res) => {
    const { MedicationID } = req.params;
    const { Name, UsagePerDay, Dosage, Effects, SideEffects } = req.body;

    if (!Name || !UsagePerDay || !Dosage || !Effects) {
        return res.status(400).json({ error: 'Name, UsagePerDay, Dosage, and Effects are required' });
    }

    db.query(
        'UPDATE Medication SET Name = ?, UsagePerDay = ?, Dosage = ?, Effects = ?, SideEffects = ? WHERE MedicationID = ?',
        [Name, UsagePerDay, Dosage, Effects, SideEffects || null, MedicationID],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Medication not found' });
            }
            res.json({ message: 'Medication updated successfully' });
        }
    );
});

// Delete a medication by ID
router.delete('/:MedicationID', (req, res) => {
    const { MedicationID } = req.params;

    db.query('DELETE FROM Medication WHERE MedicationID = ?', [MedicationID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Medication not found' });
        }
        res.json({ message: 'Medication deleted successfully' });
    });
});

module.exports = router;