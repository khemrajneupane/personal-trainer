import React, { Component } from 'react';
import moment from 'moment';

class Footer extends Component {
    state = { dt: moment().format('LLLL') }

    render() {

        return (
            <div>
                <div className="jumbotron">
                    <p>&copy;Khem Raj Neupane, <i>Dated: {this.state.dt}</i></p>
                    <p>Student at <i><a href="https://www.haaga-helia.fi"> Haaga-Helia UAS</a>, Pasila</i></p>
                </div>
            </div>
        );
    }
}

export default Footer;