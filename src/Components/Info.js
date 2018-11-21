import React, { Component } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';//for flipping animation to the Info component.
import Footer from './Footer'
class Info extends Component {

    render() {
        return (
            <div>

                <Flippy
                    flipOnHover={true}
                    flipOnClick={false}
                    flipDirection="vertical"
                    ref={(r) => this.flippy = r}
                    style={{ width: '100%', height: '150px' }}
                >
                    <FrontSide>
                        <h2 style={{ textAlign: "center" }}>Customer Training App</h2>
                        <p className="card-text">As a part of <strong>Front-End-Development</strong> application task, orgaized by <strong>Juha Hinkula</strong>,
                                           I am going to show information about customers and theri trainings status. Adding more customers,
                        deleting them, adding theri training information and deleting them.</p>

                    </FrontSide>
                    <BackSide>

                        <p>If you like this taks, you might want to see me in my
                            <a href="https://github.com/khemrajneupane"> github profile</a>: </p>
                    </BackSide>
                </Flippy>
                <Footer />

            </div>
        )
    }
}
export default Info;