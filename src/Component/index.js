import React, { Component } from 'react';
import { updateUser } from '../Redux/actions/authAction'
import { connect } from 'react-redux'

class Judge extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateUser({name: 'kashif', age: 51})
    console.log(this.props);
    
  }

  componentWillReceiveProps(nextProps){
      console.log(nextProps.user);
      
  }

  render() {
    return (
      <div>
      </div>
    );
  }
 }

 const mapStateToProps = (state) => {
     console.log(state , 'state*****');
     
  return {
    user: state.authReducers.user
    
}
}

 const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(Judge)
