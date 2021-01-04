const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

let physicians = [
	{id: '1', lastName: 'Jiang', firstName: 'Mary', email: 'maryjiang@physician.com'}, 
	{id: '2', lastName: 'Li', firstName: 'Jane', email: 'janeli@physician.com'}, 
	{id: '3', lastName: 'Doe', firstName: 'John', email: 'johndoe@physician.com'}
];

let appointments = [
	{physicianId: '1', patientName: 'Janet Ma', time: '1/4/2021, 8:00:00 AM', kind: 'New Patient'}, 
	{physicianId: '1', patientName: 'Kevin Lee', time: '1/4/2021, 8:30:00 AM', kind: 'New Patient'}, 
	{physicianId: '1', patientName: 'Gran Torino', time: '1/4/2021, 9:00:00 AM', kind: 'Follow-up'}, 
	{physicianId: '2', patientName: 'Shoto Todoroki', time: '1/4/2021, 8:00:00 AM', kind: 'New Patient'}, 
	{physicianId: '2', patientName: 'Momo Yaoyorozu', time: '1/4/2021, 10:00:00 AM', kind: 'Follow-up'}, 
	{physicianId: '3', patientName: 'Lana Kane', time: '1/5/2021, 9:00:00 AM', kind: 'Follow-up'}, 
	{physicianId: '3', patientName: 'Pam Poovey', time: '1/5/2021, 10:00:00 AM', kind: 'New Patient'}, 
	{physicianId: '3', patientName: 'Ray Gilette', time: '1/4/2021, 10:30:00 AM', kind: 'New Patient'}, 
];


app.get('/appointments', urlencodedParser, (req, res) => {
	const filtered = appointments.filter(item => item.physicianId === req.query.id);
	res.send(filtered)
});

app.post('/appointments', urlencodedParser, (req, res) => {
	const {physicianId, patientName, time, kind} = req.body.data;
	
	const formattedTime = new Date(time)

	if (formattedTime.getMinutes() % 15 !== 0) {
		res.status(400).send("Appointments can only be booked at 15-minute intervals!")
	} else if ((appointments.filter(item => item.time === time)).length >= 3) {
		res.status(400).send("This physician is unavailable during the selected time, please select another time.")
	} else {
		const newAppointment = {physicianId, patientName, time, kind};
		appointments.push(newAppointment);

		const filtered = appointments.filter(item => item.physicianId === physicianId);
		res.sendStatus(200)
	}
		
})

app.delete('/appointments', urlencodedParser, (req, res) => {
	const idx = appointments.findIndex(item => item.physicianId === req.query.physicianId && 
		item.time === req.query.time);

	if (idx > -1) {
		appointments.splice(idx,1);
		res.sendStatus(200);
	} else {
		res.status(404).send('Sorry, no appointment found!')
	}
		
});

app.get('/physicians', (req, res) => res.send(physicians));

//---------------------------------------------------------------------------------------------------------------
// Connecting to Firebase
// var firebase = require("firebase");
// require("firebase/firestore");


// var firebaseConfig = {
// apiKey: "",
// authDomain: "",
// databaseURL: "",
// projectId: "",
// storageBucket: "",
// messagingSenderId: "",
// appId: "",
// measurementId: ""
// };
// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// getPhysicians = async ()  => {
// 	let physicians = [];
//     const snapshot = await db.collection('physicians').get();

// 	if (snapshot.empty) {
// 	  return physicians;
// 	}  
// 	snapshot.docs.map(doc => {
// 	  physicians[doc.id] = doc.data();
// 	});
	
// 	return physicians;
// }

// getAppointmentsByPhysicianId = async(physicianId) => {
// 	let appointments = [];
//     const snapshot = await db.collection('appointments').where('physicianId', '==', physicianId).get();

// 	if (snapshot.empty) {
// 	  return appointments;
// 	}  
// 	snapshot.docs.map(doc => {
// 	  appointments.push(doc.data());
// 	});
	
// 	return appointments;
// }

// checkPhysicianAvailibility = async(physicianId, time) => {
// 	let available = false;
// 	const snapshot = await db.collection('appointments').where('physicianId', '==', physicianId).where('time.seconds', '==', time).get();
// 	if (snapshot.size < 3) {
// 		available = true;
// 	}

// 	return available;
// }

// app.post('/appointments', urlencodedParser, (req, res) => {
// 	const {physicianId, patientName, time, kind} = req.body.data;

// 	const minute = new Date(time * 1000).getMinutes();

// 	if (minute % 15 !== 0) {
// 		res.status(400).send('Appointments can only be booked at 15-minute intervals!');
// 	} else {
// 		const newAppointment = {physicianId, patientName, time: {seconds: time}, kind};

// 		checkPhysicianAvailibility(physicianId, time)
// 		.then(
// 			v => {
// 				if (v) {
// 					db.collection('appointments').add(newAppointment)
// 					.then(
// 						v => {
// 							res.sendStatus(200)
// 						})
// 				} else {
// 					res.status(400)
// 				}
// 			})		
			
// 	}
		
// })

// app.get('/appointments', (req, res) => {

// 	getAppointmentsByPhysicianId(req.query.id)
// 	.then(
// 		v => {
// 			console.log(v);
// 			res.send(v);
// 		})
	
// });

// app.get('/physicians', (req, res) => {
// 	// let response = '';
	
// 	getPhysicians()
// 	.then(
// 		v => {
// 			res.send(v);
// 		})
// });


app.listen(port, () => console.log(`Express app listening on port ${port}!`));
