import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import firebase from '../../config/Firebase'
import swal from 'sweetalert2';
import History from '../../History/History';
import img from '../../Image/pic4.jpg'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: true,
      anchorEl: null,
    };

    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    const currentUID = localStorage.getItem('currentUserUid')
    firebase.database().ref('user/' + currentUID ).on("child_added", (snapshot) => {
      console.log(snapshot.val());
      const pic = snapshot.val().userPic
      console.log(pic , '********');
      
      this.setState({ pic: pic })
    })
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  logOut = () => {
    console.log(this.props);

    History.push('/')
    firebase.auth().signOut()
      .then(function () {
        localStorage.clear()
        swal({
          position: 'center',
          type: 'success',
          title: 'You are successfully logout',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('logout***');
        setTimeout(() => {
        }, 1500)
      })
  }
  profile() {
    console.log('profile***');
    History.push('/Profile')
  }
  notification() {
    History.push('/notification')
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, pic } = this.state;
    const open = Boolean(anchorEl);
    console.log(pic , 'pic******');
    
    return (
      <div className={classes.root} style={{ color: 'black' }}>
        <FormGroup>
          {/* <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          /> */}
        </FormGroup>
        <AppBar position="static" style={{ backgroundColor: '#f50057' }}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />

            </IconButton>
            <Typography color="inherit" className={classes.grow}>

            </Typography>
            {auth && (
              <div>
                 <IconButton color="inherit" onClick={() => this.notification()}>
                {
                  // request.length > 0 ?
                    // <Badge color="secondary">
                    //   <NotificationsIcon />
                    // </Badge> :
                    // <Badge color="secondary" badgeContent={request && request.length}>
                    <NotificationsIcon />
                  // </Badge>
                }
              </IconButton>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <img src={pic} width="40" height="40" style={{ borderRadius: '100%' }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.profile()}>Profile</MenuItem>
                  <MenuItem onClick={() => this.notification()}>Notification</MenuItem>

                  <MenuItem onClick={this.logOut}>Log out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);