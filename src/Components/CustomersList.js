import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import InsertCustomers from './InsertCustomers';
import InsertTrainings from './InsertTrainings';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

class CustomersList extends Component {
  state = { customers: []};

  componentDidMount() {
    this.loadCustomers();
  }

  //Fetching customers from REST API.
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData);
        this.setState({
          customers: responseData.content,
       
        });
      })
  }
  // Create new customer
  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
      })
      .then(
        toast.success("New customer added!", {
          position: toast.POSITION.TOP_LEFT
        })
      )
      .then(res => this.loadCustomers())
      .catch(err => console.error(err))
  }

  onDelClick=idLink=>{
    confirmAlert({
      title:"",
      message:"Sure to delete this customer?",
      buttons:[
        {
          label:"Yes",
          onClick:()=>{
            fetch(idLink,{method:"DELETE"})
            .then(res =>{
              this.setState({showSnack:true,msg:'This customer data has been deleted from the database!'})
              this.loadCustomers()
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

  // Update customer
  updateCustomer(customer, link) {
    fetch(link,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
      })
      .then(
        toast.success("Information updated", {
          position: toast.POSITION.TOP_LEFT
        })
      )
      .catch(err => console.error(err))
  }
  //I want to add training to customer from customer list table.When a new customer is added, on the same link,row value, his/her new training will need to be added.
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
      
      .catch(err => console.error(err))
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {

    return (
      <div className="App-body">
        <div className="text-center">
          <InsertCustomers addCustomer={this.addCustomer} loadCustomers={this.loadCustomers}/>
        </div>
        <ReactTable data={this.state.customers}
          columns={[
            {
              Header: "Customer Info",

              columns: [
                {
                  accessor:"links[0].href",
                  show:false,
                  Cell:this.renderEditable
                },
                {
                  Header:"ADD TRAINING",
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  minWidth: 150,
                  accessor: 'links[0].href',
                  Cell: ({ value}) => (<InsertTrainings addTraining={this.addTraining} loadCustomers={this.loadCustomers} customer = {(value)}/>)
                },
                {
                  Header: "FirstName",
                  accessor: "firstname",
                  Cell: this.renderEditable,
                  maxWidth:200
                },
                {
                  Header: "LastName",
                  accessor: "lastname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Address",
                  accessor: "streetaddress",
                  Cell: this.renderEditable
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                  Cell: this.renderEditable
                },
                {
                  Header: "City",
                  accessor: "city",
                  Cell: this.renderEditable
                },
                {
                  Header: "E-mail",
                  accessor: "email",
                  Cell: this.renderEditable
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                  Cell: this.renderEditable
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({ value, row }) => (<Button bsStyle="primary" active onClick={() => { this.updateCustomer(row, value) }}>Save</Button>)
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({ value }) => (<Button bsStyle="danger" active onClick={() => { this.onDelClick(value) }}><DeleteForeverRoundedIcon/></Button>)
                }
              ]
            }
          ]}
          filterable
          defaultPageSize={6}
          style={{ margin: "0px 10px", height: "450px" }}
          className="-highlight" >
        </ReactTable>
        <ToastContainer autoClose={2000} />
        <Footer />
      </div>
    );
  }
}

export default CustomersList;