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
      addPizzasToOrder = ()=>{
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
          response.data.count = this.props.pizzaQuantity;
          total += this.props.pizzaCost;
          this.props.updateMain({totalCost: total})

          currentCart.push({id: 'p'+response.data.id , type: 'Pizza', data: response.data})

          this.props.updateMain({cartItems: currentCart})

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
      addSidesToOrder = ()=>{
        let last = 0
        for (var i = 0; i < this.props.customSidesArr.length; i++) {


          if (this.props.pizzaSidesArray[this.props.customSidesArr[i]-1].count > 0) {
            last++;
            axios.post('http://10.100.0.98:8888/api/side-counts/', {
                "count": this.props.pizzaSidesArray[this.props.customSidesArr[i]-1].count,
                "side": this.props.customSidesArr[i],
            })
            .then((response)=> {
              last--;
              let currentCart = this.props.cartItems;
              let total = this.props.totalCost;
              let data = response.data;
              data.name = this.props.pizzaSidesArray[response.data.side-1].name
              data.price = this.props.pizzaSidesArray[response.data.side-1].price

              currentCart.push({id: 's'+response.data.id , type: 'Side', data: response.data})

              this.props.updateMain({cartItems: currentCart})


              if (last === 0) {
                total += this.props.sidesCost;
                this.props.updateMain({totalCost: total})
                this.props.updateMain({ makeSideModalVisible: !this.props.makeSideModalVisible});
                this.props.updateMain({ makeCartModalVisible: true});

                this.props.updateMain({
                  customToppingArr: [],
                  customSidesArr: [],
                  sidesCost: 0,
                  totalSidesCost: 0,
                  totalToppingsCost: 0,
                })
              }

            })
            .catch(function (error) {
              console.log(error);
            });
          }
        }
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
                  addPizzasToOrder();
                }else if (this.props.type === 'sides') {
                  addSidesToOrder();
                }else {
                  console.log('You need to specify a correct type ex: pizzas or sides');
                }
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
      totalCost: state.mainPage.totalCost,

      pizzaTest: state.mainPage.pizzaTest,
      pizzaCost: state.mainPage.pizzaCost,
      pizzaSize: state.mainPage.pizzaSize,
      pizzaCrust: state.mainPage.pizzaCrust,
      submitPizza: state.mainPage.submitPizza,
      pizzaQuantity: state.mainPage.pizzaQuantity,
      customToppingArr: state.mainPage.customToppingArr,
      pizzaToppingArray: state.mainPage.pizzaToppingArray,
      makePizzaModalVisible: state.mainPage.makePizzaModalVisible,

      sidesCost: state.mainPage.sidesCost,
      totalSidesCost: state.mainPage.totalSidesCost,
      pizzaSidesArray: state.mainPage.pizzaSidesArray,
      customSidesArr: state.mainPage.customSidesArr,
      makeSideModalVisible: state.mainPage.makeSideModalVisible,

      cartItems: state.mainPage.cartItems,

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
