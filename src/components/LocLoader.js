import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import WeatherHome from './WeatherHome';
import CompareWeather from './CompareWeather';
import MapWeather from './MapWeather';
import AppInfo from './AppInfo';

class LocLoader extends Component {
  constructor(props) {
    super(props);

    // Dark sky api based state
    this.state = {
      location: {
        lat: null,
        long: null,
      },
      current: {
        temp: null,
        humidity: null,
        maxTemp: null,
        minTemp: null,
        date: null,
        windSpeed: null,
        icon: null,
        status: null,
        visibility: null
      },
      weekly: 'hello',
      hourly: 'hello',
      locName: null
    }

    this.changePlace = this.changePlace.bind(this);
  }

  changePlace(place, callback, Location) {
    console.log(`City to be displayed is ${place}`); 
    axios.get(`${process.env.REACT_APP_BASE_URL}/changeplace`, {
      params: {
        place: place
      },
      timeout: process.env.REACT_APP_AXIOS_TIMEOUT,
    }).then((response) => {
      console.log(response.data);
      if (Object.keys(response.data).length === 0) {
        console.log('Bad luck');
        this.setState({
          err: 'The place name entered cannot be processed',
        });
        callback("error");
      } else {
      this.setState({
        location: {
          lat: response.data.geocode.lat,
          long: response.data.geocode.long,
        },
        current: {
          temp: response.data.weather.currently.temperature,
          humidity: response.data.weather.currently.humidity,
          maxTemp: null, // unavailable right now in response from api
          minTemp: null, // unavailable right now in response from api
          date: new Date(response.data.weather.currently.time * 1000).getDay(),
          windSpeed: response.data.weather.currently.windSpeed,
          icon: response.data.weather.currently.icon,
          status: response.data.weather.currently.summary,
          visibility: response.data.weather.currently.visibility
        },
        hourly: response.data.weather.hourly.data,
        weekly: response.data.weather.daily.data,
        locName: {
          city: response.data.geocode.placeName,
          fullName: response.data.geocode.placeLabel,
          country: null,
          county: null,
          state: null,
          county_code: null
        }
      });
      callback("ok");
    }
    }).catch((err) => {
      if(!err.status) {
        console.log('Okay, now that is a network error');
        this.setState({
          err: 'network error',
        });
      }
      console.log(err);
      callback("error");
    });
  }

  render() {
    return(
      <div className="of" style={{ overflowY: 'scroll', display: 'flex', flexGrow: 1 }}>
      <div style={{ width: '100%' }} >
          <Route path="/" exact render={() => (
            <WeatherHome changePlace={this.changePlace} err={this.state.err} data={this.state} 
              isWeekly={this.isWeekly} isHourly={this.isHourly}/>
          )} />
          <Route path="/compare" component={CompareWeather} />
          <Route path="/map" component={MapWeather} />
          <Route path="/" render={AppInfo} />
      </div>
      </div>
    );
  }

  componentDidMount() {
    // Location of user
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude);

      // To check if state is updated after callback
      if(pos.coords.longitude && pos.coords.latitude) {
        console.log('OK Req');
        
        axios.get(`${process.env.REACT_APP_BASE_URL}/initial`, {
          params: {
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
          },
          timeout: process.env.REACT_APP_AXIOS_TIMEOUT,
        })
        .then((response) => {
          console.log('successfull initial request');
          console.log(response.data);
          if(response.status === 200 && Object.keys(response.data).length !== 0) {
            console.log('Fully Successfull request');
            this.setState({
              location: {
                lat: pos.coords.latitude,
                long: pos.coords.longitude,
              },
              current: {
                temp: response.data.weather.currently.temperature,
                humidity: response.data.weather.currently.humidity,
                maxTemp: null, // unavailable right now in response from api
                minTemp: null, // unavailable right now in response from api
                date: new Date(response.data.weather.currently.time * 1000).getDay(),
                windSpeed: response.data.weather.currently.windSpeed,
                icon: response.data.weather.currently.icon,
                status: response.data.weather.currently.summary,
                visibility: response.data.weather.currently.visibility
              },
              hourly: response.data.weather.hourly.data,
              weekly: response.data.weather.daily.data,
              locName: {
                city: response.data.geocode.placeName,
                fullName: null,
                country: null,
                county: null,
                state: null,
                county_code: null
              }
            });
            console.log(this.state);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }, (err) => {
      if(err) console.log(err.message);
    });
  }
}

export default LocLoader;