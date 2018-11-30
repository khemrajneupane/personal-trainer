import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Footer from './Footer';


const localizer = BigCalendar.momentLocalizer(moment);//globalizer is not working, only localizer works
class Calender extends Component {
  state = {
    events: []// this is required into the BigCalendar
  }

  componentDidMount() {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        //console.log(responseData) return json encoded date;
        //console.log(new Date(responseData[0].date)) //returns Fri Nov 30 2018 09:38:10 GMT+0200 (Eastern European Standard Time);

        var dateArray = [];
        for (var i = 0; i < responseData.length; i++) {
          dateArray.push({
            start: new Date(responseData[i].date),//converting each array date as date.
            //Convert duration(min.) to milliseconds to add to start, in order to get end date.
            end: new Date(responseData[i].date + responseData[i].duration * 60000),
            title: responseData[i].activity,

          });
        }
        this.setState({ events: dateArray });
      })
  }
  render() {

    return (
      <div>
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          views={{
            month: true,
            week: true,
            agenda: true,

          }}
          drilldownView="agenda"
          step={20}
          showMultiDayTimes
          defaultDate={new Date()}
          style={{ height: "450px", margin: "60px 40px" }}
        />
        <Footer />
      </div>
    )
  }
}

export default Calender;