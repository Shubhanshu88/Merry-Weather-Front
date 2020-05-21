import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Icon from '@material-ui/core/Icon';
import './styles/WeatherHome.scss';


const AppInfo = () => {
  return (
    <div id="AppInfo" className="AppInfo-container">
      <div className="AppInfo-card-parent">
      <RouteLink onClick={() => {document.querySelector('.of').scrollTop = 0;}} className="AppInfo-link" to="/">
        <Card className="AppInfo-card">
          <CardHeader>Single Place Forecast</CardHeader>
          <CardMedia 
            component={Icon}
            className="MIcon"
            title="Map Data">
              <LocationCityIcon className='MIcon-icon'/>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              Single Place Forecast
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This feature displays weather forecast of a single place.
              </Typography>
            </CardContent>
        </Card>
        </RouteLink>

        <RouteLink onClick={() => {document.querySelector('.of').scrollTop = 0;}} className="AppInfo-link" to="/compare">
        <Card className="AppInfo-card">
          <CardHeader>Compare Places</CardHeader>
          <CardMedia 
            component="img"
            alt="Map Data Icon"
            height="100"
            image={`${process.env.PUBLIC_URL}/icons/signs.svg`}
            style={{ objectFit: 'contain' }}
            title="Map Data"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Compare Places
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                The feature allows comparing between 2 places.
              </Typography>
            </CardContent>
        </Card>
        </RouteLink>

        <RouteLink onClick={() => {document.querySelector('.of').scrollTop = 0;}} className="AppInfo-link" to="/map">
        <Card className="AppInfo-card" style={{ flexGrow: 0.5 }}>
          <CardHeader>Map Data</CardHeader>
          <CardMedia 
            component="img"
            alt="Map Data Icon"
            height="100"
            image={`${process.env.PUBLIC_URL}/icons/map.svg`}
            style={{ objectFit: 'contain' }}
            title="Map Data"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Map Data
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This feature displays temperature along with a map of the region.
              </Typography>
            </CardContent>
        </Card>
        </RouteLink>
      </div>
      <div style={{ height: '5em',width: '100%' }}></div>
    </div>
  );
}

export default AppInfo;