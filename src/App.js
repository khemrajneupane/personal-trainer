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
import fire from './Components/Fire';
import Login from './Login';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.authListener = this.authListener.bind(this);
    this.logout = this.logout.bind(this);

  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if (user) {
        this.setState({ user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
      }
    });
  }
  logout() {
    fire.auth().signOut();
  }

  render() {
    if (!this.state.user) {
      return (<div className="App-header"><Login /></div>);
    }
    
    return (
      <div className="App">

        <header className="App-header">

          <img style={{ height: "25px", width: "25px" }} src={khem} className="App-logo" alt="CustomerDatabase" />
          <span className="App-title">Personal Trainer Database</span>
        </header>
        <div style={{ width: "80px" }}><Button bsStyle="danger" active onClick={this.logout}>Sign out</Button></div>

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