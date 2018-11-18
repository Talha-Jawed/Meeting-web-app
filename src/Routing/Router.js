import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import LogIn from '../Authentication/LogIn'
import Info from '../Screen/Information/Info'
import Name from '../Screen/Information/Name'
import Image from '../Screen/Information/Image'
import Bevarage from '../Screen/Information/Bevarage'
import Fmap from '../Screen/Information/Fmap'
import history from '../History/History'
import User from '../Component/Swipe'
import Meeting from '../Screen/Meeting'
import Dashboard from '../Screen/Information/Home'
import Profile from '../Screen/Profile/Profile'
import notification from '../Screen/Meeting/Request/Request'

class Routers extends Component {

    render() {
        return (
            <Router history={history}>
                {/* <div> */}
                <div>
                    <Route exact path="/" component={LogIn} />
                    <Route exact path='/Dashboard' component={Dashboard} />
                    {/* <Route exact path='/Dashboard' component={Dashboard} /> */}
                    <Route exact path="/Name" component={Name} />
                    <Route exact path='/Image' component={Image} />
                    <Route exact path='/Bevarage' component={Bevarage} />
                    <Route exact path='/Fmap' component={Fmap} />
                    <Route exact path='/Users' component={User} />
                    <Route exact path='/Meeting' component={Meeting} />
                    <Route exact path='/Profile' component={Profile} />
                    <Route exact path='/notification' component={notification}/>


                </div>
                {/* <hr /> */}

                {/* <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} /> */}
                {/* </div> */}
            </Router>
        )
    }

}
export default Routers;