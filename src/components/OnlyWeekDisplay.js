import React, { Component } from 'react';
import _ from 'lodash';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CustomIcon from './CustomIcon';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {dayName} from '../helpers/dayName';

class OnlyWeekDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "Weekly" };
  }
  
  render() {

    let extraData = 'Loading...';
    if(this.state.value === 'Weekly' && this.props.weekly !== 'hello') {
      extraData = this.props.weekly.map((day) => {
        return {
          day: new Date(day.time * 1000).getDay(),
          maxTemp: _.round((day.temperatureMax - 32)*5/9, 2),
          minTemp: _.round((day.temperatureMin - 32)*5/9, 2),
          icon: day.icon
        };
      });
      console.log(extraData);
    }

    let displayList = (max,min) => {
      console.log(extraData);
      if(extraData !== 'Loading...' && this.state.value === 'Weekly' && max !== null) {
        return extraData.map((data,index) => {
          if(index < max && index > 0) {  // First node is not mapped
          return (
            <ListItem divider key={index}>
                  <ListItemText primary={dayName(data.day)} />
                  <ListItemIcon><CustomIcon icon={data.icon} /></ListItemIcon>
                  <ListItemText primary={_.round((data.maxTemp + data.minTemp)/2, 1)} />

            </ListItem>
          );
          } else if(index === max) {
            return (
              <ListItem button onClick={this.props.setOpen} className="only-display" divider key={index}>
              <ListItemText primary={dayName(data.day)} />
                <ListItemIcon><CustomIcon icon={data.icon} /></ListItemIcon>
              <ListItemText primary={_.round((data.maxTemp + data.minTemp)/2, 1)} />
              <IconButton>
              {this.props.open ? 
              <ExpandLessIcon /> : 
              <ExpandMoreIcon />}
              </IconButton>
              </ListItem>
            );   
          } else {
            return (null);
          }
        });
      } else if(extraData !== 'Loading...' && this.state.value === 'Weekly' && min !== null) {
        return extraData.map((data,index) => {
          if(index >= min) {
          return (
            <ListItem className="only-display-toggle" divider key={index}>
                  <ListItemText primary={dayName(data.day)} />
                  <ListItemIcon><CustomIcon icon={data.icon} /></ListItemIcon>
                  <ListItemText primary={_.round((data.maxTemp + data.minTemp)/2, 1)} />
            </ListItem>
          );
          } else {
            return (null);
          }
        });
      } else {
        return extraData;
      }
    }

    return(
      <React.Fragment>
        {displayList(4,null)}
          <Collapse in={this.props.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {displayList(null,5)}
            </List>
          </Collapse>
      </React.Fragment>
    );
  }
}

export default OnlyWeekDisplay;