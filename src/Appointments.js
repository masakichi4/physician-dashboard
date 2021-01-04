import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ApiCalls from './apiCalls'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  }
}))(TableCell);

export default class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      time: '',
      kind: ''
    }
  }

  editField = (e) => {
    let attribute = e.currentTarget.id;
    this.setState({[attribute]: e.currentTarget.value});
  }

  handleSelectKind = (e) => {
    this.setState({kind: e.target.value})
  }

  addNewAppointment = (e) => {
    e.preventDefault();
    const {selected, getAppointments} = this.props;
    const {name, time, kind} = this.state;
    const now = Date.now()
    const formattedTime = (new Date(time)).getTime()

    if (selected && name && time && kind && formattedTime > now) {
      ApiCalls.addAppointment(selected.id, name, time, kind)
      .then(
        res => {
          if (res === 'OK') {
            getAppointments(selected.id)
            this.setState({name: '', time: '', kind: ''})
          } else {
            alert(res)
          }
        })
    } else if (formattedTime <= now) {
      alert("Please select a time in the future.")
    } else {
      alert('There was an error in the information you filled in, please check again.')
    }

  }

  render() {
    const {selected, appointments, onAppointmentDelete} = this.props;
    const {name, time, kind} = this.state;
    let title = "";
    if (selected) {
      title = "Dr. "+selected.firstName+" "+selected.lastName;
    } else {
      title = "Please select a physician from the list."
    }

    return (
      <Grid
        item 
        xs={6}
        md={9}
      >
        <Card >
          <CardHeader
            title={title}
            subheader={selected? selected.email:""}
          />

          {selected && 
            <CardContent>
              <Typography> New Appointment</Typography>
              <form onSubmit={this.addNewAppointment}>
                <TextField id='name' value={name} label="Name" placeholder="Enter patient's full name"
                onChange = {this.editField} required/>
                <br/>
                <TextField
                  required
                  id="time"
                  label="Time"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={time}
                  onChange={this.editField}
                />
                <br/>
                <Select id='kind' value={kind} label="Kind"
                onChange = {this.handleSelectKind} required>
                  <MenuItem value="New Patient">New Patient</MenuItem>
                  <MenuItem value="Follow-up">Follow-up</MenuItem>
                </Select>
                <Button type='submit'>Add</Button>
              </form>
            </CardContent>
        }
        
          {selected && 
            <CardContent>
              {appointments && appointments.length > 0? 
                <TableContainer >
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Time</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Kind</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((row, i) => (
                        <TableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {row.time}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.patientName}</StyledTableCell>
                          <StyledTableCell align="right">{row.kind}</StyledTableCell>
                          <StyledTableCell align="right"><Button onClick={()=>{onAppointmentDelete(selected.id,row.time)}}>Delete</Button></StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>:
                'No appointments to show for Dr. '+selected.firstName+" "+selected.lastName+"."
              }
            </CardContent>
          }
        </Card>
      </Grid>
      
    );
  }
}

Appointments.propTypes = {
  selected: PropTypes.object,
  appointments: PropTypes.array, 
  onAppointmentDelete: PropTypes.func,
  getAppointments: PropTypes.func
};