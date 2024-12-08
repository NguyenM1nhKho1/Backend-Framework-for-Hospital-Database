// routes/room_assignemt.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new room assignment
router.post('/', (req, res) => {
    const { AssignmentNumber, StartDate, EndDate, RoomID } = req.body;
    const sql = `
        INSERT INTO Room_Assignment (AssignmentNumber, StartDate, EndDate, RoomID)
        VALUES (?, ?, ?, ?)
    `;
    const values = [AssignmentNumber, StartDate, EndDate, RoomID];

    db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Invalid RoomID' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Room assignment created successfully' });
    });
});


// Get all room assignments
router.get('/', (req, res) => {
    const sql = `
        SELECT *
        FROM Room_Assignment
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        const formattedResults = results.map((roomAsgn) => ({
            ...roomAsgn,
            StartDate: roomAsgn.StartDate.toLocaleDateString('en-CA'),
            EndDate: roomAsgn.EndDate.toLocaleDateString('en-CA'),
        }));
        res.json(formattedResults);
    });
});

// Get a specific room assignment
router.get('/:AssignmentNumber/:RoomID', (req, res) => {
    const { AssignmentNumber, RoomID } = req.params;
    const sql = `
        SELECT *
        FROM Room_Assignment
        WHERE AssignmentNumber = ? AND RoomID = ?
    `;
    const values = [AssignmentNumber, RoomID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Room assignment not found' });
        }
        const roomAsgn = {
            ...results[0],
            StartDate: results[0].StartDate.toLocaleDateString('en-CA'),
            EndDate: results[0].EndDate.toLocaleDateString('en-CA'),
        };
        res.json(roomAsgn);
    });
});

// Update a room assignment
router.put('/:AssignmentNumber/:RoomID', (req, res) => {
    const { AssignmentNumber, RoomID } = req.params;
    const { StartDate, EndDate } = req.body;
    const sql = `
        UPDATE Room_Assignment
        SET StartDate = ?, EndDate = ?
        WHERE AssignmentNumber = ? AND RoomID = ?
    `;
    const values = [StartDate, EndDate, AssignmentNumber, RoomID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Room assignment not found' });
        }
        res.status(200).json({ message: 'Room assignment updated successfully' });
    });
});

// Delete a room assignment
router.delete('/:AssignmentNumber/:RoomID', (req, res) => {
    const { AssignmentNumber, RoomID } = req.params;
    const sql = `
        DELETE FROM Room_Assignment
        WHERE AssignmentNumber = ? AND RoomID = ?
    `;
    const values = [AssignmentNumber, RoomID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Room assignment not found' });
        }
        res.status(200).json({ message: 'Room assignment deleted successfully' });
    });
});

module.exports = router;