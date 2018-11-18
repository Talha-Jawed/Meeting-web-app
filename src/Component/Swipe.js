import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-deck'
import UserCards from './Card';
import swal from 'sweetalert2'
import AppBar from '../Screen/App bar'
import firebase from '../config/Firebase'
import geolib from 'geolib'
import history from '../History/History'
import Meeting from '../Screen/Meeting';



const data = ['Alexandre']


class Wrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: [],
      arr: [],
      profileKey: [],
      allUsers: [],
      usersProfile: [],
      Meet: 'false'
    }


  }


  componentDidMount() {
    const { user, profile, userData, allUsers } = this.state
    const currentUID = localStorage.getItem('currentUserUid')
    this.setState({ userData: this.props.userData }, () => {
      firebase.database().ref('user/').on('child_added', (snapshot) => {
        const Name = snapshot.val().Key
        // console.log(Name);
        this.setState({ user: Name })
        // const Locat = snapshot.val().Profile.location
        // console.log(Locat, 'locat******');

        const Profile = snapshot.val().Profile
        console.log(Profile)
        console.log(this.props.userData.location.longitude, '******************')
        const Radius = geolib.isPointInCircle(
          this.props.userData.location,

          { latitude: this.props.userData.location.latitude, longitude: this.props.userData.location.longitude },
          1000000     ///isko 5 km k lye 5000 krna h
        );
        console.log(Radius, 'radius');

        if (Radius) {
          if (this.props.userData.Num !== Profile.number) {

            allUsers.push(Profile)
            console.log('shukr');
          }

        } else {
          console.log('nhi howa');

        }
        // this.setState ({allUsers:Profile})
        // this.state.userData.map(items => {
        //   console.log(this.state.userData.beverages);
        //   console.log(items);

        //   if (Beverage.indexOf(items) !== -1) {
        //     // console.log(snapshot.key, 'Profile bever')
        //     // console.log(Beverage)
        //     user.push(snapshot.key)
        //     this.setState({ user })
        //   }
        //   userData.duration.map(item => {
        //     if (duration.indexOf(item) !== -1) {
        //       console.log(duration)
        //       user.push(snapshot.key)
        //       console.log(Profile, 'Profile dura')
        //       this.setState({ user }, () => {
        //         const array = []
        //         this.state.user.map(item => {
        //           if (array.indexOf(item) === -1 && item !== currentUID) {
        //             array.push(item)
        //             this.setState({ array }, () => {
        //               console.log(this.state.array, 'this.state.array')
        //               console.log(Profile.location, 'uProfile')
        //               const result = geolib.isPointInCircle(
        //                 this.props.userData.location,
        //                 { latitude: Profile.location.latitude, longitude: Profile.location.longitude },
        //                 100000      ///isko 5 km krna ha value 5000
        //               );
        //               if (result) {
        //                 if (snapshot.key !== currentUID) {
        //                   // console.log(snapshot.key, 'keys')
        //                   const { ProfileKey, allUsers, usersProfile } = this.state

        //                   if (ProfileKey.indexOf(snapshot.key) === -1) {
        //                     firebase.database().ref('users/' + snapshot.key + '/Profile').once('value', (snapShot) => {
        //                       // console.log(snapShot.val(), 'val()')
        //                       allUsers.push(snapShot.val())
        //                       this.setState({ allUsers }, () => {
        //                         // console.log(this.state.allUsers,'all users here')
        //                         const userPro = Object.values(this.state.allUsers.reduce((acc, cur) => Object.assign(acc, { [cur.number]: cur }), {}))
        //                         this.setState({ usersProfile: userPro })
        //                       })
        //                     })
        //                   }
        //                 }
        //               }
        //             })
        //           } else {
        //           }

        //         })
        //         // console.log(this.state.user, 'user here')
        //       })
        //     }
        //   })
        // })
      })
    })
  }


  right(Person) {
    // const{allUsers} = this.state
    console.log(Person);
    this.setState({ Person: Person })
    swal({
      title: `You want to meet with ${Person.name}`,
      // text: Person.name,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      console.log(result, 'result');

      if (result.value) {

        this.setState({ Meet: 'true' })
        // history.push({
        //   pathname: '/Meeting',
        //   state: {
        //     userData: Person
        // }
        // })
      }
      console.log('done***');

    })
  }


  render() {
    const { userData, allUsers, Meet, Person } = this.state
    console.log(allUsers, 'alluser****');
    console.log(this.props);
    console.log(userData , 'userdata***');

    return (
      <div>
        <div>
          <AppBar />

        </div>{Meet === 'false' && <Cards size={[700, 700]} onEnd={() => console.log('end***')} className='master-root'>
          {allUsers.map(item =>

            <Card key={item}
              onSwipeLeft={() => console.log('left***')}
              onSwipeRight={() => this.right(item)}>
              {/* <h2>{item}</h2> */}

              <UserCards Name={item.name} Pic1={item.images[0]} Pic2={item.images[1]} Pic3={item.images[2]} />

            </Card>
          )}
        </Cards>
        }
        {
          Meet === 'true' && <Meeting Person={Person} myData={userData} />
        }
      </div>
    )
  }
}


export default Wrapper;