const express = require('express');
const app = express();

const patientRoutes = require('./routes/patients');
const departmentRoutes = require('./routes/departments');
const doctorRoutes = require('./routes/doctors');
const scheduleRoutes = require('./routes/schedules');
const treatmentRoutes = require('./routes/treatments');
const medicationRoutes = require('./routes/medication');
const roomRoutes = require('./routes/rooms');
const billRoutes = require('./routes/bill');
const medical_record_routes = require('./routes/medical_record');
const prescribesRoutes = require('./routes/prescribes');
const room_assignment_routes = require('./routes/room_assignment');
const consultRoutes = require('./routes/consult');
const receivesRoutes = require('./routes/receives');

app.use(express.json()); //middleware to parse JSON
app.use('/patients', patientRoutes);
app.use('/departments', departmentRoutes);
app.use('/doctors', doctorRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/treatments', treatmentRoutes);
app.use('/medications', medicationRoutes);
app.use('/rooms', roomRoutes);
app.use('/bill', billRoutes);
app.use('/medical_record', medical_record_routes);
app.use('/prescribes', prescribesRoutes);
app.use('/room_assignment', room_assignment_routes);
app.use('/consult', consultRoutes);
app.use('/receives', receivesRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.get('/', (req, res) => {
    res.send("Hello Chat");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 
