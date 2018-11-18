import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import { Button, TextField } from '@material-ui/core';
import swal from 'sweetalert2'
import history from '../../History/History'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class Name extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            number: ''
        }

        this.nickname = this.nickname.bind(this);
        this.number = this.number.bind(this);
        this.add = this.add.bind(this)
    }
    nickname(e) {
        this.setState({ nickname: e.target.value })
    }

    number(e) {
        this.setState({ number: e.target.value })
    }

    add = () => {
        const { nickname, number } = this.state
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
                number: number
            }
            this.props.history.push('/Image')
            console.log(info, 'info******');
            firebase.database().ref('user/' + currentUID + '/Profile/').update(info)
                .then(() => {
                    console.log('done')
                })
        }
    }

    render() {
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
                        // value={nickname}
                        onChange={this.nickname}
                    />
                    <br />
                    <TextField
                        id="outlined-password-input"
                        label="Phone Number"
                        type="number"
                        margin="normal"
                        variant="outlined"
                        // value={number}
                        onChange={this.number}
                    />
                    <br />
                    <br />


                    <Button variant="contained" color="secondary" onClick={this.add}>NEXT</Button>

                </div>
            </div>

        )
    }
}
export default Name;