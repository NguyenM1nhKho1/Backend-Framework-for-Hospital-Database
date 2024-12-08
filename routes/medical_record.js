//routes/medical_record.js
const express = require('express');
const router = express.Router();
const db = require('../db');

//Add a new medical record
router.post('/', (req, res) => {
    const { RecordNumber, Details, Date, PatientID } = req.body;

    const sql = `
        INSERT INTO Medical_Record (RecordNumber, Details, Date, PatientID)
        VALUES (?, ?, ?, ?)`;
    
    const values = [RecordNumber, Details, Date, PatientID];

    db.query(sql, values, (err) => {
        if (err)
        {
            console.error(err);
            if (err.sqlState === '45000') {
                return res.status(400).json({ error: err.message }); // Trigger error: Date must be in the past
            }
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid PatientID' }); // Invalid PatientID
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Medical record added successfully' });
    });
});

//Get all records
router.get('/', (req, res) => {
    const sql = `SELECT * FROM Medical_Record`;

    db.query(sql, (err, results) => {
        if (err)
        {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        const formattedResults = results.map((records) => ({
            ...records,
            Date: records.Date.toLocaleDateString('en-CA'),
        }));
        res.json(formattedResults);
    });
});

//Get specific record
router.get('/:RecordNumber/:PatientID', (req, res) => {
    const { RecordNumber, PatientID } = req.params;
    const sql = 'SELECT * FROM Medical_Record WHERE RecordNumber = ? AND PatientID = ?';
    const values = [RecordNumber, PatientID];
    db.query(sql, values, (err, results) => {
        if (err)
        {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length == 0)
        {
            return res.status(404).json({ error: 'Medical record not found' });
        }
        const records = {
            ...results[0],
            Date: results[0].Date.toLocaleDateString('en-CA'),
        };
        res.json(records);
    });
});

//Update existing medical record
router.put('/:RecordNumber/:PatientID', (req, res) => {
    const { RecordNumber, PatientID } = req.params;
    const { Details, Date } = req.body;

    const sql = 'UPDATE Medical_Record SET Details = ?, Date = ? WHERE RecordNumber = ? AND PatientID = ?';
    const values = [Details, Date, RecordNumber, PatientID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            if (err.sqlState === '45000') {
                return res.status(400).json({ error: err.message }); // Trigger error: Date must be in the past
            }
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Medical record not found' });
        }
        res.status(200).json({ message: 'Medical record updated successfully' });
    });
});

//Delete medical record
router.delete('/:RecordNumber/:PatientID', (req, res) => {
    const { RecordNumber, PatientID } = req.params;
    const sql = 'DELETE FROM Medical_Record WHERE RecordNumber = ? AND PatientID = ?';
    const values = [RecordNumber, PatientID];

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Medical record not found' });
        }
        res.status(200).json({ message: 'Medical record deleted successfully' });
    });
});

module.exports = router;