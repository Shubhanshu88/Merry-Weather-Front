import React, { Component} from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import './styles/Nav.scss';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import { withRouter } from "react-router";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const LinkTab = (props) => {
  console.log(props);
  return (
    <Tab 
        component={RouterLink}
        {...props}/>
  );
}

const NewLink = React.forwardRef((props,ref) => <RouterLink {...props} ref={ref} />
    );

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.location.pathname };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, newValue) {
    this.setState({ value: newValue });
  }

  render() {
    console.log(this.props);
  if(isWidthUp('sm', this.props.width)) {
    return(
    <React.Fragment>
    <Drawer 
      className={`nav`} 
      variant="permanent" 
      classes={{
        paper: 'nav-drawerPaper',
      }}
      anchor="left">
      <Divider />
      <List component="nav">
        {[
          { text:'HOME', url: "/",icon:(<HomeIcon />)},
          { text:'MAP DATA', url: "/map", icon:(<MapIcon />)},
          { text:'COMPARE CITIES', url: "/compare", icon:(<CompareArrowsIcon />)}].map((link,index) => (
          <ListItem 
              key={index}
              button
              component={NewLink} 
              exact
              style={{ margin: '0.7em 0' }}
              activeClassName="link-active"
              to={link.url}
              onClick={event => this.handleChange(event, index)}>
              <ListItemIcon className={`ListIcon`}>
              {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
      <Tabs
          indicatorColor="primary"
          variant="fullWidth"
          value={this.props.location.pathname}
          aria-label="nav tabs example"
      >
        <LinkTab to='/' value="/" label="Home" handleChange={this.handleChange} index={0} {...a11yProps(0)}></LinkTab>
        <LinkTab to='/compare' value="/compare" handleChange={this.handleChange} index={1} label="Compare" {...a11yProps(1)}></LinkTab>
        <LinkTab to='/map' value="/map" handleChange={this.handleChange} index={2} label="Map" {...a11yProps(2)}></LinkTab>
      </Tabs>
      </React.Fragment>
    )
  }
  }
};

export default withRouter((withWidth()(Nav)));
