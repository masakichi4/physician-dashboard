import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ApiCalls from './apiCalls'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  }
}))(TableCell);

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
      (physicians) => {
        this.setState({physicians})
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
      (appointments) => {
        this.setState({appointments});
      })
  }

  render() {
    const {classes} = this.props;
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
          {physicians.map((physician, i) => {
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
        <Grid
          item 
          xs={6}
          md={9}
        >
          <Card >
            <CardHeader
              title={selected?"Dr. "+selected.firstName+" "+selected.lastName:"Please select a physician from the left to view."}
              subheader={selected? selected.email:""}
            />
          
            {selected && 
              <CardContent>
                <TableContainer >
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Time</StyledTableCell>
                        <StyledTableCell align="right">Kind</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((row) => (
                        <TableRow key={row.appointmentNumber}>
                          <StyledTableCell component="th" scope="row">
                            {row.appointmentNumber}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.patientName}</StyledTableCell>
                          <StyledTableCell align="right">{row.time}</StyledTableCell>
                          <StyledTableCell align="right">{row.kind}</StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            }
          </Card>
        </Grid>
          
      </Grid>
    );
  }
}

export default withStyles()(App);
