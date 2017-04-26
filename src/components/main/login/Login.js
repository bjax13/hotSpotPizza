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
                        onLogin={function(data){
                          console.log("Logged in!");
                          console.log(data);
                          _this.setState({ user : data.credentials });
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
      orderHistoryPageCount: state.mainPage.orderHistoryPageCount,
      orderHistoryArray: state.mainPage.orderHistoryArray,
      orderHistoryModal: state.mainPage.orderHistoryModal,
      orderHistoryPizzaCountObject: state.mainPage.orderHistoryPizzaCountObject,
      orderHistoryPizzaObject: state.mainPage.orderHistoryPizzaObject,
      orderHistoryToppingObject: state.mainPageorderHistoryToppingObject,

      orderHistorySidesCountObject: state.mainPage.orderHistorySidesCountObject,
      orderHistorySidesObject: state.mainPage.orderHistorySidesObject,
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
