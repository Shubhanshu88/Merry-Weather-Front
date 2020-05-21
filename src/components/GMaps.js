import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './styles/MapWeather.scss';


class GMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {lat: null, long: null, name: null, toDisp: true};

    this.isLoad = this.isLoad.bind(this);
  }

  isLoad() {
    console.log(this.props.placeName);
    if (this.props.placeName === '') {
      return (
        <span className="ghost-text">Enter a city name for displaying map</span>
      );
    } else {
          return (
            <iframe src={`${process.env.REACT_APP_BASE_URL}/mapshow/minimap?placeName=${this.props.placeName}`} title="map" height="80vh" style={{ minHeight: "580px" }} width="100%" />
          );
    }
  }

  render() {
    // zoom, lat, lng, or name should be props
    return (
      <Grid item container alignItems='flex-start' justify='center'>
      {this.isLoad()}
      </Grid>
    );
  }
}

export default GMaps;