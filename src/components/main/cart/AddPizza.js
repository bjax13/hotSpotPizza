import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../../actions/updateSettingsPageActions';
import {updateMain} from '../../../actions/updateMainPageActions';

import {Actions} from 'react-native-router-flux'

import {StyleSheet, Text, View, TouchableHighlight} from 'react-native'

class AddPizza extends Component {

  _onHideUnderlay() {
    this.props.updateMain({submitPizza: false});
  }
  _onShowUnderlay() {
    this.props.updateMain({submitPizza: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight activeOpacity={1} underlayColor={'transparent'} style={this.props.submitPizza
          ? styles.buttonPress2
          : styles.button2} onHideUnderlay={this._onHideUnderlay.bind(this)} onShowUnderlay={this._onShowUnderlay.bind(this)} onPress={() => {
          this._onHideUnderlay();
          Actions.MakePizza();
        }}>

          <View>
            <Text style={this.props.submitPizza
              ? styles.buttonPress
              : styles.button}>
              Add Pizza
            </Text>
          </View>
        </TouchableHighlight>

      </View>

    )
  }
}

mapStateToProps = (state) => {
  return {submitPizza: state.mainPage.submitPizza}
}

const mapDispatchToActionCreators = {
  updateMain: updateMain
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingTop: 10,
    height: 40,
    textAlign: 'center',
    width: 100,

    color: '#F692A0',
    fontWeight: 'bold'
  },
  buttonPress: {
    paddingTop: 10,
    height: 40,
    textAlign: 'center',
    width: 100,
    color: '#CCC',
    fontWeight: 'bold'
  },
  button2: {
    borderColor: '#F692A0',
    borderWidth: 2,
    borderRadius: 20
  },
  buttonPress2: {
    borderColor: '#CCC',
    borderWidth: 2,
    borderRadius: 20
  }
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(AddPizza)
