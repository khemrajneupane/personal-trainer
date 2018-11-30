import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import moment from 'moment';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@material-ui/icons/Delete';

export default class TrainingList extends React.Component {

  state = { trainings: [], dt: moment().format('LLLL') };

  componentDidMount() {
    this.loadTrainings();

  }

  // Load trainings from REST API
  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData.content[0].links[2].href);
        this.setState({
          trainings: responseData.content,
        });
      })
  }
  // Delete training by calling its link
  onDelClick=idLink=>{
    confirmAlert({
      title:"",
      message:"Sure to delete this training?",
      buttons:[
        {
          label:"Yes",
          onClick:()=>{
            fetch(idLink,{method:"DELETE"})
            .then(res =>{
              this.setState({showSnack:true,msg:'This training data has been deleted from the database!'})
              this.loadTrainings()//if we don't load training, it will not be deleted from database(json)
            })
            .catch(err=>console.error(err));
          }
        },
        {
          label:"No",
          onClick:()=>alert("Cancelled delete operation")
        }
      ]
    });
  }
  //Posting a training
  addTraining(training) {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(training)
      })
      .then(
        toast.success("New training added!", {
          position: toast.POSITION.TOP_LEFT
        })
      )
      .then(res => this.loadTrainings())
      .catch(err => console.error(err))
  }

  //updading training
  updateTrainings(training, link) {
    fetch(link,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(training)
      })
      .then(
        toast.success("Training updated", {
          position: toast.POSITION.TOP_LEFT
        })
      )
      .catch(err => console.error(err))
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.trainings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ trainings: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.trainings[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {


    return (
      <div className="App-body">

        <div className="card text-center"style = {{backgroundColor:"lightBlue"}}>
          <h1>List of Trainings</h1>
        </div>

        <ReactTable data={this.state.trainings}
          columns={[
            {
              columns: [

                {
                  Header: "Date",
                  accessor: "date",
                  sortable: true,
                  resizable: true,
                  filterable: true,
                  Cell: d => {
                    return moment(d.updated_at)
                      .local()
                      .format("DD-MM-YYYY/hh:mm:ss a")
                  }

                },
                {
                  Header: "Duration",
                  accessor: "duration",
                  Cell: this.renderEditable,
                  Cell: row => (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dadada',
                        borderRadius: '2px'
                      }}
                    >
                      <div
                        style={{
                          width: `${row.value}%`,
                          height: '100%',
                          backgroundColor: row.value > 60 && row.value < 100 ? 'green'
                            : row.value > 33 && row.value < 61 ? 'grey'
                              : row.value > 100 ? 'red'
                                : '#ff2e00',
                          borderRadius: '2px',
                          transition: 'all .2s ease-out'
                        }}
                      ><div style={{ fontSize: "25px" }}>{row.value}</div></div>
                    </div>
                  )
                },
                {
                  Header: "Activity",
                  accessor: "activity",
                  Cell: this.renderEditable
                },
                {
                  Header: "Customer",
                  accessor: "links[2].href",//api trainings endpoit contains customer link availale in the training list.
                  show: false,
                  Cell: this.renderEditable //
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({ value, row }) => (<Button bsStyle="primary" active onClick={() => { this.updateTrainings(row, value) }}>Save</Button>)
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({ value }) => (<Button bsStyle="danger" active onClick={() => { this.onDelClick(value)}}><DeleteIcon/></Button>)
                }
              ]
            }
          ]}
          filterable
          defaultPageSize={7}
          style={{ margin: "40px 10px", height: "500px" }}
          className="-highlight" >
        </ReactTable>
        <ToastContainer autoClose={2000} />
        <Footer />
      </div>
    );
  }
}