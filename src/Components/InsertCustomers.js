import React from 'react';
import SkyLight from 'react-skylight';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

class InsertCustomers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' };
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }


    handleSubmit = (event) => {
        event.preventDefault();
        var newCustomer = { firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone };
        this.props.addCustomer(newCustomer);
        this.props.loadCustomers();
        this.refs.simpleDialog.hide();
    }

    render() {

        const addCustomerDialog = {
            width: '70%',
            height: '550px',
            marginTop: '-300px',
            marginLeft: '-35%',
        };

        return (
            <div>
                <SkyLight dialogStyles={addCustomerDialog} hideOnOverlayClicked ref="simpleDialog">
                    <div className="card" style={{ "width": "95%" }}>
                        <div className="card-body">
                            <h5 className="card-title">Add New Customer</h5>
                            <form>
                                <div className="form-group">
                                    <input type="text" placeholder="Name" className="form-control" name="firstname" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Surname" className="form-control" name="lastname" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Address" className="form-control" name="streetaddress" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="City" className="form-control" name="city" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="E-mail" className="form-control" name="email" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Phone" className="form-control" name="phone" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SkyLight>

                <Button style={{ 'margin': '25px' }} className="btn btn-success" onClick={() => this.refs.simpleDialog.show()}>Add New Customer </Button>


            </div>
        );
    }
}

export default InsertCustomers;