import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


class Navigation extends Component {

    render() {

        return (
            <div className="jumbotron">
            <div className="row" style={{marginLeft:150}}>
                
                    <Link className="navbar-brand" to="/"></Link>
                
                <div className="card" style={{marginRight:25}}>
                    <Link className="nav-link" to="/"><Button bsStyle="primary" active> Info</Button></Link>
                </div>
                <div className="card" style={{marginRight:25}}>
                    <Link className="nav-link" to="/customers"><Button bsStyle="primary" active> Customers</Button></Link>
                </div>
                <div className="card" style={{marginRight:25}}>
                    <Link className="nav-link" to="/trainings"><Button bsStyle="primary" active> Trainings </Button></Link>
                </div>
                <div className="card" style={{marginRight:25}}>
                    <Link className="nav-link" to="/customertraining"><Button bsStyle="primary" active> Custome-Training </Button></Link>
                </div>
                <div className="card" style={{marginRight:25}}>
                    <Link className="nav-link" to="/calendar"><Button bsStyle="primary" active>Training-Calendar</Button></Link>
                </div>
            </div>
            </div>

        )
    }
}

export default Navigation;