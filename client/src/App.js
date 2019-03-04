import React, { Component } from 'react';
import {
  HashRouter,
  Route
} from 'react-router-dom';
//import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';



class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/login" component={Login}/>
          <Route path ="/register" component={Register}/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
