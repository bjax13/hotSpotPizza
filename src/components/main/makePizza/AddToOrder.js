import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import axios from 'axios';

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
              onPress={()=>{
                console.log('Added Pizza')
                axios.post('http://10.100.0.98:8888/api/pizzas/', {
                  "price": (this.props.pizzaCost/this.props.pizzaQuantity).toFixed(2).toString(),
                  "public_display": false,
                  "size": this.props.pizzaSize[2],
                  "crust": this.props.pizzaCrust[2],
                  "toppings": this.props.customToppingArr
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
                // console.log({
                //   "price": (this.props.pizzaCost/this.props.pizzaQuantity).toFixed(2).toString(),
                //   "public_display": false,
                //   "size": this.props.pizzaSize[2],
                //   "crust": this.props.pizzaCrust[2],
                //   "toppings": this.props.customToppingArr
                // })
              }}>

              <View>
                <Text style={this.props.submitPizza ? styles.buttonPress : styles.button}>
                  Add to order
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
      pizzaCost: state.mainPage.pizzaCost,
      customToppingArr: state.mainPage.customToppingArr,
      pizzaSize: state.mainPage.pizzaSize,
      pizzaCrust: state.mainPage.pizzaCrust,
      pizzaQuantity: state.mainPage.pizzaQuantity,
      submitPizza: state.mainPage.submitPizza,
      totalCost: state.mainPage.totalCost,
      pizzaToppingArray: state.mainPage.pizzaToppingArray,

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
