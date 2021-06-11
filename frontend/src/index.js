import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './index.css';
import App from './containers/App';
import Authenticate from './containers/Authenticate'
import LoginPage from './containers/LoginPage/LoginPage.js'
import reportWebVitals from './reportWebVitals';
import { AppBar } from '@material-ui/core';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/profile" component={Authenticate}/>
        <Route exact path="/guest" component={()=><App username={null}/>}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
