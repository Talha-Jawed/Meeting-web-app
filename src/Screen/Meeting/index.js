/* global google */
import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import swal from 'sweetalert2'
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"
import Date from './Date';

let BASE_URL = "https://api.foursquare.com/v2/venues/search?"
let COORDS;
let INTENT = "browse"
let RADIUS = 5000;
let LIMIT = 5;


class Meeting extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            coords: {},
            keyword: '',
            place: 'false',
            Next: false
        }
        this.search = this.search.bind(this);
        this.setPlace = this.setPlace.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
        this.getDirections = this.getDirections.bind(this);
        this.next = this.next.bind(this)
    }
    componentDidMount() {
        COORDS = this.props.myData.location;
        console.log(COORDS);
        let USER = '';
        fetch(`${BASE_URL}&ll=${COORDS.latitude},${COORDS.longitude}&categoryId=${USER}&intent=${INTENT}&radius=${RADIUS}&client_id=2MRTYILRPCV4R1B2DWNQTN2GCIVIU0PQWWD0L0NJR2BBUXNG&client_secret=1TMO1QBKIRRXKCQBMQF1GTRA0FKQCNTKTNSDPIFZJNPU2JG5&v=20180612`)
            .then(x => x.json())
            .then(data => {
                this.setState({ list: data.response.venues })
                console.log(data.response.venues)
            });
    }

    setPlace(place) {
        // console.log(place);

        swal({

            type: 'success',
            // title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 2000
        }).then((result) => {
            // console.log(result);

            const meetingPlace = {
                name: place.name,
                location: {
                    latitude: place.location.lat,
                    longitude: place.location.lng
                },
                // address: venue.location.address ? venue.location.address : 'not available'
            }
            console.log(meetingPlace, 'meeting place')
            this.setState({ meetingPlace: meetingPlace, place: 'true' })
        })
    }

    search(e) {
        e.preventDefault();
        const { keyword } = this.state;
        console.log("Searcing");
        fetch(`${BASE_URL}&ll=${COORDS.latitude},${COORDS.longitude}&intent=${INTENT}&radius=${RADIUS}&query=${keyword}&client_id=2MRTYILRPCV4R1B2DWNQTN2GCIVIU0PQWWD0L0NJR2BBUXNG&client_secret=1TMO1QBKIRRXKCQBMQF1GTRA0FKQCNTKTNSDPIFZJNPU2JG5&v=20180612`)
            .then(x => x.json())
            .then(data => {
                this.setState({ list: data.response.venues })
                console.log(data.response.venues)
            });
    }
    next() {
        console.log('next');
        this.setState({ Next: true })

    }
    render() {
        const { place, Next , meetingPlace } = this.state
        return (
            <div>
                {
                    place === 'false' && this.renderPlace()
                }
                {
                    Next === false && place === 'true' && this.renderDirection()
                }
                {
                    Next === true && <Date meetingPlace={meetingPlace} Person={this.props.Person} myData={this.props.myData} />
                }
            </div>
        )
    }

    renderPlace() {
        const { list, keyword } = this.state;

        // console.log(this.props.Person.location);
        // console.log(this.props.myData);


        return (

            <div>
                <h3>
                    Search For Place ...
            </h3>

                <form style={{ marginTop: 10 }} onSubmit={this.search}>
                    <div className="form-row align-items-center">
                        <div className="col-sm-6">
                            <input
                                type="text"
                                value={keyword}
                                className="form-control mb-2"
                                placeholder="Search Meeting Place"
                                onChange={(e) => this.setState({ keyword: e.target.value })}
                            />
                        </div>
                        <div >
                            <button type="submit" className="btn btn-danger mb-2">Search</button>                        </div>
                    </div>
                </form>
                <ul className="list-group place" style={{ marginTop: 20 }}>
                    {list.map(place => {
                        return (
                            <li
                                style={{ cursor: 'pointer' }}
                                key={place.id} className="list-group-item"
                                onClick={() => this.setPlace(place)}
                            >
                                {place.name}
                            </li>
                        )
                    })}
                </ul>

            </div>
        )
    }


    updateCoords({ latitude, longitude }) {
        this.setState({ coords: { latitude, longitude } })
    }

    getDirections() {
        const { meetingPlace } = this.state
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(this.props.myData.location.latitude, this.props.myData.location.longitude),
            destination: new google.maps.LatLng(meetingPlace.location.latitude, meetingPlace.location.longitude),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {

            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                alert("Sorry! Can't calculate directions!")
            }
        });
    }


    renderDirection() {
        const { coords, directions, meetingPlace } = this.state;
        return (
            <div>
                {/* <button onClick={this.login}>Login with facebook shareef!</button> */}
                <MyMapComponent
                    isMarkerShown
                    coords={coords}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfAgxsvhUX0fvUH6IzYkBMHv2Xm18PH7Q&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    directions={directions}
                />

                <div className="form-row align-items-center" >
                    <div className="col-sm-6">
                        <Button variant="contained" color="secondary" onClick={this.getDirections}><h5>{meetingPlace.name + ' ' + 'Direction'}</h5></Button>
                    </div>
                    <Button variant="contained" color="secondary" onClick={this.next}><h5>NEXT</h5></Button>
                </div>

            </div>
        )
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: 24.8812296, lng: 67.0727269 }}
    >

        <Marker position={{ lat: 24.8812296, lng: 67.0727269 }} />
        <Marker position={{ lat: 24.8861479, lng: 67.0595196 }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))
export default Meeting;