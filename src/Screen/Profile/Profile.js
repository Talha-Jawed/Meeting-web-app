import React, { Component, Children } from 'react';
import AppBar from '../App bar';
import { Button, TextField } from '@material-ui/core';
import firebase from '../../config/Firebase'
import { RadioButton, RadioGroup } from '@trendmicro/react-radio';

import swal from 'sweetalert2'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            nickname: '',
            number: '',
            Beverage: '',
            Time: '',
            edit: false
        }
        this.image1 = this.image1.bind(this)
        this.image2 = this.image2.bind(this)
        this.image3 = this.image3.bind(this)
    }
    componentDidMount() {
        const currentUID = localStorage.getItem('currentUserUid')

        firebase.database().ref('user/' + currentUID).on("child_added", (snapshot) => {
            console.log(snapshot.val());
            const name = snapshot.val().name
            const Num = snapshot.val().number
            const Beverage = snapshot.val().Beverage
            const Time = snapshot.val().Time

            this.setState({ nickname: name, number: Num, Beverage: Beverage, Time: Time })
        })

        this.nickname = this.nickname.bind(this);
        this.number = this.number.bind(this);
    }
    edit = () => {
        const { edit } = this.state
        this.setState({ edit: true })
    }
    nickname(e) {
        this.setState({ nickname: e.target.value })
    }

    number(e) {
        this.setState({ number: e.target.value })
    }

    image1() {
        var image1;
        var imageFile = document.getElementsByName('file')[0].files[0];
        console.log(imageFile)
        var fileReader = new FileReader();
        console.log(fileReader)

        fileReader.addEventListener("load", () => {
            image1 = fileReader.result;
            console.log(image1, "imageUrl1")
            // document.getElementById('file').innerHTML = image1.imageFile
            this.setState({ image1 })
        }, false);

        if (imageFile) {
            fileReader.readAsDataURL(imageFile)
        }

    }

    image2() {
        var image2;
        const currentUID = localStorage.getItem('currentUserUid')
        var imageFile = document.getElementsByName('file')[1].files[0];
        console.log(imageFile)
        var fileReader = new FileReader();
        console.log(fileReader)

        fileReader.addEventListener("load", () => {
            image2 = fileReader.result;
            console.log(image2, "imageUrl1")
            this.setState({ image2 })
        }, false);

        if (imageFile) {
            fileReader.readAsDataURL(imageFile)
        }

    }

    image3() {
        var image3;
        const currentUID = localStorage.getItem('currentUserUid')
        var imageFile = document.getElementsByName('file')[2].files[0];
        console.log(imageFile)
        var fileReader = new FileReader();
        console.log(fileReader)

        fileReader.addEventListener("load", () => {
            image3 = fileReader.result;
            console.log(image3, "imageUrl1")
            this.setState({ image3 })
        }, false);

        if (imageFile) {
            fileReader.readAsDataURL(imageFile)
        }

    }

    add = () => {
        const { nickname, number, edit, Beverage, Time ,  image1, image2, image3 } = this.state
        // const name = document.getElementById('name');
        // const number = document.getElementById('num');
        const currentUID = localStorage.getItem('currentUserUid')
        // console.log(currentUID)
        if (nickname.length < 4) {
            swal({
                title: 'error',
                title: 'Nickname is too short'
            })
        }
        else if (!(/^(?:\+\d{2})?\d{11}(?:,(?:\+\d{2})?\d{11})*$/.test(number))) {
            swal({
                title: 'error',
                title: 'Fill the correct phone number'
            })
        } else {
            const info = {
                name: nickname,
                number: number,
                Beverage: Beverage,
                images: [image1, image2, image3],
                Time: Time
            }
            this.setState({ edit: false })
            // this.props.history.push('/Image')
            console.log(info, 'info******');
            firebase.database().ref('user/' + currentUID + '/Profile/').update(info)
                .then(() => {
                    console.log('done')
                })
        }
    }


    renderShow() {
        const { nickname, number, edit, Beverage, Time } = this.state

        return (
            <div>
                <h2>Name: {nickname}</h2>
                <h2>No.#: {number}</h2>
                <h2>Beverages: {Beverage}</h2>
                <h2>Time: {Time}</h2>
                <div>
                    <Button variant="contained" color="secondary" onClick={this.edit}>edit</Button>
                </div>
            </div>
        )
    }

    render() {
        const { nickname, number, edit } = this.state

        return (
            <div>
                <div>
                    <AppBar />{edit === false &&
                        this.renderShow()
                    }
                    {edit === true &&
                        this.renderEdit()
                    }
                </div>
                {/* <button onClick={this.edit}>edit</button> */}
                {/* <h1>hgmhbmn</h1> */}
            </div>
        )
    }
    renderEdit() {
        const { nickname, number } = this.state
        return (
            <div>
                <div>
                    {/* <input type='text' placeholder='Enter your name' id='name' /> */}
                    {/* <input type='text' placeholder='mobile no#' id='num' /> */}
                    <TextField
                        id="outlined-password-input"
                        label="Nick Name"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        color="yellow"
                        value={nickname}
                        onChange={this.nickname}
                    />
                    <br />
                    <TextField
                        id="outlined-password-input"
                        label="Phone Number"
                        type="number"
                        margin="normal"
                        variant="outlined"
                        value={number}
                        onChange={this.number}
                    />
                    <div id='bevarage' >
                        <h2>Select Beverage</h2>
                        <RadioGroup>
                            <RadioButton label="Tea" value='Tea' onChange={(e) => this.setState({ Beverage: e.target.value })} />
                            <RadioButton label="Coffee" value='Coffee' onChange={(e) => this.setState({ Beverage: e.target.value })} />
                            <RadioButton label="Juice" value='Juice' onChange={(e) => this.setState({ Beverage: e.target.value })} />
                            {/* <RadioButton label="Spider-Man (Marvel)" value="marvel:spiderman" disabled /> */}
                        </RadioGroup>
                        {/* <input type="radio" name="gender" value='Tea' onChange={(e) => this.setState({ Beverage: e.target.value })} /> Tea<br />
                    <input type="radio" name="gender" value="Coffee" onChange={(e) => this.setState({ Beverage: e.target.value })} /> Coffee<br />
                    <input type="radio" name="gender" value="Juice" onChange={(e) => this.setState({ Beverage: e.target.value })} /> Juice */}
                    </div>
                    <br />
                    <div id='time'>
                        <h2>Select Time</h2>
                        <RadioGroup>
                            <RadioButton label="30 minute" value='30' onChange={(e) => this.setState({ Time: e.target.value })} />
                            <RadioButton label="60 minute" value='60' onChange={(e) => this.setState({ Time: e.target.value })} />
                            <RadioButton label="90 minute" value='90' onChange={(e) => this.setState({ Time: e.target.value })} />
                            {/* <RadioButton label="Spider-Man (Marvel)" value="marvel:spiderman" disabled /> */}
                        </RadioGroup>
                        {/* <input type="radio" name="time" value='30' onChange={(e) => this.setState({ Time: e.target.value })} /> 30 min<br />
                    <input type="radio" name="time" value="60" onChange={(e) => this.setState({ Time: e.target.value })} /> 60 min<br />
                    <input type="radio" name="time" value="90" onChange={(e) => this.setState({ Time: e.target.value })} /> 90 min */}
                    </div>
                    <div>
                        <input type='file' accept="image/*" name='file' onChange={() => { this.image1() }} /><br />
                        <input type='file' accept="image/*" name='file' onChange={() => { this.image2() }} /><br />
                        <input type='file' accept="image/*" name='file' onChange={() => { this.image3() }} /><br />

                    </div>
                    <br />
                    <br />


                    <Button variant="contained" color="secondary" onClick={this.add}>Update</Button>

                </div>
            </div>

        )
    }
}
export default Profile;