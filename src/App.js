import React, { Component } from 'react';

import Blog from './containers/Blog/Blog';
import {BrowserRouter} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      //<BrowserRouter basename="/my-app"> //use this when you want to set a different root other than "/"
      <BrowserRouter basename="/my-app">
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
