// routes/bill.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new bill
router.post('/', (req, res) => {
    const { BillID, PatientID, TotalAmount, DateIssued } = req.body;

    if (!BillID || !PatientID || !TotalAmount || !DateIssued)
    {
        return res.status(400).json({ error: 'All fields are required: BillID, PatientID, TotalAmount, DateIssued'});
    }

    const sql = `
        INSERT INTO Bill (BillID, PatientID, TotalAmount, DateIssued)
        VALUES (?, ?, ?, ?)
        `;
    
    const values = [BillID, PatientID, TotalAmount, DateIssued];

    db.query(sql, values, (err) => {
        if (err)
        {
            console.error(err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid PatientID' });
            }
            if (err.sqlState === '45000') {
                return res.status(400).json({ error: err.message }); // Handle trigger error
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Bill added successfully' });
    });
});

// Get all bills
router.get('/', (req, res) => {
    const query = `
        SELECT b.BillID, b.PatientID, p.Name AS PatientName, b.TotalAmount, b.DateIssued
        FROM Bill b
        JOIN Patient p ON b.PatientID = p.PatientID
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        const formattedResults = results.map((bill) => ({
            ...bill,
            DateIssued: bill.DateIssued.toLocaleDateString('en-CA'),
        }));
        res.json(formattedResults);
    });
});

// Get a specific bill
router.get('/:BillID', (req, res) => {
    const { BillID } = req.params;

    const query = `
        SELECT b.BillID, b.PatientID, p.Name AS PatientName, b.TotalAmount, b.DateIssued
        FROM Bill b
        JOIN Patient p ON b.PatientID = p.PatientID
        WHERE b.BillID = ?
    `;

    db.query(query, [BillID], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        const bill = {
            ...results[0],
            DateIssued: results[0].DateIssued.toLocaleDateString('en-CA'),
        };
        res.json(bill);
    });
});

// Update a bill
router.put('/:BillID', (req, res) => {
    const { BillID } = req.params;
    const { TotalAmount, DateIssued } = req.body;

    const query = `
        UPDATE Bill
        SET TotalAmount = ?, DateIssued = ?
        WHERE BillID = ?
    `;

    db.query(query, [TotalAmount, DateIssued, BillID], (err, results) => {
        if (err) {
            if (err.sqlState === '45000') {
                return res.status(400).json({ error: err.sqlMessage }); // Handle trigger error
            }
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.json({ message: 'Bill updated successfully' });
    });
});


// Delete a bill
router.delete('/:BillID', (req, res) => {
    const { BillID } = req.params;

    const query = `
        DELETE FROM Bill
        WHERE BillID = ?
    `;

    db.query(query, [BillID], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.json({ message: 'Bill deleted successfully' });
    });
});

module.exports = router;