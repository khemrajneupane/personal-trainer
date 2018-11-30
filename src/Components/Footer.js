import React, { Component } from 'react';
import moment from 'moment';
//every other pages will be carring this page as its footer.
class Footer extends Component {
    state = { dt: moment().format('LLLL') }

    render() {

        return (
            <div>
                <div className="jumbotron">
                    <p>&copy;Khem Raj Neupane. <i>You are visiting this app today on : <strong>{this.state.dt}</strong></i></p>
                    <p>Student at <i><a href="https://www.haaga-helia.fi"> Haaga-Helia UAS</a>, Pasila</i></p>
                </div>
            </div>
        );
    }
}

export default Footer;