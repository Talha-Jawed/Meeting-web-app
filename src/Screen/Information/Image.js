import React, { Component } from 'react';
import firebase from '../../config/Firebase'
import { AppBar, Button, TextField } from '@material-ui/core';



class Images extends Component {
    constructor() {
        super()
        this.state = {

        }
        this.saveImg = this.saveImg.bind(this)
        this.image1 = this.image1.bind(this)
        this.image2 = this.image2.bind(this)
        this.image3 = this.image3.bind(this)
    }
    saveImg() {
        const { image1, image2, image3 } = this.state
        console.log(image1, image2, image3, 'images');

        const currentUID = localStorage.getItem('currentUserUid')
        console.log('done******');

        if (image1 && image2 && image3) {
            const obj = {
                images: [image1, image2, image3],

            }
            console.log('******');
            firebase.database().ref('user/' + currentUID + '/Profile/').update(obj)
                .then(() => {
                    console.log('submit')
                    this.props.history.push('/Bevarage')

                })
        } else {
            console.log('submit nh howa*****')
        }
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
            document.getElementById('file').innerHTML = image1.imageFile
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
    render() {
        // console.log(this.state.name);

        return (
            <div>
                <h2>Upload Picture's</h2>
                <div>
                    <input type='file' accept="image/*" name='file' onChange={() => { this.image1() }} /><br />
                    <input type='file' accept="image/*" name='file' onChange={() => { this.image2() }} /><br />
                    <input type='file' accept="image/*" name='file' onChange={() => { this.image3() }} /><br />
                    <span id="file"></span>

                    <Button variant="contained" color="secondary" onClick={this.saveImg} >NEXT</Button>
                </div>
            </div>
        );
    }
}
export default Images;