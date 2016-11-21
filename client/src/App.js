import React, { Component } from 'react';
// import logo from './logo.svg';
import Gallery from './Gallery';

class App extends Component {
  render() {
    // fetch('api/files?path=2014')
    //     .then(function (response){
    //         return response.json();
    //     })
    //     .then(function (blob) {
    //          console.log(blob);
    //   });
    // return (
      //  <Gallery/>
    // )
    return (
       <div className="App">
         <div className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h2>Welcome to React</h2>
         </div>
         <p className="App-intro">
           To get started, edit <code>src/App.js</code> and save to reload.
         </p>
       </div>
     );
  }
}

export default App;
