import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker'
import { Button } from '@material-ui/core';
import swal from 'sweetalert2'
import firebase from '../../config/Firebase'
import moment from 'moment';
import history from '../../History/History'
import History from '../../History/History';


class DateTime extends Component {
    constructor() {
        super()
        this.state = {
            date: new Date(),
            button: false
        }
        this.Submit = this.Submit.bind(this)
    }
    componentDidMount() {
        // console.log(this.props.meetingPlace);
        // console.log(this.props.Person);
        // console.log(this.props.myData);
        this.setState({
            meetingPlace: this.props.meetingPlace,
            meetPerson: this.props.Person,
            myData: this.props.myData
        })
    }

    onChange = (date) => {
        if (date >= new Date()) {
            console.log(date);

            this.setState({ date, button: true })
        } else {
            console.log("error");

        }
    }

    Submit = () => {
        const { button, date, meetPerson, meetingPlace, myData } = this.state
        const currentUID = localStorage.getItem('currentUserUid')

        if (button === true) {
            swal({
                title: 'REQUESTED',
                // text: 'Do you want to continue',
                type: 'success',
                showConfirmButton: false,
                timer: 2000
            })
            const Request = {
                    myData : myData,
                    date: date,
                    meetPerson: meetPerson,
                    meetingPlace: meetingPlace,
            }
             console.log(Request.date);
            
            // firebase.database().ref('Meeting/' + currentUID + '/Request/').push(Request)
            //     .then(() => {
            //         console.log("requested");
            //         history.push('/User')
            //     })



        } else {
            swal({
                title: 'Plese Set Time & Date!',
                // text: 'Do you want to continue',
                type: 'error',
                confirmButtonColor: '#f50057',
                confirmButtonText: 'OK',
                timer: 2000
            }).then(() => {
                // this.props.History.push('/')
            })
            console.log('Error');
        }


    }


    render() {
        const { date, meetPerson, meetingPlace, myData } = this.state
        console.log(meetPerson);
        console.log(meetingPlace);
        console.log(myData);
        console.log(date.getDate());

        return (

            <div>
                <h3>Set Time & Date</h3>
                <br />
                <DateTimePicker
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <br />
                <br />
                <br />
                <br />

                <div>
                    <Button variant="contained" color="secondary" onClick={this.Submit}><h6>SEND REQUEST</h6></Button>
                </div>

            </div>
        )
    }
}
export default DateTime;