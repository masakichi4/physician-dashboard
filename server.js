const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const physicians = [
	{id: '1', lastName: 'Jiang', firstName: 'He', email: 'hejiang@notablehealth.com'}, 
	{id: '2', lastName: 'Chong', firstName: 'Mary', email: 'marychong@notablehealth.com'}, 
	{id: '3', lastName: 'Doe', firstName: 'John', email: 'johndoe@notablehealth.com'}
];

const appointments = [
	{physicianId: '1', appointmentNumber: '1', patientName: 'Janet Ma', time: '8:00', kind: 'New Patient'}, 
	{physicianId: '1', appointmentNumber: '2', patientName: 'Kevin Lee', time: '8:30', kind: 'New Patient'}, 
	{physicianId: '1', appointmentNumber: '3', patientName: 'Gran Torino', time: '9:00', kind: 'Follow-up'}, 
	{physicianId: '2', appointmentNumber: '1', patientName: 'Shoto Todoroki', time: '8:00', kind: 'New Patient'}, 
	{physicianId: '2', appointmentNumber: '2', patientName: 'Momo Yaoyorozu', time: '10:00', kind: 'Follow-up'}, 
	{physicianId: '3', appointmentNumber: '1', patientName: 'Lana Kane', time: '9:00', kind: 'Follow-up'}, 
	{physicianId: '3', appointmentNumber: '2', patientName: 'Pam Poovey', time: '10:00', kind: 'New Patient'}, 
	{physicianId: '3', appointmentNumber: '3', patientName: 'Ray Gilette', time: '10:30', kind: 'New Patient'}, 
];

app.get('/appointments', urlencodedParser, (req, res) => {
	const filtered = appointments.filter(item => item.physicianId === req.query.id);
	res.send(filtered)
});

app.get('/physicians', (req, res) => res.send(physicians));



app.listen(port, () => console.log(`Express app listening on port ${port}!`));
