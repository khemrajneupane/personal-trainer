import React, { Component } from "react";
import fire from "./Components/Fire";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "sekharneupane22@hotmail.com",
      password: "Password1"
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="col-md-4" style={{ margin: "0 auto" }}>
        <h2 style={{ width: "100%" }}>Personal-Trainer Database</h2>
        <form
          className="card"
          style={{
            marginTop: "100px",
            border: "5px solid green",
            borderTopRightRadius: "50px"
          }}
        >
          <div className="form-group">
            <input
              style={{ borderTopRightRadius: "50px" }}
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="password1">Password</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              className="form-control"
              id="password1"
              placeholder="Password"
            />
          </div>
          <Button bsStyle="primary" type="submit" onClick={this.login}>
            Login
          </Button>
          <Button bsStyle="success" onClick={this.signup}>
            Signup
          </Button>
        </form>
      </div>
    );
  }
}
export default Login;
