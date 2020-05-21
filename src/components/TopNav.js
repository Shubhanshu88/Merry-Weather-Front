import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logowrap: {
    flexGrow: 1,
  },
  logo: {
    width: '150px'
  },
}));

export default function TopNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Tooltip title="Get to know the Day. Never let anyone ruin your trip">
          <div className={classes.logowrap}>
           <img alt="MerryWeather" className={classes.logo} src={`${process.env.PUBLIC_URL}/mw1.png`} />
           </div>
          </Tooltip>
          <Icon style={{ height: '1.3em', width: '1.3em', cursor: 'pointer' }} onClick={() => {
            document.querySelector('.of').scrollTo(0,9/10*window.innerHeight);
          }}><HelpOutlineIcon style={{ height: '1.3em', width: '1.3em' }} /></Icon>
        </Toolbar>
      </AppBar>
    </div>
  );
};