import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../actions/updateSettingsPageActions';


import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Navigator
} from 'react-native'

const onMakePizza = () => {
  
  console.log('Button has been pressed!');
};

class Main extends Component {

    render() {
        return (
          <View style={{flex:1}}>
                <View style={styles.container}>

                  <View style={styles.circle}>
                    <Image
                      style={{width: 141, height: 141 , alignItems: 'center'}}
                      source={{uri: 'https://www.48hourslogo.com/48hourslogo_data/2014/09/09/201409090947415741.png'}}/>
                  </View>

                    {/* ----- Start Settings Components ----  */}
                    <View style={styles.container}>
                      <Text style={styles.welcome}>
                        Welcome to Hot Spot Pizza!
                      </Text>
                      <Text style={styles.instructions}>
                        Get Started by building your Pizza below
                      </Text>
                      <Button
                        onPress={onMakePizza}
                        title='Make A Pizza!'
                        color = "#BB070C"
                        accessibilityLabel="Make a Pizza"/>
                    </View>

                    {/* ----- End Settings Components ----  */}
                </View>
            </View>
        )
    }
}

mapStateToProps = (state) => {
  console.log(state);
    return {
      testVal: state.settingsPage.testVal,
      testVal1: state.mainPage.testVal1,
    }
}

const mapDispatchToActionCreators = {
    updateSettings: updateSettings
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
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(Main)
