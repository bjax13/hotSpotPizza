import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';


import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,

} from 'react-native'


class AddToOrder extends Component {

    _onSubmit(){
      console.log('clicked-submit')
    }
    _onHideUnderlay(){
      this.props.updateMain({ submitPizza: false });
    }
    _onShowUnderlay(){
      this.props.updateMain({ submitPizza: true });
    }

    render() {
        return (
          <View style={styles.container}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor= {'transparent'}
              style={ this.props.submitPizza ? styles.buttonPress2 : styles.button2 }
              onHideUnderlay={this._onHideUnderlay.bind(this)}
              onShowUnderlay={this._onShowUnderlay.bind(this)}
              onPress={this._onSubmit}>

              <View>
                <Text style={this.props.submitPizza ? styles.buttonPress : styles.button}>
                  Submit
                </Text>
              </View>
            </TouchableHighlight>

          </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaTest: state.mainPage.pizzaTest,
      submitPizza: state.mainPage.submitPizza,
      totalCost: state.mainPage.totalCost,

    }
}

const mapDispatchToActionCreators = {
    updateMain: updateMain
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingTop:10,
    height: 40,
    textAlign: 'center',
    width: 130,

    color: '#F692A0',
    fontWeight: 'bold',
  },
  buttonPress: {
    paddingTop:10,
    height: 40,
    textAlign: 'center',
    width: 130,
    color: '#CCC',
    fontWeight: 'bold',
  },
  button2: {
    borderColor: '#F692A0',
    borderWidth: 2,
    borderRadius: 20,
  },
  buttonPress2: {
    borderColor: '#CCC',
    borderWidth: 2,
    borderRadius: 20,
  },


});

export default connect(mapStateToProps, mapDispatchToActionCreators)(AddToOrder)
