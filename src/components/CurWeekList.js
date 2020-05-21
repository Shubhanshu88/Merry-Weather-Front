import React from 'react';
import GridList from '@material-ui/core/GridList';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import './styles/WeatherHome.scss';

const widthCheck = (width) => {
  if (isWidthUp('sm', width)) {
    return 5.3;
  }
  else if (isWidthDown('sm', width)) {
    return 7;
  }
}

const CurWeekList = (props) => {
  return (
    <GridList className={`week-gridlist`} cols={widthCheck(props.width)} spacing={1}>
      {props.displayList()}
    </GridList>
  );
}

export default withWidth()(CurWeekList);