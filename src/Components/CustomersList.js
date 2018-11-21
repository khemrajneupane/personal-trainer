import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import InsertCustomers from './InsertCustomers';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      //console.log(responseData.content.links);
      this.setState({ 
        customers: responseData.content}); 
    })   
  }
    // Create new customer
    addCustomer(customer) {
      fetch('https://customerrest.herokuapp.com/api/customers', 
      {   method: 'POST', 
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
    // Delete customer
    onDelClick = (idLink) => {
      confirmAlert({
        title: '',
        message: 'Are you sure you want to delete this customer?',
        confirmLabel: 'OK',
        cancelLabel: 'CANCEL',                            
        onConfirm: () => {
          fetch(idLink, {method: 'DELETE'})
          .then(res => this.loadCustomers())
          .catch(err => console.error(err)) 
  
          toast.success("Delete succeed", {
            position: toast.POSITION.TOP_LEFT
          });        
        }
      })   
    }

// Update customer
  updateCustomer(customer, link) {
    fetch(link, 
    { method: 'PUT', 
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
    .catch( err => console.error(err))
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
        <div className= "text-center">
        <InsertCustomers addCustomer={this.addCustomer} loadCustomers={this.loadCustomers}/>
        </div>
        <ReactTable data={this.state.customers}
        columns={[
            {
              Header:"Customer Info",
              
              columns: [
               
                {
                  Header: "First Name",
                  accessor: "firstname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Last Name",
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
                  Cell: ({value, row}) => (<Button bsStyle="primary" active onClick={()=>{this.updateCustomer(row, value)}}>Save</Button>)
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<Button bsStyle="danger" active onClick={()=>{this.onDelClick(console.log(value))}}>Delete</Button>)
                }            
              ]
            }
          ]}
          filterable
          defaultPageSize={6}
          style={{margin: "0px 10px", height: "450px" }}
          className="-highlight" > 
        </ReactTable>
        <ToastContainer autoClose={2000}/>
        <Footer />
      </div>
    );
  }
}

export default CustomersList;