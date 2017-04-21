import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import axios from 'axios';
import { Actions } from 'react-native-router-flux'

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,

} from 'react-native'


class Checkout extends Component {

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
                let skiped = 0;

                for (var i = 0; i < this.props.cartItems.length; i++) {
                  console.log(this.props.deleted);
                  console.log(this.props.cartItems);
                  console.log(this.props.deleted.indexOf(this.props.cartItems[i].id) === -1);
                  console.log(this.props.cartItems[i].id[0] === 'p');

                  if (this.props.cartItems[i].id[0] === 'p' && this.props.deleted.indexOf(this.props.cartItems[i].id) === -1) {
                    p.push(this.props.cartItems[i].data.countID)
                    console.log('pushed');
                  }else if (this.props.cartItems[i].id[0] === 's' && this.props.deleted.indexOf(this.props.cartItems[i].id) === -1) {
                    s.push(this.props.cartItems[i].data.id)
                  }else {
                    console.log('IDError: ID does not start with p or s or was deleted');
                    skiped++;
                  }
                }
                console.log(p);
                if (p.length + s.length + skiped > this.props.deleted.length ) {
                  axios.post('http://10.100.0.98:8888/api/orders/', {
                      "total": this.props.totalCost,
                      "user": "dc6bb53d-2f23-4131-8ea4-a81a24063c0d",
                      "pizzas": p,
                      "sides": s,
                  })
                  .then((response)=> {


                    for (var i = 0; i < p.length; i++) {
                      if (!this.props.orderHistoryPizzaCountObject.hasOwnProperty(p[i])) {

                        let newPizzaHistCntObj = this.props.orderHistoryPizzaCountObject
                        let newPizzaHistObj = this.props.orderHistoryPizzaObject
                        newPizzaHistCntObj[p[i]] = {
                          id: p[i],
                        }

                        for (var j = 0; j < this.props.cartItems.length; j++) {
                          if (this.props.cartItems[j].data.countID === p[i]) {
                            newPizzaHistCntObj[p[i]].count = this.props.cartItems[j].data.count;
                            newPizzaHistCntObj[p[i]].pizza = this.props.cartItems[j].data.id;

                            this.props.updateMain({orderHistoryPizzaCountObject: newPizzaHistCntObj})

                            newPizzaHistObj[newPizzaHistCntObj[p[i]].pizza] = {
                              crust: this.props.cartItems[j].data.crust,
                              id: newPizzaHistCntObj[p[i]].pizza,
                              name: this.props.cartItems[j].data.name,
                              price: this.props.cartItems[j].data.price,
                              public_display: this.props.cartItems[j].data.public_display,
                              size: this.props.cartItems[j].data.size,
                              toppings: this.props.cartItems[j].data.toppings ,
                            }
                            j = this.props.cartItems.length;
                          }
                        }
                      }
                    }
                    for (var i = 0; i < s.length; i++) {
                      if (!this.props.orderHistorySidesCountObject.hasOwnProperty(s[i])) {
                        console.log(s[i]);
                        let newSidesHistCntObj = this.props.orderHistorySidesCountObject

                        newSidesHistCntObj[s[i]] = {
                          id: s[i],
                        }

                        for (var j = 0; j < this.props.cartItems.length; j++) {
                          if (this.props.cartItems[j].data.id === s[i]) {
                            newSidesHistCntObj[s[i]].count = this.props.cartItems[j].data.count;
                            newSidesHistCntObj[s[i]].side = this.props.cartItems[j].data.side;
                            j = this.props.cartItems.length;
                            this.props.updateMain({orderHistorySidesCountObject: newSidesHistCntObj})
                          }
                        }
                      }
                    }




                    this.props.updateMain({totalCost: 0})
                    this.props.updateMain({cartItems: []})
                    Actions.Main();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                }else {
                  console.log('no items in cart');
                }
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
      totalCost: state.mainPage.totalCost,
      cartItems: state.mainPage.cartItems,
      deleted: state.mainPage.deleted,
      submitPizza: state.mainPage.submitPizza,

      orderHistorySidesCountObject: state.mainPage.orderHistorySidesCountObject,
      orderHistorySidesObject: state.mainPage.orderHistorySidesObject,
      orderHistoryPizzaCountObject: state.mainPage.orderHistoryPizzaCountObject,
      orderHistoryPizzaObject: state.mainPage.orderHistoryPizzaObject,
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
