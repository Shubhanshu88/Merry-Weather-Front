import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import CompareForm from './CompareForm';
import DisplayComp from './DisplayComp';
import './styles/CompareWeather.scss';

class CompareWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city1: null,
      city2: null,
      err: null
    }

    this.fetchComp = this.fetchComp.bind(this);
  }

  fetchComp(value, callback, Location) {
    if(value.input1 && value.input2) {
      console.log(value.input1,value.input2);
      axios.all([
      axios.get(`${process.env.REACT_APP_BASE_URL}/changeplace`,{
        params: {place: value.input1},
        timeout: process.env.REACT_APP_AXIOS_TIMEOUT
      }),
      axios.get(`${process.env.REACT_APP_BASE_URL}/changeplace`,{
        params: {place: value.input2},
        timeout: process.env.REACT_APP_AXIOS_TIMEOUT
      })
      ])
      .then((responseArr) => {
        console.log(responseArr[0]);
        console.log(responseArr[1]);
        if(responseArr[0].status === 200 && responseArr[1].status === 200) {
          this.setState({
            city1: responseArr[0].data,
            city2: responseArr[1].data
          });
          callback();
        } else {
          console.log('Wrong response status');
          callback();
        }
      }).catch((err) => {
        console.log(err);
        if(!err.status) {
          this.setState({ err: 'Network Error' });
        }
        callback();
      });
    }
  }

  render() {
    return (
      <div className="compare-container">
        <Grid container className="compare-weather">
          <CompareForm fetchComp={this.fetchComp} />
            <DisplayComp err={this.state.err} city1={this.state.city1} city2={this.state.city2} />
        </Grid>
      </div>
    );
  }
}

export default CompareWeather;