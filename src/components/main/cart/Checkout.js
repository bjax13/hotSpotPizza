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


class Checkout extends Component {

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

                this._onHideUnderlay();
                let p = [];
                let s = [];

                for (var i = 0; i < this.props.cartItems.length; i++) {

                  if (this.props.cartItems[i].id[0] === 'p') {
                    p.push(this.props.cartItems[i].data.countID)
                  }else if (this.props.cartItems[i].id[0] === 's') {
                    s.push(this.props.cartItems[i].data.id)
                  }else {
                    console.log('IDError: ID does not start with p or s');
                  }
                }
                console.log(p.length);
                console.log(s.length);
                console.log(this.props.deleted.length);
                if (p.length + s.length > this.props.deleted.length ) {
                  console.log('api Called');
                  axios.post('http://10.100.0.98:8888/api/orders/', {
                      "total": this.props.totalCost,
                      "user": "dc6bb53d-2f23-4131-8ea4-a81a24063c0d",
                      "pizzas": p,
                      "sides": s,
                  })
                  .then((response)=> {
                    this.props.updateMain({totalCost: 0})
                    this.props.updateMain({cartItems: []})
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                }else {
                  console.log('no items in cart');
                }

                console.log('Checkout')
              }}>

              <View>
                <Text style={this.props.submitPizza ? styles.buttonPress : styles.button}>
                  Checkout
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
      totalCost: state.mainPage.totalCost,
      cartItems: state.mainPage.cartItems,
      deleted: state.mainPage.deleted,
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
    width: 100,

    color: '#F692A0',
    fontWeight: 'bold',
  },
  buttonPress: {
    paddingTop:10,
    height: 40,
    textAlign: 'center',
    width: 100,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(Checkout)
