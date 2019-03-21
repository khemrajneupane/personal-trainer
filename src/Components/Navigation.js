import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


class Navigation extends Component {

    render() {

        return (
            <div className="row jumbotron">
            
                
                    
                
                
                    <Link className="nav-link col-sm-2" to="/"><Button bsStyle="primary" active> Info</Button></Link>
               
               
                    <Link className="nav-link col-sm-2" to="/customers"><Button bsStyle="primary" active> Customers</Button></Link>
                
                    <Link className="nav-link col-sm-2" to="/trainings"><Button bsStyle="primary" active> Trainings </Button></Link>
                
                    <Link className="nav-link col-sm-3" to="/customertraining"><Button bsStyle="primary" active> Custome-Training </Button></Link>
                
                    <Link className="nav-link col-sm-3" to="/calendar"><Button bsStyle="primary" active>Training-Calendar</Button></Link>
               
            
            </div>

        )
    }
}

export default Navigation;