import React, { Component } from 'react';
import firebase from '../../../config/Firebase'
import AppBar from '../../App bar';
import ImageAvatars from '../../../Component/Avater/Avater'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import { Button } from '@material-ui/core';
import swal from 'sweetalert2'
library.add(faDirections, faCalendarAlt, faClock, faMapMarkerAlt)
class Request extends Component {
    constructor() {
        super()
        this.state = {
            keys: [],
            Name: [],
            map: []
        }
        this.Detail = this.Detail.bind(this)

    }
    componentDidMount() {
        const { keys, Name, map } = this.state

        const currentUID = localStorage.getItem('currentUserUid')
        const myNum = localStorage.getItem('Number')
        // console.log(myNum);

        firebase.database().ref('Meeting/').on("child_added", (snapshot) => {
            // var key2 = snapshot.val().Request
            // console.log(key2);
            // var key = key2.userData
            for (var key in snapshot.val()) {
                var key1 = snapshot.val()[key]
                for (var val in snapshot.val()[key]) {
                    var val1 = snapshot.val()[key][val]
                    // var val = [key][key1]
                    // console.log(key1);
                    console.log(val1);
                }
                console.log(key1);
                // console.log(val1.myData.Num);
                if ('03062709986' === val1.meetPerson.number) {
                    // this.setState({ keys: key1 })
                    keys.push(key1)
                    this.setState({ keys })
                    // if(key1 === )
                    console.log(val1.myData);
                    var naam = val1.myData
                    var place = val1.meetingPlace
                    // var Name = val1.myData.name
                    // var Name = val1.myData.name
                    // var Name = val1.myData.name
                    // var Name = val1.myData.name
                    // this.setState({ Name: naam })
                    Name.push(naam)
                    map.push(place)
                    this.setState({ Name, map })
                } else {
                    console.log('*****');

                }


            }

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
    status(){
        console.log('stat');
        const status = {
            status:'Accept'
        }
        firebase.database().ref('/status/').update(status)
        .then(() => {
                    console.log("requested");
                    // history.push('/User')
                })
    }

    requst(Name, Num, pic1, pic2, pic3) {
        console.log(Name);

        return (
            <div className='div2'>
                <div className={'status'}>
                    requst
</div>
                <div >
                    <div>
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
                        <Button onClick={() => this.Detail(Name, Num, pic1, pic2, pic3)}>Detail</Button>
                        <Button onClick={() => this.status()}>confrom</Button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { keys, Name, map } = this.state
        console.log(keys, 'keys***');
        console.log(Name, 'requst');


        return (
            <div>
                <div>
                    <AppBar />
                    <div>
                        {/* <ImageAvatars /> */}
                        <div>
                            {
                                Name &&
                                Name.map((item) => {
                                    return (
                                        this.requst(item.name, item.Num, item.images[0], item.images[1], item.images[2])
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
export default Request