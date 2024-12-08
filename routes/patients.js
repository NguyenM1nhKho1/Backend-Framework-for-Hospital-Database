const express = require('express');
const db = require('../db')
const router = express.Router();

//Retrieve all patients or a specific patient
router.get('/', (req, res) => {
    db.query('SELECT * FROM Patient', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        const formattedResults = results.map((patient) => ({
            ...patient,
            DateOfBirth: patient.DateOfBirth.toLocaleDateString('en-CA'),
        }));
        res.json(formattedResults);
    });
});

router.get('/:PatientID', (req, res) => {
    const { PatientID } = req.params;
    db.query('SELECT * FROM Patient WHERE PatientID = ?', [PatientID], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Patient not found' });
        const patient = {
            ...results[0],
            DateOfBirth: results[0].DateOfBirth.toLocaleDateString('en-CA'),
        };
        res.json(patient);
    });
});

//Add a new patient
router.post('/', (req, res) => {
    const { PatientID, Name, DateOfBirth, Gender, PhoneNumber } = req.body;

    if (!PatientID || !Name || !DateOfBirth || !Gender)
    {
        return res.status(400).json({ error: 'PatientID, Name, DateOfBirth, and Gender are required' });
    }
    if (Gender !== 'M' && Gender !== 'F')
    {
        res.status(400).json({ error: 'Gener must be M or F' });
    }

    const sql = `
        INSERT INTO Patient (PatientID, Name, DateOfBirth, Gender, PhoneNumber)
        VALUES (?, ?, ?, ?, ?)
        `;
    
    const values = [PatientID, Name, DateOfBirth, Gender, PhoneNumber || null];
    
    //Validate DateOfBirth and PhoneNumber
    const isValidDate = (date) => !isNaN(Date.parse(date)) && /^\d{4}-\d{2}-\d{2}$/.test(date);

    if (!isValidDate(DateOfBirth)) {
        return res.status(400).json({ error: 'Invalid DateOfBirth format (YYYY-MM-DD required)' });
    }
    if (PhoneNumber && (!PhoneNumber.startsWith('0') || PhoneNumber.length !== 10)) {
        return res.status(400).json({ error: 'Invalid PhoneNumber format' });
    }

    db.query(sql, values, (err, results) => {
        if (err)
        {
            console.error(err);
            return res.status(500).json({ error: 'Database error'});
        }
        res.status(201).json({ message: 'Patient added successfully', patientId: PatientID });
    });
});

//Update an existing patient's details
router.put('/:PatientID', (req, res) => {
    const { PatientID } = req.params;
    const { Name, DateOfBirth, Gender, PhoneNumber } = req.body;

    db.query(
        'UPDATE Patient SET Name = ?, DateOfBirth = ?, Gender = ?, PhoneNumber = ? WHERE PatientID = ?',
        [Name, DateOfBirth, Gender, PhoneNumber, PatientID],
        (err, results) => {
            if (err)
                {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });   
                } 
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Patient not found' });
            res.json({ message: 'Patient updated successfully' });
        }
    );
});

//Delete a patient record
router.delete('/:PatientID', (req, res) => {
    const { PatientID } = req.params;

    db.query('DELETE FROM Patient WHERE PatientID = ?', [PatientID], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Patient not found' });
        res.json({ message: 'Patient deleted successfully' });
    });
});

module.exports = router;