import React, { Component } from 'react';
import firebase from '../../config/Firebase'
import Wrapper from '../../Component/Swipe'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            profile : true
        }
    }
    componentWillMount() {
        const { profile } = this.state
        const currentUID = localStorage.getItem('currentUserUid')
        firebase.database().ref('user/' + currentUID + '/Profile/').on('value', (snapshot) => {
            // const Name = snapshot.val().location
            // console.log(Name);
            
            if (snapshot.val()) {
                console.log(snapshot.val());
                
                if (snapshot.val().location) {
                    console.log(snapshot.val().location)
                    const obj = {
                        name: snapshot.val().name,
                        beverages : snapshot.val().Beverage,
                        images : snapshot.val().images,
                        location : snapshot.val().location,
                        duration : snapshot.val().Time,
                        Num: snapshot.val().number
                    }
                    this.setState({ profile: 'true', userData: obj })
                    localStorage.setItem('Number' , obj.Num)
                } else {
                    this.setState({ profile: 'false' })
                }
            }
            else {
                this.setState({ profile: 'false' })
                this.props.history.push('/Name')
            }
        })
    }

    render() {
        const { profile, userData } = this.state
        console.log(profile);
        console.log(userData);
        return (
            <div>
                {
                    profile === 'true' && <Wrapper userData={userData} />
                }
            </div>
        )
    }
}

export default Home