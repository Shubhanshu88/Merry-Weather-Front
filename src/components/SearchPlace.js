import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import './styles/SearchPlace.scss';
import './styles/Search.scss';

class SearchPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '', isLoading: false
    };
    this.citySearch = this.citySearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadCheck = this.loadCheck.bind(this);
  }
  
  loadCheck() {
    if (this.state.isLoading === true) {
      return (
        <CircularProgress style={{ margin: 'auto' }} variant="indeterminate" />
      );
    } else {
      return (
        <React.Fragment>
          <InputBase
            className='Search-InputBase'
            placeholder="Enter Place"
            onChange={this.handleChange}
            name={this.props.city}
            value={this.state.value}
            inputProps={{ 'aria-label': 'enter place' }}
          />
          <Divider className='Search-Divider' orientation="vertical" />
          <IconButton color="primary" className='Search-IconButton' type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </React.Fragment>
      );
    }
  }

  citySearch(e) {
    if(e) e.preventDefault();
    this.setState({ isLoading: true });
    console.log('The submitted city is' + this.state.value);
    if(this.state.value !== '') {
      this.props.changePlace(this.state.value,(isFine) => {
        let val = this.state.value;
        if(isFine === "error") {
          // To do: Show model to user to indicate error
        }
        this.setState({ value: val, isLoading: false });
      });
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <form onSubmit={this.citySearch}>
        <FormControl>
        <Paper className='Search-Paper custom-shadow'>
          {this.loadCheck()}        
        </Paper>
        </FormControl>            
      </form>
    );
  }
}

export default SearchPlace;