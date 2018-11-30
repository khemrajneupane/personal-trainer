import React from 'react';
import SkyLight from 'react-skylight';
import { Button } from "react-bootstrap";
import AddIcon from '@material-ui/icons/Add';
export default class InsertTraining extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: '', activity: '', duration: '', customer: '' };
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }


    handleSubmit = (event) => {
        event.preventDefault();
        var fixedDate = this.state.date + ":00.000+0000";//we have this date format in the rest API
        var newTraining = { date: fixedDate, duration: this.state.duration, activity: this.state.activity, customer: this.props.customer };
        this.props.addTraining(newTraining);
        this.refs.simpleDialogTraining.hide();
    }

    render() {

        const addTrainingDialog = {
            width: '50%',
            height: '300px',
            marginTop: '-300px',
            marginLeft: '-30%',
        };

        return (
            <div>
                <SkyLight dialogStyles={addTrainingDialog} hideOnOverlayClicked ref="simpleDialogTraining">
                    <div className="card" style={{ "width": "95%" }}>
                        <div className="card-body">
                            <h5 className="card-title">Add Training</h5>
                            
                            <form>
                                <div className="form-group">
                                    <input type="datetime-local" placeholder="Date" className="form-control" name="date" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="number" placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange} />
                                </div>
                               
                                <div className="form-group">
                                    <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SkyLight>
                <Button variant="fab" color="secondary" aria-label="Add" className="btn-primary"  onClick={() => this.refs.simpleDialogTraining.show()}><AddIcon style= {{width:"110px"}}/></Button>
            </div>
        );
    }
}