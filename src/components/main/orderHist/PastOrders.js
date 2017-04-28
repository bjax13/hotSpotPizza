import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import { Actions } from 'react-native-router-flux'
import CheckBox from 'react-native-checkbox';
import axios from 'axios';
import moment from 'moment';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Modal,
} from 'react-native'

class OrderHistory extends Component {


    render() {

        let pastOrders = this.props.orderHistoryArray
          .filter((order)=> order.user === this.props.user.id)
          .sort((a,b)=>b.id - a.id)
          .map( (orderObj, i) => {
            let historyLineItemPizza = orderObj.pizzas
              .map((pizzaInfo, i) =>{

              let pizzaSize = this.props.pizzaSizeNameArray[this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].pizza].size -1]
              let pizzaToppingCount = this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].pizza].toppings.length
              let secondaryName = pizzaSize + ' ' + pizzaToppingCount  + ' Topping Pizza'
              let itemName = (this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].pizza].name || secondaryName )
              let singleItemPrice = this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].pizza].price
              let itemCount = this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].count
              let itemTotal = singleItemPrice*itemCount;

              return(
                <View key={itemName+i}style={styles.row}>
                  <Text style={{flex:10}}>{itemName} </Text>
                  <Text style={{flex:4 , textAlign: 'right'}}>${singleItemPrice} x {itemCount} = </Text>
                  <Text style={{flex:2.5, textAlign: 'right'}}>${itemTotal.toFixed(2)}</Text>
                </View>
              )
            })

            let historyLineItemSides = orderObj.sides.map((sidesInfo, i) =>{

              let itemName = (this.props.orderHistorySidesObject[this.props.orderHistorySidesCountObject[orderObj.sides[i]].side].name || 'Unknown' )
              let singleItemPrice = this.props.orderHistorySidesObject[this.props.orderHistorySidesCountObject[orderObj.sides[i]].side].price
              let itemCount = this.props.orderHistorySidesCountObject[orderObj.sides[i]].count
              let itemTotal = singleItemPrice*itemCount;

              return(
                <View key={itemName+i} style={styles.row}>
                    <Text style={{flex:10}}>{itemName} </Text>

                    <Text style={{flex:4, textAlign: 'right'}}>${singleItemPrice} x {itemCount} = </Text>
                    <Text style={{flex:2.5, textAlign: 'right'}}>${itemTotal.toFixed(2)}</Text>

                </View>
              )
            })



              return (
                <View key={orderObj.id} style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                  <TouchableHighlight
                    onPress={()=>{
                      arr = this.props.orderHistoryArray;
                      arr[i].modalVisible = true;
                      this.props.updateMain({orderHistoryArray: arr})
                      this.forceUpdate()
                    }}
                    style={{flex:1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                      <Text style={[styles.instructions,{flex:10}]}>{moment(orderObj.created_at).format('MMM Do')}  # {orderObj.id}</Text>
                      <Text style={[styles.instructions,{flex:5}]}>{"$"+parseFloat(orderObj.total).toFixed(2)}</Text>
                      <Text style={[styles.instructions,{flex:4}]}>Details ></Text>
                    </View>
                  </TouchableHighlight>
                  <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={orderObj.modalVisible || false}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                      <View style={{marginTop: 22, flex: 1}}>
                        <View style={{margin: 5, flex:1}}>
                          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7d9de'}}>
                            <Text style= {{fontWeight: '600'}}>Order Detail</Text>
                          </View>

                          <TouchableHighlight
                            style={{position: 'absolute', right: 20 , top: 20 }}
                            onPress={() => {
                              arr = this.props.orderHistoryArray;
                              for (var j = 0; j < arr.length; j++) {
                                if (arr[j].id === orderObj.id) {
                                  arr[j].modalVisible = false;
                                }
                              }

                              this.props.updateMain({orderHistoryArray: arr})
                              this.forceUpdate()
                            }}>
                            <Text style={{fontWeight: '900', color: 'gray'}}>X</Text>
                          </TouchableHighlight>

                          <View style={{flex:9.5}}>

                            <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                            </View>
                            <View >
                              <Text style={styles.welcome}>
                                Order Summary
                              </Text>
                            </View>
                            <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                            </View>
                            <View style={{flex:.2}}>
                              <View style={styles.row}>
                                <Text>No. Items: {orderObj.pizzas.length + orderObj.sides.length}</Text>
                                <Text>${orderObj.total}</Text>
                              </View>
                              <View style={styles.row}>
                                <Text>{moment(orderObj.created_at).format('MMM Do')}</Text>
                                <Text>{moment(orderObj.created_at).format('h:mm a')}</Text>
                              </View>
                            </View>
                            <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                            </View>
                            <View style={{flex:1}}>

                              {historyLineItemPizza}
                              {historyLineItemSides}

                            </View>

                            <View style={{flex:.11}}>
                              <TouchableHighlight
                                onPress={()=>
                                  {
                                    for (var i = 0; i < orderObj.pizzas.length; i++) {
                                      let pizzaObj = {
                                        type: 'Pizza',
                                        data: {
                                          countID: orderObj.pizzas[i],
                                        }
                                      }
                                      pizzaObj.data.count = this.props.orderHistoryPizzaCountObject[pizzaObj.data.countID].count
                                      pizzaObj.data.id = this.props.orderHistoryPizzaCountObject[pizzaObj.data.countID].pizza

                                      pizzaObj.data.crust = this.props.orderHistoryPizzaObject[pizzaObj.data.id].crust
                                      pizzaObj.data.name = this.props.orderHistoryPizzaObject[pizzaObj.data.id].name
                                      pizzaObj.data.price = this.props.orderHistoryPizzaObject[pizzaObj.data.id].price
                                      pizzaObj.data.public_display = this.props.orderHistoryPizzaObject[pizzaObj.data.id].public_display
                                      pizzaObj.data.size = this.props.orderHistoryPizzaObject[pizzaObj.data.id].size
                                      pizzaObj.data.toppings = this.props.orderHistoryPizzaObject[pizzaObj.data.id].toppings

                                      pizzaObj.id = pizzaObj.type[0].toLowerCase() + pizzaObj.data.id


                                      let currentCart = this.props.cartItems;
                                      currentCart.push(pizzaObj)
                                      this.props.updateMain({cartItems: currentCart})
                                    }

                                    for (var i = 0; i < orderObj.sides.length; i++) {
                                      let sideObj = {
                                        id: orderObj.sides[i],
                                        type: 'Side',
                                        data: {
                                          id: orderObj.sides[i],
                                        }
                                      }
                                      sideObj.data.count = this.props.orderHistorySidesCountObject[sideObj.data.id].count
                                      sideObj.data.side = this.props.orderHistorySidesCountObject[sideObj.data.id].side

                                      sideObj.data.price = this.props.orderHistorySidesObject[sideObj.data.side].price
                                      sideObj.data.name = this.props.orderHistorySidesObject[sideObj.data.side].name

                                      sideObj.id = sideObj.type[0].toLowerCase() + sideObj.data.id

                                      let currentCart = this.props.cartItems;
                                      currentCart.push(sideObj)
                                      this.props.updateMain({cartItems: currentCart})
                                    }

                                    orderObj.modalVisible = false;
                                    this.forceUpdate();
                                    let addTotal = this.props.totalCost;
                                    addTotal+= parseFloat(orderObj.total)
                                    this.props.updateMain({totalCost: addTotal})

                                    Actions.Cart();
                                  }
                                }

                                >
                                <View>
                                  <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                                  </View>
                                  <View >
                                    <Text style={styles.welcome}>
                                      Re-Order
                                    </Text>
                                  </View>
                                  <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                                  </View>
                                </View>
                              </TouchableHighlight>
                            </View>


                          </View>
                        </View>
                       </View>
                  </Modal>
                </View>
              );
          });

        return (
            <View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>
              <View >
                <Text style={styles.welcome}>
                  Orders
                </Text>
              </View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>

              {pastOrders}
            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaTest: state.mainPage.pizzaTest,
      user: state.mainPage.user,

      pizzaSizeNameArray: state.mainPage.pizzaSizeNameArray,

      orderHistoryPageCount: state.mainPage.orderHistoryPageCount,
      orderHistoryArray: state.mainPage.orderHistoryArray,
      orderHistoryModal: state.mainPage.orderHistoryModal,
      orderHistoryPizzaCountObject: state.mainPage.orderHistoryPizzaCountObject,
      orderHistoryPizzaObject: state.mainPage.orderHistoryPizzaObject,
      orderHistoryToppingObject: state.mainPageorderHistoryToppingObject,

      orderHistorySidesCountObject: state.mainPage.orderHistorySidesCountObject,
      orderHistorySidesObject: state.mainPage.orderHistorySidesObject,

      pizzaSidesArray: state.mainPage.pizzaSidesArray,

      cartItems: state.mainPage.cartItems,
      totalCost: state.mainPage.totalCost,
    }
}

const mapDispatchToActionCreators = {
    updateMain: updateMain
};

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:5,
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
  optionTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    textAlign: 'left',
    margin: 10,
  },
  instructions: {
    fontSize: 17,
    color: '#333333',
    marginBottom: 5,
    marginTop: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(OrderHistory)
