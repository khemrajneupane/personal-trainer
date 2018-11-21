import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


class Navigation extends Component {

    render() {

        return (
            <div className="App container">

                <div className="menu d-flex jumbotron" >
                    <Link className="navbar-brand" to="/"></Link>
                    <Link style={{marginLeft:"200px"}} className="nav-link" to="/"><Button bsStyle="primary" active> Info</Button></Link>
                    <Link className="nav-link" to="/customers"><Button bsStyle="primary" active> CustomersList</Button></Link>
                    <Link className="nav-link" to="/trainings"><Button bsStyle="primary" active> CustomerTrainings </Button></Link>
                    <Link className="nav-link" to="/customertraining"><Button bsStyle="primary" active> CustomerAndTraining </Button></Link>
                </div>
            </div>

        )
    }
}

export default Navigation;