import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import './styles/Search.scss';

class MapSearch extends Component {
  constructor(props) {
    super(props);

    this.state={ value: '', loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let load = this.state.loading;
    this.setState({value: e.target.value, loading: load});
    console.log(this.state);
  }

  submitChange(e) {
    e.preventDefault();
    let val = this.state.value;
    console.log('Mission start');
    if(val !== null) {
      this.setState({ value: val, loading: true })
      this.props.renderMap(this.state.value, () => {
        this.setState({ value: val, loading: false })
      });
    }
  }

  loadCheck() {
    if(this.state.loading) {
      return <CircularProgress style={{ margin: 'auto' }} variant="indeterminate" />;
    } else {
      return (
        <React.Fragment>
          <InputBase
            className='Search-InputBase'
            placeholder="Search Source"
            onChange={this.handleChange}
            name="source"
            value={this.state.value}
            inputProps={{ 'aria-label': 'search source' }}
          />
          <Divider className='Search-Divider' orientation="vertical" />
          <IconButton color="primary" component="button" type="submit" className='Search-IconButton' aria-label="search">
            <SearchIcon />
          </IconButton>
          </React.Fragment>
        );
    }
  }
  
  render() {
    return (
      // To do: Change width using isWidth hoc
      <Grid container item justify="center" component="form" onSubmit={this.submitChange} className="map-search">
        <Paper className='Search-Paper long'>
        {this.loadCheck()}
        </Paper>
        </Grid>
    );
  }
}

export default MapSearch;