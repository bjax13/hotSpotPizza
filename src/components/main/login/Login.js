import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../../actions/updateSettingsPageActions';
import {updateMain} from '../../../actions/updateMainPageActions';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login'
import {Actions} from 'react-native-router-flux'
import axios from 'axios';

import LoginButton from './LoginButton'

import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native'

class Login extends Component {

  render() {
    var _this = this;
    var _Actions = Actions;
    return (
      <View style={{
        flex: 1
      }}>
        <Image
          source={require('../../../../imgs/outOfTheOven.jpg')}
          style={styles.containerImg}>
          <View style={styles.container}>
            <View style={{backgroundColor: '#F5FCFF', borderRadius: 5, margin: 5}}>
              <Text style={styles.welcome}>
                Welcome to Hot Spot Pizza!
              </Text>
              <Text style={styles.instructions}>
                Get Started by Loging In with Facebook
              </Text>
            </View>

            <LoginButton></LoginButton>

            <TouchableHighlight onPress= {()=>{
               _this.props.updateMain({
                 user: {
                   "id": "ebdb2707-7d05-46e3-a853-24d8ec5cda9d",
                   "last_login": "2017-04-19T21:12:24.286538Z",
                   "email": "a@a.com", "first_name": "",
                   "last_name": "", "image": null,
                   "preferred_name": "",
                   "gender": null,
                   "birthdate": null,
                   "phone": "",
                   "date_joined": "2017-04-04T17:19:47.218582Z",
                   "is_developer": false }});
                   _this.props.updateMain({loginModal:false}) }}>
              <View>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text style={styles.dummyData}>
                  Login with Dummy Data
                </Text>
                {/* <FBLogin /> */}
              </View>

            </TouchableHighlight>

          </View>
        </Image>
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
    // backgroundColor: '#F5FCFF'
  },
  containerImg: {
    flex: 6,
    width: null,
    height: null,
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
  },
  dummyData: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5
  },
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(Login)
