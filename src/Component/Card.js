import React, { Component } from 'react';
import './app.css';
import ImageGallery from 'react-image-gallery';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import "react-image-gallery/styles/css/image-gallery.css";
import firebase from '../config/Firebase'
import img from '../Image/pic3.jpg'
import img1 from '../Image/pic4.jpg'
import img2 from '../Image/pic5.jpg'
// import Wrapper from './Swipe'
library.add(faCheck , faTimes)


class UserCards extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    // componentDidMount() {
    //     const currentUID = localStorage.getItem('currentUserUid')
    //     firebase.database().ref('user/').on('child_added', (snapshot) => {
    //         const Name = snapshot.val().Profile.name
    //         // const Picture = snapshot.val().Profile.images
    //         const profile = snapshot.val()
    //         console.log(Name);
    //         this.setState({Name})
    //         // this.setState({Picture})
    //     })
    // }

    render() {
        const prp = this.props.user
        // console.log(this.props.Pic1 , 'prop*****');
        const naam = this.props.Name
        
        const { Name , Picture } = this.state
        // console.log(Name , 'dd**---**--');
        
        const images = [
            {
                original: this.props.Pic1,
                // thumbnail: img,
            },
            {
                original: this.props.Pic2,
                // thumbnail: img1
            },
            {
                original: this.props.Pic3,
                // thumbnail: img2
            }
        ]
        
        return (
            <div className={'main-container'} >
            {/* <Wrapper/> */}
                <div className={'cards'}>
                    <div className={'card-img'}>
                        <ImageGallery items={images} />
                        {/* <img src={img} width={50} />
                        <img src={img1} width={50} /> */}
                        {/* <ImageGallery  /> */}
                    </div>
                    <div className={'nameDiv'}>
                        <div>
                            <div>
                                <FontAwesomeIcon icon='times' className={'cross'} />
                            </div>
                        </div>
                        <div className={'nick'}>
                            <div>{naam}</div>
                            <span>sheikh</span>
                        </div>
                        <div className={'select'}>
                            <div>
                                <FontAwesomeIcon icon='check' className={'check'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default UserCards;