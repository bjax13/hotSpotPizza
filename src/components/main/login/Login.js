import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login'

import { Actions } from 'react-native-router-flux'

import axios from 'axios';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native'


class Login extends Component {

    render() {
      var _this = this;
        return (
          <View style={{flex:1}}>
                <View style={styles.container}>


                    <View style={styles.container}>
                      <Text style={styles.welcome}>
                        Welcome to Hot Spot Pizza!
                      </Text>
                      <Text style={styles.instructions}>
                        Get Started by Loging In
                      </Text>


                      <FBLogin style={{ marginBottom: 10, }}
                        ref={(fbLogin) => { this.fbLogin = fbLogin }}
                        permissions={["email","user_friends"]}
                        loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        onLogin={(data)=>{
                          console.log("Logged in!");
                          this.props.updateMain({userCredentials: data.credentials});

                          axios.get('http://10.100.0.98:8888/social/facebook?access_token='+data.credentials.token)
                            .then(function (response) {
                              console.log(response.data);

                              let userObj = {
                                id: response.data.id,
                              }

                              _this.props.updateMain({user: userObj})

                              console.log(userObj.id);
                              console.log(response.data.token);

                              axios({
                                method: 'get',
                                url: 'http://10.100.0.98:8888/api/users/'+userObj.id + '/',
                                headers: {
                                  "Authorization": 'Token '+response.data.token
                                },
                              }).then((response)=>{
                                  console.log(response);
                                  _this.props.updateMain({user:response.data})
                                  console.log(_this.props.user);
                                })
                                .catch((error)=>{
                                  console.log(error);
                                })

                            })
                            .catch(function (error) {
                              console.log(error);
                            });

                        }}
                        onLogout={function(){
                          console.log("Logged out.");
                          _this.setState({ user : null });
                        }}
                        onLoginFound={function(data){
                          console.log("Existing login found.");
                          console.log(data);
                          _this.setState({ user : data.credentials });
                        }}
                        onLoginNotFound={function(){
                          console.log("No user logged in.");
                          _this.setState({ user : null });
                        }}
                        onError={function(data){
                          console.log("ERROR");
                          console.log(data);
                        }}
                        onCancel={function(){
                          console.log("User cancelled.");
                        }}
                        onPermissionsMissing={function(data){
                          console.log("Check permissions!");
                          console.log(data);
                        }}
                      />


                      <TouchableHighlight
                        onPress = {Actions.Main}>
                        <View>
                          <Text></Text>
                          <Text></Text>
                          <Text></Text>
                          <Text></Text>
                          <Text style={styles.instructions}>
                            Login
                          </Text>
                          {/* <FBLogin /> */}
                        </View>

                      </TouchableHighlight>

                    </View>
                </View>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
      user: state.mainPage.user,
      userCredentials: state.mainPage.userCredentials,
      pizzaSauceArray: state.mainPage.pizzaSauceArray,

    }
}

const mapDispatchToActionCreators = {
    updateMain: updateMain
};

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(Login)
