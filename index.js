const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let appointments = [];
let nextId = 1;

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the HealthTech Appointment API');
});

// CREATE - Add new appointment
app.post('/appointments', (req, res) => {
  const { patientName, date, time, reason } = req.body;

  if (!patientName || !date || !time || !reason) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newAppointment = {
    id: nextId++,
    patientName,
    date,
    time,
    reason,
  };

  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

// READ - Get all appointments
app.get('/appointments', (req, res) => {
  res.json(appointments);
});

// READ ONE - Get single appointment by ID
app.get('/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const appointment = appointments.find(a => a.id === id);

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  res.json(appointment);
});

// UPDATE - Update an appointment by ID
app.put('/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('Trying to update ID:', id);
  console.log('Available appointments:', appointments);

  const appointment = appointments.find(a => a.id === id);

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  const { patientName, date, time, reason } = req.body;

  if (!patientName || !date || !time || !reason) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  appointment.patientName = patientName;
  appointment.date = date;
  appointment.time = time;
  appointment.reason = reason;

  res.json({ message: 'Appointment updated successfully', appointment });
});

// DELETE - Delete appointment by ID
app.delete('/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = appointments.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  appointments.splice(index, 1);
  res.json({ message: 'Appointment deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
