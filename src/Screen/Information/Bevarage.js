import React, { Component } from 'react';
import firebase from '../../config/Firebase'
import { RadioButton, RadioGroup } from '@trendmicro/react-radio';
import { Button, TextField } from '@material-ui/core';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-radio/dist/react-radio.css';
class Beverage extends Component {
    constructor() {
        super()
        this.state = {

        }
        this.catag = this.catag.bind(this)
    }

    catag() {
        const currentUID = localStorage.getItem('currentUserUid')
        const { Beverage, Time } = this.state
        console.log(Beverage, 'bevarage****');
        console.log(Time, 'time****');
        const Beverages = {
            Beverage: Beverage,
            Time: Time
        }

        firebase.database().ref('user/' + currentUID + '/Profile/').update(Beverages)
            .then(() => {
                console.log('done')
                this.props.history.push('/Fmap')
            })

    }
    render() {
        return (
            <div>
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
                <br />
                <Button variant="contained" color="secondary" onClick={this.catag}><h5>Next</h5></Button>
            </div>
        )
    }

}
export default Beverage;