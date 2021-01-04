There are two parts in this project: an Express server and a React frontend. In order to display data on dashboard correctly, you need to start the server first.
### To start the server, run `node server.js`
The current data displayed are all hard-coded, names and email addresses are made-up. 
Adding and Deleting data on the dashboard are not permanent, so restarting the server will reset the data.

There is legacy code in `server.js` for accessing data stored in firebase, but the code has been commented out because this project has reached my usage limit of firebase.

### After running the server, run `npm start` to start the React app.
1. If you see the following in the browser, the app is runnning successfully.
![initial image](/public/initial.png)

2. To view, add, or delete appointments of a specific physician, select that physician from the left menu.
- The appointments are sorted by time.
![after selection image](/public/selected.png)

3. You may delete an appointment by clicking the `DELETE` button. For example, let's delete Dr. Mary Jiang's appointment with Janet Ma at 8:00am.
Below is the screenshot after deleting the appointment.

![after deletion image](/public/deleted.png)

4. To add an appointment for a physician, fill in all the required information and click add.
- Appointments must be booked at 15-minute intervals.
- A physician can be booked at most with 3 patients at a time.
![add image](/public/add.png) 
After clicking the add button, the appointment automatically displays below. 
Without Firebase, newly added appointments from the dashboard *CANNOT* be deleted because they are hard-coded in the server and not properly stored in a database.
However, if you have firebase credentials, you could create a database in firebase and un-comment the code in `server.js` to use firebase.
![added image](/public/added.png)

