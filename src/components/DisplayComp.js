import React, { Component } from 'react';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import OnlyWeekDisplay from './OnlyWeekDisplay';
import CustomIcon from './CustomIcon';
import { iconNameEdit } from '../helpers/dayName';
import './styles/CompareWeather.scss';

class DisplayComp extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.CityData = this.CityData.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen() {
    let prev = this.state.open;
    this.setState({ open: !prev });
  }

  CityData(city) {
    if(city !== null) {
      return(
        <Paper className="compare__part">
          <Typography variant="h3">{city.geocode.placeName}</Typography>
          <List component="nav" aria-labelledby="drop-list">
          <ListItem className="compare__current">
            {new Date(city.weather.currently.time).getDate()}
            <span className='customIcon'>
            <CustomIcon fontSize="large" icon={city.weather.currently.icon} />
            {iconNameEdit(city.weather.currently.icon)}
            </span>
            <span style={{ marginRight: '10px' }}>
              {_.round((city.weather.currently.temperature - 32) * 5/9, 2)}<sup>o</sup>C
            </span>
            {_.round(city.weather.currently.humidity * 100,1)}%
          </ListItem>
          <OnlyWeekDisplay open={this.state.open} setOpen={this.setOpen} weekly={city.weather.daily.data} className="compare__weekdata"/>
          </List>
        </Paper>
      );
    } else {
      return(
        <div className="ghost-text">No data entered</div>
      );
    }
  }

  errCheck(err) {
    if (err === 'Network Error') {
      return (
        <React.Fragment>
        <Grid item container justify="center" xs={12}>
        <div className="ghost-text">A Network Error occured. Please check your internet connection or restart the application</div>
        </Grid>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
        <Grid item container justify="center" xs={12} sm={6}>
        {this.CityData(this.props.city1)}
        </Grid>
        <Grid item container justify="center" xs={12} sm={6}>
        {this.CityData(this.props.city2)}
        </Grid>
        </React.Fragment>
      );
    }
  }
 
  render() {
    return (
      <Grid item direction="row" spacing={3} container xs={12}>
      {this.errCheck(this.props.err)}  
      </Grid>
    );
  }
}

export default withWidth()(DisplayComp);