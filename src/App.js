import React, { Component } from 'react';
import './App.css';
import firebase from './config/Firebase'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Login from './Authentication/LogIn'
import SignUp from './Authentication/SignUp'
import MyMapComponent from './Component/Map'
import Info from './Screen/Information/Info'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Wrapper from './Component/Swipe';
import Cards from './Component/Card';
import MenuAppBar from './Screen/App bar'
import Routers from './Routing/Router';
import History from './History/History';
import Fmap from './Screen/Information/Fmap';
import Map from './Component/Map';
import { Provider } from 'react-redux'
import store from './Redux/store'
import Judge from './Component'
import Name from './Screen/Information/Name';
import Home from './Screen/Information/Home';
import Meeting from './Screen/Meeting';
import Date from './Screen/Meeting/Date';
import Request from './Screen/Meeting/Request/Request';
import MyRequest from './Screen/Meeting/MyRequest/MyRequest';
import Profile from './Screen/Profile/Profile';





var provider = new firebase.auth.FacebookAuthProvider();


class App extends Component {
  constructor() {
    super()

    this.state = {
      // coords: null,

    }
    // this.updateCoords = this.updateCoords.bind(this);
  }

  // componentDidMount() {
  //   firebase.auth().createUserWithEmailAndPassword('uzair@pakao.com', 'uzair123').then(console.log('hogaya'))
  //   this.setposition()
  // }

  // setposition() {
  //   const { coords } = this.state
  //   navigator.geolocation.getCurrentPosition(position => {

  //     console.log(position)
  //     this.setState({ coords: position.coords }, () => console.log('state ha ye', this.state.coords))
  //   })
  // }

  // updateCoords({ latitude, longitude }) {
  //   this.setState({ coords: { latitude, longitude } })
  // }

  render() {
    const { coords } = this.state
    return (
      <div className="App">

        <div>
          <provider store={store}>

            {<Routers />}
          </provider>
          {/* <Profile/> */}
          {/* <Request/> */}
          {/* <MyRequest/> */}
          {/* <Home/> */}
          {/* <Date/> */}
          {/* <Meeting/> */}
          {/* <History/> */}
          {/* {<Fmap/>} */}
          {/* {<Map/>} */}
          {/* { <SignUp/>} */}
          {/* {<Login/>} */}
          {/* <Info/> */}
          {/* <MenuAppBar/> */}
          {/* <Wrapper /> */}
          {/* <Cards /> */}
          {/* <Name /> */}
          {/* <Provider store={store}>
            <Judge />
          </Provider> */}
        </div>
        {/* {
          coords &&
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            coords={coords}
            updateCoords={this.updateCoords}
            />
          } */}
        <div>
          {/* <BasicExample/> */}
        </div>
      </div>
    );
  }
}


// const BasicExample = () => (
//   <Router>
//     <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         {/* <li>
//           <Link to="/topics">Topics</Link>
//         </li> */}
//       </ul>

//       <hr />

//       <Route exact path="/" component={Login} />
//       <Route path="/about" component={MyMapComponent} />
//       {/* <Route path="/topics" component={Topics} /> */}
//     </div>
//   </Router>
// );


export default App;
