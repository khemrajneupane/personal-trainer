import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import Footer from './Footer'
class CustomerAndTraining extends Component {
  state = { customerTraining: [], dt: moment().format('LLLL') };

  componentDidMount() {
    this.customerTrainings();
  }

  customerTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          customerTraining: responseData
        });

      })
  }


  render() {
    return (
      <div className="App-body">

        <ReactTable data={this.state.customerTraining}
          columns={[
            {
              Header: "Customer Info",
              columns: [

                {
                  Header: "First Name",
                  accessor: "customer.firstname",
                },
                {
                  Header: "Address",
                  accessor: "customer.streetaddress",
                },
                {
                  Header: "Postcode",
                  accessor: "customer.postcode",
                },
                {
                  Header: "City",
                  accessor: "customer.city",
                },
                {
                  Header: "E-mail",
                  accessor: "customer.email",
                },
                {
                  Header: "Phone",
                  accessor: "customer.phone",
                }

              ]
            },
            {
              Header: "Training Info",
              columns: [
                {
                  Header: "Date",
                  accessor: "date",
                },
                {
                  Header: "Duration",
                  accessor: "duration",

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
                }
              ]
            }
          ]}
          filterable
          defaultPageSize={6}
          style={{ margin: "0px 10px", height: "450px" }}
          className="-highlight" >
        </ReactTable>
        <Footer />



      </div>
    );
  }
}

export default CustomerAndTraining;