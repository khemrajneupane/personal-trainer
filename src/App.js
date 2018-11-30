import React, { Component } from 'react';
import khem from './Components/khem.jpg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Info from './Components/Info';
import Navigation from './Components/Navigation';
import CustomersList from './Components/CustomersList';
import TrainingList from './Components/TrainingList';
import CustomerAndTraining from './Components/CustomerAndTraining';
import Calender from './Components/Calender';


class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img style={{ height: "25px", width: "25px" }} src={khem} className="App-logo" alt="CustomerDatabase" />
          <span className="App-title">Personal Trainer Database</span>
        </header>



        <BrowserRouter baseline>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Info} />
              <Route path="/customers" component={CustomersList} />
              <Route path="/trainings" component={TrainingList} />
              <Route path="/customertraining" component={CustomerAndTraining} />
              <Route path="/calendar" component={Calender} />
            </Switch>

          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;