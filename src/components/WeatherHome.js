import React, { Component } from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography'
import SearchPlace from './SearchPlace';
import WeekLoader from './WeekLoader';
import iconVerify from '../helpers/iconVerify.js';
import './styles/WeatherHome.scss';


class WeatherHome extends Component {
  errMessage(msg) {
    console.log(msg);
    if(msg === 'network error') {
      return 'A Network Error occured. Please check your internet connection or restart the application';
    } else {
      return 'Entered place name could not be processed. Please retry using a different place';
    }
  }

  LoadReturn(d) {
     console.log(this.props.data);

    if(this.props.err) {      
      return(     
        <React.Fragment>
        <Grid item xs={12} className={`home-weather-top`}>
        <span className='home-weather-top-h4'>
          <Typography variant="h4" className='home-weather-top-h4'>
            Welcome To MerryWeather
          </Typography>
          </span>
          <SearchPlace className="searchplace" city="NewCity1" changePlace={this.props.changePlace}/>
        </Grid>
        <Grid item xs={12}>
          <Paper className="home-weather-noshow custom-shadow">
          <Typography variant="h4" className="ghost-text">
            {this.errMessage(this.props.err)}
          </Typography>
          </Paper>
        </Grid>
        </React.Fragment>
      );
    }
    else if(this.props.data.current.temp && this.props.data) {
      return(
        <React.Fragment>
          <Grid item xs={12} className={`home-weather-top`}>
              <span className='home-weather-top-h4'>
              <Typography variant="h4" gutterTop>
                {this.props.data.locName.city} {this.props.data.locName.state} {this.props.data.locName.county_code}
              </Typography> 
              <div>{ d }</div>
              </span>
              <SearchPlace city="NewCity1" className='searchplace' changePlace={this.props.changePlace}/> 
          </Grid>
          <Grid item xs={12}>
            <Paper className={`home-weather-mid custom-shadow`}>
            <div className="home-weather-icontainer">              
              <img className="home-icon-current" src={`${process.env.PUBLIC_URL}/icons/${iconVerify(this.props.data.current.icon)}.png`} alt="weather icon"></img>
              <div className="home-icon-current-helper">{this.props.data.current.icon}</div>
            </div>
            <Typography variant="h5" style={{ fontFamily: 'Weather&Time' }}>
              Now: { _.round((this.props.data.current.temp - 32)*5/9, 1) } <sup>o</sup>C
            </Typography>
            <List component="ul" aria-label="extra-conditions">
              {[
                { con:'Wind',val: `${this.props.data.current.windSpeed}`,cls: 'smHide' },
                { con:'Humidity',val: `${_.round(this.props.data.current.humidity * 100,1)}%`,cls: 'smDisp' },
                { con:'Status',val: `${this.props.data.current.status}`, cls: 'smHidLabel' }
                ].map((factor, index) => (
                  <ListItem className={factor.cls} key={index}>
                    <ListItemText className={`${factor.cls}-Label`}>{factor.con}:</ListItemText>
                    <ListItemText>{factor.val}</ListItemText>
                  </ListItem>
                ))}
            </List>
            </Paper>
          </Grid>
          <Grid item xs={12} >  
            <WeekLoader hourly={this.props.data.hourly} weekly={this.props.data.weekly} isWeekly={this.props.isWeekly} isHourly={this.props.isHourly}/>
          </Grid> 
        </React.Fragment>
      );
    } else {
      return(     
        <React.Fragment>
        <Grid item xs={12} className={`home-weather-top`}>
        <span className='home-weather-top-h4'>
          <Typography variant="h4" className='home-weather-top-h4'>
            Welcome To MerryWeather
          </Typography>
          </span>
          <SearchPlace className="searchplace" city="NewCity1" changePlace={this.props.changePlace}/>
        </Grid>
        <Grid item xs={12}>
          <Paper className={`home-weather-noshow`}>
          <Typography variant="h4" className="ghost-text">
            Enter name of a city or Enable location
          </Typography>
          </Paper>
        </Grid>
        </React.Fragment>
      );
    }
  }

  render() {
    const d = new Date().toDateString();
    console.log(d);
    console.log(this.props);
    return (
      <React.Fragment>
      <div className={`home-container`}>
        <Grid container className={'home-weather'}>
          {this.LoadReturn(d)}
        </Grid>
      </div>
      {/* <AppInfo /> */}
      </React.Fragment>
    );
  }
}

export default WeatherHome;