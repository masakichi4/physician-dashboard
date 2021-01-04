import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Appointments from './Appointments';
import ApiCalls from './apiCalls'



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      physicians: [],
      selected: null,
      appointments: []
    };
  }

  componentDidMount() {
    this.getPhysicians();
  }


  getPhysicians = () => {
    ApiCalls.getPhysicians()
    .then(
      (res) => {
        if (res && res.status === 200) {
          this.setState({physicians: res.data})
        }
        
      });
  }

  selectPhysician = (e) => {
    e.preventDefault();
    const selected = this.state.physicians.find(physician => physician.id === e.currentTarget.id);
    this.setState({selected});
    this.getAppointments(selected.id);
  }

  getAppointments = (id) => {
    ApiCalls.getAppointments(id)
    .then(
      (res) => {
        if (res && res.status === 200) {

          let appointments = res.data.sort((a, b) => {
            if (Date.parse(a.time) !== Date.parse(b.time)) {
              return Date.parse(a.time) - Date.parse(b.time);
            } else {
              return a.patientName - b.patientName
            }
          });

          appointments.forEach( item => {
            item.time = new Date(item.time).toLocaleString()
          })
          
          this.setState({appointments});
        }
        
      })
  }

  deleteAppointment = (physicianId, time) => {

    ApiCalls.deleteAppointment(physicianId, time)
    .then(
      (res)=> {
        if (res === 'OK') {
          const {selected} = this.state
          if (selected.id === physicianId) {
            this.getAppointments(physicianId);
          }
        } else {

          alert(res)
        }       
        
      })
  }

  render() {
    const {physicians, selected, appointments} = this.state;

    

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid
          item 
          xs={6}
          md={3}
        >
          <List>
          <ListItem >
            <Typography variant="button">
              physicians
            </Typography>
          </ListItem>
          {physicians && physicians.map((physician, i) => {
            return (
              <ListItem
                button
                id={physician.id}
                key={i}
                selected={selected && selected.id === physician.id}
                onClick={this.selectPhysician}
              >
                <ListItemText primary={physician.lastName+", "+physician.firstName} />
              </ListItem>)
          })}
          </List>
        </Grid>
        <Appointments 
          selected={selected}
          appointments = {appointments} 
          onAppointmentDelete={this.deleteAppointment}
          getAppointments={this.getAppointments}
        />
        
      </Grid>
    );
  }
}

export default App;
