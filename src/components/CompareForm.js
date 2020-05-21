import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth'
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import './styles/CompareWeather.scss';
import './styles/Search.scss';

class CompareForm extends Component {
  constructor(props) {
    super(props);

    this.state={
      value: {
        input1: '',
        input2: '',
      },
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadCheck = this.loadCheck.bind(this);
  }

  handleChange(event) {
    let preValue = null;
    if(event.target.name === "source") {
      preValue = this.state.value.input2;
      this.setState({
        value: { input1: event.target.value, input2: preValue}
      });
    } else if(event.target.name === "dest") {
      preValue = this.state.value.input1;
      this.setState({
        value: { input1: preValue, input2: event.target.value}
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let inputs = this.state.value;
    if(this.state.value.input1 !== '' && this.state.value.input2 !== '' && this.state.value.input1 !== this.state.value.input2) {
      this.setState({ 
        value: {input1: inputs.input1, input2: inputs.input2 }, 
        loading: true });
        console.log('open');
        this.props.fetchComp(this.state.value, () => {
          this.setState({ 
            value: {input1: inputs.input1, input2: inputs.input2 }, 
            loading: false });
            console.log('close');
        });
      }
  }

  loadCheck() {
    if (this.state.loading === true) {
      return <CircularProgress style={{ margin: 'auto' }} variant="indeterminate" />;
    } else {
      if (isWidthUp('sm',this.props.width)) {
        return (  
      <React.Fragment>
        <InputBase
            className='Search-InputBase'
            placeholder="Search Source"
            onChange={this.handleChange}
            name="source"
            value={this.state.value.input1}
            inputProps={{ 'aria-label': 'search source' }}
          />
          <Divider className='Search-Divider-Comp' orientation="vertical" />
          <IconButton component="button" type="submit" color="primary" className='Search-IconButton compare-searchicon' aria-label="search">
            <SearchIcon/>
          </IconButton>
          <Divider className='Search-Divider-Comp' orientation="vertical" />
          <InputBase
            className='Search-InputBase'
            placeholder="Search Destination"
            onChange={this.handleChange}
            name="dest"
            value={this.state.value.input2}
            inputProps={{ 'aria-label': 'search destination' }}
          />

        </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
        <Grid item spacing={3} style={{ margin: 0 }} container xs={8} alignContent="flex-start" justify="center">
          <Grid item container xs={12} alignContent="flex-start" justify="center">
          <Input
              type='text' 
              value={this.state.value.input1}
              placeholder="Enter Source"
              name="source"
              onChange={this.handleChange}
              id="input-1"
            />
          </Grid>
          <Grid item container xs={12} alignContent="flex-start" justify="center" >
            <Input
              type='text' 
              value={this.state.value.input2}
              placeholder="Enter Destination"
              name="dest"
              onChange={this.handleChange}
              id="input-2"
            />
            </Grid>
        </Grid>
        <Grid item container xs={4} alignContent="center" justify="center" >
          <IconButton component="button" type="submit" color="primary" className='Search-IconButton compare-searchicon' aria-label="search">
            <SearchIcon/>
          </IconButton>
        </Grid>
        </React.Fragment>
        )
      }
    }
  }

  render() {
    return(
      <Grid container item spacing={2} component="form" onSubmit={this.handleSubmit}>
      <Paper className='Search-Paper slong slong-comp'>
        {this.loadCheck()}
        </Paper>
      </Grid>
      );
  }
}

export default withWidth()(CompareForm);