// routes/schedules.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new schedule
router.post('/', (req, res) => {
    const { ScheduleID, Day, Time, DoctorID } = req.body;

    if (!ScheduleID || !Day || !Time || !DoctorID) {
        return res.status(400).json({ error: 'ScheduleID, Day, Time and DoctorID are required' });
    }

    const sql = `
        INSERT INTO Schedule (ScheduleID, Day, Time, DoctorID)
        VALUES (?, ?, ?, ?)
    `;
    const values = [ScheduleID, Day, Time, DoctorID];

    db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Schedule added successfully' });
    });
});

// Get all schedules
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Schedule';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        const formattedResults = results.map((schedule) => ({
            ...schedule,
            Day: schedule.Day.toLocaleDateString('en-CA'),
        }));
        res.json(formattedResults);
    });
});

// Get schedules by doctor ID
router.get('/doctor/:DoctorID', (req, res) => {
    const { DoctorID } = req.params;

    const sql = 'SELECT * FROM Schedule WHERE DoctorID = ?';
    db.query(sql, [DoctorID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No schedules found for the given doctor' });
        }
        const schedule = {
            ...results[0],
            Day: results[0].Day.toLocaleDateString('en-CA'),
        };
        res.json(schedule);
    });
});

// Update an existing schedule
router.put('/:ScheduleID', (req, res) => {
    const { ScheduleID } = req.params;
    const { Day, Time, DoctorID } = req.body;

    // Check if DoctorID exists
    db.query('SELECT * FROM Doctor WHERE DoctorID = ?', [DoctorID], (err, doctorResults) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (doctorResults.length === 0) return res.status(400).json({ error: 'Invalid DoctorID' });

        // Proceed with updating the schedule
        db.query(
            'UPDATE Schedule SET Day = ?, Time = ?, DoctorID = ? WHERE ScheduleID = ?',
            [Day, Time, DoctorID, ScheduleID],
            (err, results) => {
                if (err)
                    {
                        console.error(err);
                        return res.status(500).json({ error: 'Database error' });   
                    } 
                if (results.affectedRows === 0) return res.status(404).json({ error: 'Schedule not found' });
                res.json({ message: 'Schedule updated successfully' });
            }
        );
    });
});

// Delete a schedule
router.delete('/:ScheduleID/:DoctorID', (req, res) => {
    const { ScheduleID, DoctorID } = req.params;

    const sql = `DELETE FROM Schedule WHERE ScheduleID = ? AND DoctorID = ?`;
    db.query(sql, [ScheduleID, DoctorID], (err, results) => {
        if (err)
        {
            console.error(err);
            return res.status(500).json({ error: 'Database error'});
        }
        if (results.affectedRows == 0)
        {
            return res.status(404).json({ error: 'Schedule not found'});
        }
        res.json({ message: 'Schedule deleted successfully'});
    });
});

module.exports = router;