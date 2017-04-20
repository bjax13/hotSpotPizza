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

        let pastOrders = this.props.orderHistoryArray.sort((a,b)=>{return b.id - a.id}).map( (orderObj, i) => {
          // let pizzaSize = this.props.pizzaSizeNameArray[this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[0]].pizza].size -1]
          // let pizzaToppingCount = this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[0]].pizza].toppings.length
          // let secondaryName = pizzaSize + ' ' + pizzaToppingCount  + ' Topping Pizza'
          // let itemName = (this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[0]].pizza].name || secondaryName )
          // let singleItemPrice = this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[0]].pizza].price
          // let itemCount = this.props.orderHistoryPizzaCountObject[orderObj.pizzas[0]].count
          // let itemTotal = singleItemPrice*itemCount;

          let historyLineItemPizza = orderObj.pizzas.map((pizzaInfo, i) =>{

            let pizzaSize = this.props.pizzaSizeNameArray[this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].pizza].size -1]
            let pizzaToppingCount = this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].pizza].toppings.length
            let secondaryName = pizzaSize + ' ' + pizzaToppingCount  + ' Topping Pizza'
            let itemName = (this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].pizza].name || secondaryName )
            let singleItemPrice = this.props.orderHistoryPizzaObject[this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].pizza].price
            let itemCount = this.props.orderHistoryPizzaCountObject[orderObj.pizzas[i]].count
            let itemTotal = singleItemPrice*itemCount;

            return(
              <View key={itemName+i}style={styles.row}>
                <Text>{itemName} </Text>

                <Text>${singleItemPrice}</Text>
                <Text>{itemCount}</Text>
                <Text>${itemTotal}</Text>
              </View>
            )
          })
          let historyLineItemSides = orderObj.sides.map((sidesInfo, i) =>{

            let itemName = (this.props.orderHistorySidesObject[this.props.orderHistorySidesCountObject[orderObj.sides[i]].side].name || 'Unknown' )
            let singleItemPrice = this.props.orderHistorySidesObject[this.props.orderHistorySidesCountObject[orderObj.sides[i]].side].price
            let itemCount = this.props.orderHistorySidesCountObject[orderObj.sides[i]].count
            let itemTotal = singleItemPrice*itemCount;

            return(
              <View key={itemName+i}style={styles.row}>
                <Text>{itemName} </Text>

                <Text>${singleItemPrice}</Text>
                <Text>{itemCount}</Text>
                <Text>${itemTotal}</Text>
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
                            arr[i].modalVisible = false;
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
      pizzaSizeNameArray: state.mainPage.pizzaSizeNameArray,

      orderHistoryPageCount: state.mainPage.orderHistoryPageCount,
      orderHistoryArray: state.mainPage.orderHistoryArray,
      orderHistoryModal: state.mainPage.orderHistoryModal,
      orderHistoryPizzaCountObject: state.mainPage.orderHistoryPizzaCountObject,
      orderHistoryPizzaObject: state.mainPage.orderHistoryPizzaObject,
      orderHistoryToppingObject: state.mainPageorderHistoryToppingObject,

      orderHistorySidesCountObject: state.mainPage.orderHistorySidesCountObject,
      orderHistorySidesObject: state.mainPage.orderHistorySidesObject,
    }
}

const mapDispatchToActionCreators = {
    updateMain: updateMain
};

const styles = StyleSheet.create({
  row:{
    flex:1,
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
