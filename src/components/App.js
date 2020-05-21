import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopNav from './TopNav';
import LocLoader from './LocLoader';
import Nav from './Nav';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import './styles/App.scss';


// Custom font 
const customTheme = createMuiTheme({
  typography: {
    fontFamily: 'Ubuntu,Gotham,sans-serif'
  }
});

const App = (props) => {

  return (
    <div className="App">
    <ThemeProvider theme={customTheme}>
    <TopNav />
    <BrowserRouter>
    <div className={`container`}>
      <Nav />
      <LocLoader />
    </div>
    </BrowserRouter>
    </ThemeProvider>
    </div>
    );
};

export default App;