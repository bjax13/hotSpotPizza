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
      addPizzas = ()=>{
        axios.post('http://10.100.0.98:8888/api/pizzas/', {
          "price": (this.props.pizzaCost/this.props.pizzaQuantity).toFixed(2).toString(),
          "public_display": false,
          "size": this.props.pizzaSize[2],
          "crust": this.props.pizzaCrust[2],
          "toppings": this.props.customToppingArr
        })
        .then((response)=> {
          let currentCart = this.props.cartItems;
          let total = this.props.totalCost;
          total += this.props.pizzaCost;
          this.props.updateMain({totalCost: total})

          currentCart.push({id: response.data.id , type: 'Pizza', data: response.data})

          this.props.updateMain({cartItems: currentCart})
          console.log(currentCart);

          this.props.updateMain({ makePizzaModalVisible: !this.props.makePizzaModalVisible});
          this.props.updateMain({ makeCartModalVisible: !this.props.makeCartModalVisible});
          this.props.updateMain({
            customToppingArr: [],
            pizzaCost: 0,
            totalToppingsCost: 0,
          })

        })
        .catch(function (error) {
          console.log(error);
        });
      }
      addSides = ()=>{
        console.log('you added da sides yo!');
      }

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

                if (this.props.type === 'pizzas') {
                  addPizzas();
                }else if (this.props.type === 'sides') {
                  addSides();
                }else {
                  console.log('You need to specify a correct type ex: pizzas or sides');
                }
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
      totalCost: state.mainPage.totalCost,
      cartItems: state.mainPage.cartItems,
      pizzaCost: state.mainPage.pizzaCost,
      customToppingArr: state.mainPage.customToppingArr,
      pizzaSize: state.mainPage.pizzaSize,
      pizzaCrust: state.mainPage.pizzaCrust,
      pizzaQuantity: state.mainPage.pizzaQuantity,
      submitPizza: state.mainPage.submitPizza,
      totalCost: state.mainPage.totalCost,
      pizzaToppingArray: state.mainPage.pizzaToppingArray,
      makePizzaModalVisible: state.mainPage.makePizzaModalVisible

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
