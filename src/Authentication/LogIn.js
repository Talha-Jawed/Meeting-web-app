import React, { Component } from 'react';
import './LogIn.css'
import firebase from '../config/Firebase'
// import  'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2'
import history from '../History/History'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import background from '../Image/pic3.jpg'

var provider = new firebase.auth.FacebookAuthProvider();


class Login extends Component {
    constructor(props) {
        super(props)
    }


    //login
    login = () => {
        console.log(this.props);

        var emailRef = document.getElementById('email');
        var passwordRef = document.getElementById('password');
        // var usernameRef = document.getElementById('username');
        let that = this
        console.log('login invoke', emailRef.value, passwordRef.value);
        firebase.auth().signInWithEmailAndPassword(emailRef.value, passwordRef.value)
            .then((success) => {
                swal("Successfull", "", "success");
                console.log('signin successfully', success.user);
                localStorage.setItem('currentUserUid', success.user.uid)
                // location = './index.html';
                this.props.history.push('/Dashboard')

            })
            .catch((error) => {
                swal("Something went wrong", "", "error");
                console.log('something went wrong', error)
            })
    }

    //login from facebook
    loginFB = () => {
        console.log(this.props);
        let that = this
        firebase.auth().signInWithPopup(provider).then((success) => {
            swal("Successfull", "", "success");
            console.log('signin successfully', success.user);
            const currentUID = success.user.uid;
            localStorage.setItem('currentUserUid', success.user.uid)
            console.log(success.user.displayName);
            const obj = {
                userName: success.user.displayName,
                userPic: success.user.photoURL,
                UID: success.user.uid,
            }
            firebase.database().ref('user/' + currentUID + '/Profile/').update(obj)
            .then(() => {
                console.log('done')
                this.props.history.push('/Dashboard')
            })


        })
            .catch(function (error) {
                swal("Something went wrong", "", "error");
                console.log('something went wrong', error)
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;

            });
    }

    render() {
        console.log(this.props);
        return (

            <div>

                {/* <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 text-left">


                        </div>
                    </div>
                </div>
                <br /> */}
                <br />
                <br />
                <div id="main-container" className="main-container">
                    <div className="flex-box">
                        <h2 className="input-fields">LogIn Here</h2>
                        <label className="input-fields"> Email :
                <input type="email" name="email" id="email" />
                        </label>
                        <label className="input-fields">Password:
                <input type="password" name="password" id="password" />
                        </label>

                        <div id="button">

                            <button onClick={this.login} className="button">Login</button>
                            {/* <a href="./signUp.html" class="input-fields" id="acount">Create Account</a> */}
                            <button onClick={this.loginFB} className="button">LOgIn from fb</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Login