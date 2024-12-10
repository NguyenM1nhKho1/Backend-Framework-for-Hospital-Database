//routes/departments.js
const express = require("express");
const router = express.Router();
const db = require("../db");

//Add a new department
router.post("/", (req, res) => {
  const { DepartmentID, DepartmentName, Location } = req.body;

  if (!DepartmentID || !DepartmentName || !Location) {
    return res
      .status(400)
      .json({
        error:
          "All fields are required: DepartmentID, DepartmentName, Location",
      });
  }

  const sql = `
        INSERT INTO Department (DepartmentID, DepartmentName, Location)
        VALUES (?, ?, ?)
        `;

  const values = [DepartmentID, DepartmentName, Location];

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Department added successfully" });
  });
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM Department";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// get specific department
router.get("/:DepartmentID", (req, res) => {
  const { DepartmentID } = req.params;
  db.query(
    "SELECT * FROM Department WHERE DepartmentID = ?",
    [DepartmentID],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ error: "Department not found" });
      res.json(results[0]);
    }
  );
});

//Update an existing department's details
router.put("/:DepartmentID", (req, res) => {
  const { DepartmentID } = req.params;
  const { DepartmentName, Location } = req.body;

  db.query(
    "UPDATE Department SET DepartmentName = ?, Location = ? WHERE DepartmentID = ?",
    [DepartmentName, Location, DepartmentID],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0)
        return res.status(404).json({ error: "Department not found" });
      res.json({ message: "Department updated successfully" });
    }
  );
});

// Delete a department
router.delete("/:DepartmentID", (req, res) => {
  const { DepartmentID } = req.params;

  const sql = "DELETE FROM Department WHERE DepartmentID = ?";
  db.query(sql, [DepartmentID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json({ message: "Department deleted successfully" });
  });
});

module.exports = router;
