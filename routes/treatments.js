// routes/treatments.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Add a new treatment entry
router.post("/", (req, res) => {
  const { TreatmentID, TreatmentName, Description, Cost } = req.body;

  if (!TreatmentID || !TreatmentName || !Cost) {
    return res
      .status(500)
      .json({ error: "TreatmentID, TreatmentName and Cost are required" });
  }

  const sql = `
        INSERT INTO Treatment (TreatmentID, TreatmentName, Description, Cost)
        VALUES (?, ?, ?, ?)`;
  const values = [TreatmentID, TreatmentName, Description || null, Cost];

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Treatment added successfully" });
  });
});

// Get all treatments
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Treatment";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Get a specific treatment
router.get("/:TreatmentID", (req, res) => {
  const { TreatmentID } = req.params;

  const { TreatmentName, Description, Cost } = req.body;

  db.query(
    "SELECT * FROM Treatment WHERE TreatmentID = ?",
    [TreatmentID],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ error: "Treatment not found" });
      res.json(results[0]);
    }
  );
});

// Update an existing treatment
router.put("/:TreatmentID", (req, res) => {
  const { TreatmentID } = req.params;
  const { TreatmentName, Description, Cost } = req.body;

  db.query(
    "UPDATE Treatment SET TreatmentName = ?, Description = ?, Cost = ? WHERE TreatmentID = ?",
    [TreatmentName, Description || null, Cost, TreatmentID],
    (err, results) => {
      if (err) {
        console.log(
          "Query: ",
          "UPDATE Treatment SET TreatmentName = ?, Description = ?, Cost = ? WHERE TreatmentID = ?",
          [TreatmentName, Description || null, Cost, TreatmentID]
        );

        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0)
        return res.status(404).json({ error: "Treatment not found" });
      res.json({ message: "Treatment updated successfully" });
    }
  );
});

// Delete a treatment
router.delete("/:TreatmentID", (req, res) => {
  const { TreatmentID } = req.params;

  const sql = "DELETE FROM Treatment WHERE TreatmentID = ?";
  db.query(sql, [TreatmentID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json({ message: "Treatment deleted successfully" });
  });
});

module.exports = router;
