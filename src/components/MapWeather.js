import React,{ Component } from 'react';
import Grid from '@material-ui/core/Grid';
import GMaps from './GMaps';
import MapSearch from './MapSearch';
import './styles/MapWeather.scss';

class MapWeather extends Component {
  constructor(props) {
    super(props);

    this.state= { value: '', loading: false};
    this.renderMap = this.renderMap.bind(this);
  }

  renderMap(data, callback) {
    this.setState({ value: data, loading: false });
    callback();
  }
  
  render() {
    return (
      <div className="map-container">
        <Grid container className="map-weather">
          <MapSearch style={{ paddingBottom: "1em" }} loading={this.state.loading} renderMap={this.renderMap}/>
          <GMaps placeName={this.state.value}/>
        </Grid>
      </div>
    );
  }
}

export default MapWeather;