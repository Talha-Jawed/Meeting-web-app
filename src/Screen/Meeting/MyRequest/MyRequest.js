import React, { Component } from 'react';
import firebase from '../../../config/Firebase'
import AppBar from '../../App bar';
import ImageAvatars from '../../../Component/Avater/Avater'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
// import './style.css'
import { Button } from '@material-ui/core';
import swal from 'sweetalert2'
library.add(faDirections, faCalendarAlt, faClock, faMapMarkerAlt)
class MyRequest extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            array: [],
            keys: [],
            Name: [],
            map: []
        }
        this.Detail = this.Detail.bind(this)

    }
    componentWillMount() {
        const { keys, Name, map, list } = this.state

        const currentUID = localStorage.getItem('currentUserUid')
        const myNum = localStorage.getItem('Number')
        // console.log(myNum);

        firebase.database().ref('Meeting/' + currentUID + '/Request/').on("child_added", (snapshot) => {
            const users = snapshot.val().meetPerson
            const arr = snapshot.val().meetPerson
            this.setState({ array: arr })

            console.log(users);
            list.push(users)
            // var key2 = snapshot.val().Request
            // console.log(key2);
            // var key = key2.userData
            // for (var key in snapshot.val()) {
            //     var key1 = snapshot.val()[key]
            //     for (var val in snapshot.val()[key]) {
            //         var val1 = snapshot.val()[key][val]
            //         // var val = [key][key1]
            //         // console.log(key1);
            //         console.log(val1);
            //     }
            //     console.log(key1);
            //     // console.log(val1.myData.Num);


            // }

        })
    }

    Detail(Name, Num, pic1, pic2, pic3) {
        // console.log(pic1)
        console.log('detal');
        swal({
            title: Name,
            text: 'No.# ' + Num,
            imageUrl: pic1,
            // imageUrl: pic2,
            // imageUrl: pic3,

            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            animation: false
        })

    }
    status = () => {
        console.log('status')
    }

    requst(Name, Num, pic1, pic2, pic3) {
        console.log(Name);

        return (
            <div className='div2'>
                <div className={'status'}>
                    requst
    </div>
                <div >
                    <div onClick={() => this.Detail(Name, Num, pic1, pic2, pic3)}>
                        <ImageAvatars />
                    </div>
                </div>
                <div className={'nameDiv3'}>
                    {Name}
                </div>
                <div className={'meeting-details'}>
                    <div>
                        <FontAwesomeIcon icon='calendar-alt' style={{ marginRight: '3px' }} />date
                    </div>
                    <div>
                        <FontAwesomeIcon icon='clock' style={{ marginRight: '3px' }} />time PM
        </div>
                    <div>
                        <FontAwesomeIcon icon='map-marker-alt' style={{ marginRight: '3px' }} />location
                    </div>
                    <div>
                        {/* <Button onClick={() => this.Detail(Name, Num, pic1, pic2, pic3)}>Detail</Button> */}
                        <Button onClick={this.status}>confrom</Button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { keys, Name, map, array, list } = this.state
        // console.log(list.name, 'list***');
        console.log(Name, 'requst');



        return (
            <div>
                <div>
                    <AppBar />
                    <div>
                        {/* <ImageAvatars /> */}
                        <div>
                            {
                                array &&
                                list.map((item) => {
                                    console.log(item);

                                    return (
                                        this.requst(item.name, item.number, item.images[0], item.images[1], item.images[2])
                                    )

                                })

                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyRequest