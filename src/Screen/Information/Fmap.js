import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { geodesy, distance, latitude, longitude, elevation, geolocation, geodistance, geojson, geospatial, lbs, location } from 'geolib'
import firebase from '../../config/Firebase'
import history from '../../History/History'
import { Button } from '@material-ui/core';



let BASE_URL = "https://api.foursquare.com/v2/venues/search?"
let coords;
let INTENT = "browse"
let RADIUS = 5000;
let LIMIT = 5;


class Fmap extends Component {
    constructor() {
        super()
        this.state = {
            coords: null,

        }
        this.updateCoords = this.updateCoords.bind(this);
        this.point = this.point.bind(this)
    }

    componentDidMount() {
        // const {  updateCoords } = this.state
        this.setposition()


        // console.log(this.setposition());
        // // coords = this.state.coords;
        // // console.log(coords);
        // let USER = '4bf58dd8d48988d11e941735,4bf58dd8d48988d112941735,4bf58dd8d48988d11e941735';
        // fetch(`${BASE_URL}&ll=${coords},${coords}&categoryId=${USER}&intent=${INTENT}&radius=${RADIUS}&client_id=2MRTYILRPCV4R1B2DWNQTN2GCIVIU0PQWWD0L0NJR2BBUXNG&client_secret=1TMO1QBKIRRXKCQBMQF1GTRA0FKQCNTKTNSDPIFZJNPU2JG5&v=20180612`)
        //     .then(x => x.json())
        //     .then(data => {
        //         this.setState({ list: data.response.venues })
        //         console.log(data.response.venues)
        //     });
    }

    setposition() {
        const { coords } = this.state
        navigator.geolocation.getCurrentPosition(position => {

            console.log(position)
            this.setState({ coords: position.coords },
                () => console.log('state****', this.state.coords))
        })
    }

    updateCoords({ latitude, longitude }) {
        this.setState({ coords: { latitude, longitude } })
        // console.log(latitude);

    }

    point =() => {
        const currentUID = localStorage.getItem('currentUserUid')
        const { coords } = this.state
        this.setState({ coords })
        const location = {
            location: {
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        }
        // console.log(coords, 'mapp------')
        firebase.database().ref('user/' + currentUID + '/Profile/').update(location)
            .then(() => {
                console.log('location done*****');
            this.props.history.push('/Dashboard')

            })
    }
    render() {
        const { coords } = this.state
        console.log(coords, 'cords*****');

        return (
            <div>
                <h2>Select a Meeting Place!</h2>
                {
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
                }
                <br />
                <div>
                    <Button variant="contained" color="secondary" onClick={this.point}><h5>Submit</h5></Button>
                </div>
            </div>
        )
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >

        {props.isMarkerShown &&
            <Marker
                position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
                draggable={true}
                onDragEnd={position => {
                    props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
                }}
            />}
    </GoogleMap>

))
export default Fmap;
