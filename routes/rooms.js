//routes/rooms.js
const express = require('express');
const router = express.Router();
const db = require('../db');

//Add a new room
router.post('/', (req, res) => {
    const { RoomID, RoomNumber, RoomType, PatientID } = req.body;

    if (!RoomID || !RoomNumber || !RoomType || !PatientID)
    {
        return res.status(400).json({ error: 'All fields are required: RoomID, RoomNumber, RoomType, PatientID'});
    }

    const sql = `
        INSERT INTO Room (RoomID, RoomNumber, RoomType, PatientID)
        VALUES (?, ?, ?, ?)
        `;
    
    const values = [RoomID, RoomNumber, RoomType, PatientID];

    db.query(sql, values, (err) => {
        if (err)
        {
            console.error(err);
            return res.status(500).json({ error: 'Database error'});
        }
        res.status(201).json({ message: 'Room added successfully' });
    });
});

//Get all rooms
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Room';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});

//Get a specific room
router.get('/:RoomID', (req, res) => {
    const { RoomID } = req.params;
    db.query('SELECT * FROM Room WHERE RoomID = ?', [RoomID], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Room not found' });
        res.status(200).json(results[0]);
    });
});

//Update an existing room
router.put('/:RoomID', (req, res) => {
    const { RoomID } = req.params;
    const { RoomNumber, RoomType, PatientID } = req.body;

    if (!RoomNumber || !RoomType)
    {
        return res.status(400).json({ error: 'RoomNumber and RoomType are required'});
    }
    db.query(
        'UPDATE Room SET RoomNumber = ?, RoomType = ?, PatientID = ? WHERE RoomID = ?',
        [RoomNumber, RoomType, PatientID || null, RoomID],
        (err, results) => {
            if (err)
                {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });   
                } 
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Room not found' });
            res.json({ message: 'Room updated successfully' });
        }
    );
});

//Delete a room
router.delete('/:RoomID', (req, res) => {
    const { RoomID } = req.params;

    const sql = 'DELETE FROM Room WHERE RoomID = ?';
    db.query(sql, [RoomID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }   
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    });
});

module.exports = router;