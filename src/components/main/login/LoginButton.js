import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../../actions/updateSettingsPageActions';
import {updateMain} from '../../../actions/updateMainPageActions';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login'

import {Actions} from 'react-native-router-flux'

import axios from 'axios';

import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native'

class LoginButton extends Component {

  render() {
    var _this = this;
    var _Actions = Actions;
    return (
      <View>
        <FBLogin style={{
          marginBottom: 10
        }} ref={(fbLogin) => {
          this.fbLogin = fbLogin
        }} permissions={["email", "user_friends"]} loginBehavior={FBLoginManager.LoginBehaviors.Native} onLogin={(data) => {
          _this.props.updateMain({userCredentials: data.credentials});
          axios.get('http://10.100.0.98:8888/social/facebook?access_token=' + data.credentials.token).then(function(response) {
            let userObj = {
              id: response.data.id
            }
            _this.props.updateMain({user: userObj});
            axios({
              method: 'get',
              url: 'http://10.100.0.98:8888/api/users/' + userObj.id + '/',
              headers: {
                "Authorization": 'Token ' + response.data.token
              }
            }).then((response) => {
              _this.props.updateMain({user: response.data})
            }).catch((error) => {
              console.log(error);
            });
            _this.props.updateMain({loginModal: false});
          }).catch(function(error) {
            console.log(error);
          });
        }} onLogout={function() {
          _this.props.updateMain({loginModal: true});
          _this.props.updateMain({
            "id": "ebdb2707-7d05-46e3-a853-24d8ec5cda9d",
            "last_login": "2017-04-19T21:12:24.286538Z",
            "email": "a@a.com",
            "first_name": "",
            "last_name": "",
            "image": null,
            "preferred_name": "",
            "gender": null,
            "birthdate": null,
            "phone": "",
            "date_joined": "2017-04-04T17:19:47.218582Z",
            "is_developer": false
          });
        }} onLoginFound={function(data) {
          _this.props.updateMain({userCredentials: data.credentials});
          axios.get('http://10.100.0.98:8888/social/facebook?access_token=' + data.credentials.token).then(function(response) {
            let userObj = {
              id: response.data.id
            }
            _this.props.updateMain({user: userObj});
            axios({
              method: 'get',
              url: 'http://10.100.0.98:8888/api/users/' + userObj.id + '/',
              headers: {
                "Authorization": 'Token ' + response.data.token
              }
            }).then((response) => {
              _this.props.updateMain({user: response.data});
            }).catch((error) => {
              console.log(error);
            });
            _this.props.updateMain({loginModal: false});
          }).catch(function(error) {
            console.log(error);
          });
        }} onLoginNotFound={function() {
          _this.setState({user: null});
        }} onError={function(data) {
          console.log("ERROR");
          console.log(data);
        }} onCancel={function() {
          console.log("User cancelled.");
        }} onPermissionsMissing={function(data) {
          console.log("Check permissions!");
          console.log(data);
        }}/>
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {loginModal: state.mainPage.loginModal, user: state.mainPage.user, userCredentials: state.mainPage.userCredentials, pizzaSauceArray: state.mainPage.pizzaSauceArray}
}

const mapDispatchToActionCreators = {
  updateMain: updateMain
};

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(LoginButton)
