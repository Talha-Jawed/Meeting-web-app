import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import History from '../../History/History'
import Name from './Name'
import Image from './Image'
import Bevarage from './Bevarage'
import FMap from './Fmap'

class InfoRoute extends Component {
    
    render() {
        return (
            <Router History={History}>
                {/* <div> */}
                    <div>
                        <Route  path="/name" component={Name} />
                        <Route  path="/image" component={Image} />
                        <Route  path="/time" component={Bevarage} />
                        <Route  path='/map' component={FMap} />
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
export default InfoRoute;