import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../actions/updateSettingsPageActions';


import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native'

class Main extends Component {
    render() {

        return (

          <View>

            <ScrollView>
                <View style={styles.container}>

                    {/* ----- Start Settings Components ----  */}
                    <View style={styles.container}>
                      <Text style={styles.welcome}>
                        Welcome to Main Page!
                      </Text>
                      <Text style={styles.instructions}>
                        To get started, Do stuve
                      </Text>
                      <Text style={styles.instructions}>
                        {this.props.testVal}
                        {this.props.testVal1}
                      </Text>
                    </View>

                    {/* ----- End Settings Components ----  */}
                </View>
            </ScrollView>
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
