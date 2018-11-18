import React, { Component } from 'react';
import firebase from '../../config/Firebase'
import Name from './Name';
import Images from './Image';
import Beverage from './Bevarage';
import Fmap from './Fmap';
import InfoRoute from './InfoRouter'

class Info extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      // imageURL: ''
    }
    // this.add = this.add.bind(this)
    // this.saveImg = this.saveImg.bind(this)
    // this.image1 = this.image1.bind(this)
    // this.image2 = this.image2.bind(this)
    // this.image3 = this.image3.bind(this)
    // this.catag = this.catag.bind(this)

  }

  // add() {
  //   const name = document.getElementById('name');
  //   const number = document.getElementById('num');
  //   const currentUID = localStorage.getItem('currentUserUid')
  //   console.log(currentUID)
  //   const info = {
  //     name: name.value,
  //     number: number.value
  //   }

  //   console.log(number.value);
  //   firebase.database().ref('user/' + currentUID + '/').push(info)
  //     .then(() => {
  //       console.log('done')
  //     })

  // }


  // saveImg() {
  //   const { image1, image2, image3 } = this.state
  //   console.log(image1, image2, image3, 'images');

  //   const currentUID = localStorage.getItem('currentUserUid')
  //   console.log('done******');

  //   if (image1) {
  //     const obj = {
  //       images: [image1, image2, image3],

  //     }
  //     firebase.database().ref('user/' + currentUID + '/').push(obj)
  //       .then(() => {
  //         console.log('submit')

  //         // this.setState({ page: 2 })
  //       })
  //   } else {
  //     console.log('submit nh howa*****')
  //   }
  // }
  // renderName() {
  //   // console.log(this.state.name);

  //   return (
  //     <div>
  //       <div>
  //         <input type='text' placeholder='Enter your name' id='name' />
  //         <input type='text' placeholder='mobile no#' id='num' />

  //         <button onClick={this.add}>submit</button>
  //         {/* {this.renderImage()}
  //         {this.renderBevarage()} */}
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    // console.log(this.state.name);

    return (
      <div>
        <div>
          <Name/>
          <Images/>
          <Beverage/>
          <Fmap/>
          {/* <InfoRoute/> */}
        </div>
      </div>
    );
  }
    // image1() {
    //   var image1;
    //   var imageFile = document.getElementsByName('file')[0].files[0];
    //   console.log(imageFile)
    //   var fileReader = new FileReader();
    //   console.log(fileReader)

    //   fileReader.addEventListener("load", () => {
    //     image1 = fileReader.result;
    //     console.log(image1, "imageUrl1")
    //     document.getElementById('file').innerHTML = image1.imageFile
    //     this.setState({ image1 })
    //   }, false);

    //   if (imageFile) {
    //     fileReader.readAsDataURL(imageFile)
    //   }

    // }

    // image2() {
    //   var image2;
    //   const currentUID = localStorage.getItem('currentUserUid')
    //   var imageFile = document.getElementsByName('file')[0].files[0];
    //   console.log(imageFile)
    //   var fileReader = new FileReader();
    //   console.log(fileReader)

    //   fileReader.addEventListener("load", () => {
    //     image2 = fileReader.result;
    //     console.log(image2, "imageUrl1")
    //     this.setState({ image2 })
    //   }, false);

    //   if (imageFile) {
    //     fileReader.readAsDataURL(imageFile)
    //   }

    // }

    // image3() {
    //   var image3;
    //   const currentUID = localStorage.getItem('currentUserUid')
    //   var imageFile = document.getElementsByName('file')[0].files[0];
    //   console.log(imageFile)
    //   var fileReader = new FileReader();
    //   console.log(fileReader)

    //   fileReader.addEventListener("load", () => {
    //     image3 = fileReader.result;
    //     console.log(image3, "imageUrl1")
    //     this.setState({ image3 })
    //   }, false);

    //   if (imageFile) {
    //     fileReader.readAsDataURL(imageFile)
    //   }

    // }
    // renderImage() {
    //   // console.log(this.state.name);

    //   return (
    //     <div>
    //       <div>
    //         <input type='file' accept="image/*" name='file' onChange={() => { this.image1() }} /><br />
    //         <input type='file' accept="image/*" name='file' onChange={() => { this.image2() }} /><br />
    //         <input type='file' accept="image/*" name='file' onChange={() => { this.image3() }} /><br />
    //         <span id="file"></span>

    //         <button onClick={this.saveImg} >submit</button>
    //       </div>
    //     </div>
    //   );
    // }

  
  // catag () {
  //   const currentUID = localStorage.getItem('currentUserUid')
  //   const { Beverage, Time } = this.state
  //   console.log(Beverage, 'bevarage****');
  //   console.log(Time, 'time****');
  //   const Beverages = {
  //     Beverage: Beverage,
  //     Time: Time
  //   }
    
  //   firebase.database().ref('user/' + currentUID + '/').push(Beverages)
  //     .then(() => {
  //       console.log('done')
  //     })

  // }
  // renderBevarage() {
  //   return (
  //     <div>
  //       <div id='bevarage'>
  //         <input type="radio" name="gender" value='Tea' onChange={(e) => this.setState({ Beverage: e.target.value })} /> Tea<br />
  //         <input type="radio" name="gender" value="Coffee" onChange={(e) => this.setState({ Beverage: e.target.value })} /> Coffee<br />
  //         <input type="radio" name="gender" value="Juice" onChange={(e) => this.setState({ Beverage: e.target.value })} /> Juice
  //       </div>
  //       <div id='time'>
  //         <input type="radio" name="time" value='30' onChange={(e) => this.setState({ Time: e.target.value })} /> 30 min<br />
  //         <input type="radio" name="time" value="60" onChange={(e) => this.setState({ Time: e.target.value })} /> 60 min<br />
  //         <input type="radio" name="time" value="90" onChange={(e) => this.setState({ Time: e.target.value })} /> 90 min
  //       </div>
  //       <button onClick={this.catag}>done</button>
  //     </div>
  //   )
  // }

}

export default Info;