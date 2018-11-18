import React, { Component } from 'react';
import './SignIn.css'
import firebase from '../config/Firebase'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2'



class SignUp extends Component {
    constructor() {
      super()
    }
    signup() {

        var emailRef = document.getElementById('email');
        var usernameRef = document.getElementById('username');
        // console.log('login invoke', emailRef.value, passwordRef.value);
        firebase.auth().createUserWithEmailAndPassword(emailRef.value, usernameRef.value)
            .then((success) => {
                var currentUserUid = firebase.auth().currentUser.uid;
                var obj = {
                    Email: emailRef.value,
                    Name: usernameRef.value
                }
                firebase.database().ref('/UserData/' + currentUserUid + '/').push(obj);
                swal("Successfull", "", "success");
                console.log('signup successfully', success);
                // location = './login.html';
            })
            .catch((error) => {
                swal("Something went wrong", " ", "error");
                console.error('something went wrong', error);
                // errorRef.innerHTML = error.message;
    
            })
    }
    

    render(){
        return(
            
    
        <div id="main-container" class="main-container">
            <div class="flex-box">
                <h2 class="input-fields">Sign Up Here</h2>
                <label class="input-fields"> Email :
                    <input type="email" name="email" id="email" onkeyup="emailValidate()" />
                    <span id="errEmail"></span>
                </label>
                <label class="input-fields">Password:
                    <input type="password" name="password" id="password" onkeyup="passValidate()" />
                    <span id="errPass"></span>
                </label>
                <label class="input-fields">Username:
                    <input type="text" name="username" id="username" onkeyup="nameValidate()" />
                    <span id="errName"></span>
                </label>
                <label>Gender:
    
                    <input type="radio" name="gender" value="male"/> Male
                    <input type="radio" name="gender" value="female"/> Female
                    <input type="radio" name="gender" value="other"/> Other
    
                </label>
                <br/>
                <label>
    
                    <button onClick="signup()" class="button">Sign Up</button>
    
                </label>
                <div id="error"></div>
            </div>
    
        </div>
        )
    }

}  
export default SignUp;