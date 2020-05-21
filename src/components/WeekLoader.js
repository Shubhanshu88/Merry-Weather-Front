import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import './styles/WeatherHome.scss';
import CurWeekList from './CurWeekList';
import CustomIcon from './CustomIcon';
import {dayName, iconNameEdit} from '../helpers/dayName';
import _ from 'lodash';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
});

class WeekLoader extends Component {
  constructor(props) {
    super(props);

    this.state= { 
      value: 'Weekly',

    };

    this.handleChange = this.handleChange.bind(this);
    this.weeklyDisplay = this.weeklyDisplay.bind(this);
    this.hourlyDisplay = this.hourlyDisplay.bind(this);
  }

  weeklyDisplay() {
    if(this.props.weekly) {
      if(this.props.weekly !== "hello")  {
      //   let weeklyData = this.props.weekly.map((day) => {
      //     return {
      //       day: new Date(day.time * 1000).getDay(),
      //       maxTemp: (day.temperatureMax - 32)*5/9,
      //       minTemp: (day.temperatureMin - 32)*5/9,
      //       icon: day.icon
      //     };
      // });
      // console.log(weeklyData);
    }
    } else {
      // Use ref for changing data in another tag below select tag
      console.log('Weekly data is loading');
    }
  }

  hourlyDisplay() {
    if(this.props.hourly) {
      // Convert Unix timestamp to hourly
      console.log('Soon hourly data to be loaded');
    } else {
      // Use ref for changing data in another tag below select tag
      console.log('hourly data is loading');
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    // A request will be created to display data acc to value

    // Opposite is happening, will try to remove
    if(this.state.value === 'Weekly') {
      this.weeklyDisplay();
      console.log('Weekly data will be displayed');
    } else if(this.state.value === 'Hourly') {
      this.hourlyDisplay();
      console.log('Hourly data will be displayed');
    } else {
      console.log('An error occured');
    }
  }
  
  render() {
    let extraData = 'Loading...';
    if(this.state.value === 'Weekly' && this.props.weekly !== 'hello') {
      extraData = this.props.weekly.map((day) => {
        return {
          day: new Date(day.time * 1000).getDay(),
          maxTemp: _.round((day.temperatureMax - 32)*5/9, 1),
          minTemp: _.round((day.temperatureMin - 32)*5/9, 1),
          icon: day.icon
        };
      });
      console.log(extraData);
    } else if(this.state.value === 'Hourly' && this.props.hourly !== 'hello') {
      extraData = this.props.hourly.map((hour) => {
        return {
          temp: _.round((hour.temperature - 32) * 5/9, 1),
          icon: hour.icon,
          hour: new Date(hour.time * 1000).getUTCHours()
        };
      });
      console.log(extraData);
    }

    let displayList = () => {
      console.log(extraData);
      if(extraData !== 'Loading...' && this.state.value === 'Weekly') {
        return extraData.map((data, index) => {
          if (index > 0) {
          return (
            <GridListTile className="grid-li" key={index}>
              <Paper elevation={1} className="card-extraData">
                <Typography variant="h6" style={{ opacity: '0.75' }}>
                  {dayName(data.day)}
                </Typography>
                  <CustomIcon
                      icon={data.icon} />
                  {iconNameEdit(data.icon)},
                <Typography variant="body1" style={{ opacity: '0.9' }}>
                  <Typography variant="body1" component="span" className="card-extraData-dissolve">Max:</Typography> {data.maxTemp}
                </Typography>
                <Typography variant="body1" style={{ opacity: '0.9' }}>
                  <Typography variant="body1" className="card-extraData-dissolve">Min:</Typography> {data.minTemp}
                </Typography>
              </Paper>
            </GridListTile>
          )
          }
          return '';
        });
      } else if(extraData !== 'Loading...' && this.state.value === 'Hourly') {
        return extraData.map((data, index) => {
          return (
            <GridListTile className="grid-li" key={index}>
              <Paper elevation={1} className="card-extraData hourly">
                <Typography variant="h6" style={{ opacity: '0.75' }}>
                  {data.time}
                </Typography>
                  <CustomIcon
                      icon={data.icon} />
                  {iconNameEdit(data.icon)},
                <Typography variant="body1" style={{ opacity: '0.9' }}>
                  <Typography variant="body1" component="span" className="card-extraData-dissolve">Max:</Typography> {data.temp}
                </Typography>
              </Paper>
            </GridListTile>
          )
        });
      } else {
        return extraData;
      }
    }

    return(
      <div>
        <FormControl className='FormControl' >
          <Select value={this.state.value} onChange={this.handleChange}>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Hourly">Hourly</MenuItem>
          </Select>
        </FormControl>
        <div className="week-gridcontainer">
        <CurWeekList displayList={displayList} />
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    if(this.state.value === 'Weekly')  this.weeklyDisplay();
    else if(this.state.value === 'Hourly') this.hourlyDisplay();
  }

}

export default withStyles(styles)(WeekLoader);