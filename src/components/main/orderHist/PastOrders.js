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
  componentDidMount(){
    this.props.updateMain({orderHistoryPageCount: 0})
    axios.get('http://10.100.0.98:8888/api/orders/')
      .then((response) => {
        this.props.updateMain({orderHistoryPageCount: this.props.orderHistoryPageCount+ response.data.results.length})
        let orderCount = response.data.count
        let resultsPerPage = response.data.results.length
        let pages = Math.ceil(orderCount / resultsPerPage);
        let pageURL = response.data.next;

        if (pageURL.indexOf('=') != -1) {
          pageURL = pageURL.slice(0,pageURL.indexOf('=')+1)
        }

        this.props.updateMain({orderHistoryArray: response.data.results});

        for (var i = 2; i <= pages; i++) {
          axios.get(pageURL+i)
            .then((response)=>{
              this.props.updateMain({orderHistoryPageCount: this.props.orderHistoryPageCount+ response.data.results.length})
              this.props.updateMain({orderHistoryArray: this.props.orderHistoryArray.concat(response.data.results)})
              console.log(this.props.orderHistoryPageCount);
              if (this.props.orderHistoryPageCount === response.data.count) {
                let arr = []
                for (var i = 0; i < this.props.orderHistoryArray.length; i++) {
                  this.props.orderHistoryArray[i].modalVisible = false;
                  arr.push(this.props.orderHistoryArray[i])
                }
                this.props.updateMain({orderHistoryArray: arr})
                for (var i = 0; i < arr.length; i++) {
                  console.log(arr[i]);
                  if (arr[i].pizzas.length>0) {
                    console.log(i + 'Pizza');
                    for (var j = 0; j < arr[i].pizzas.length; j++) {
                      console.log(arr[i].pizzas[j]);
                      axios.get('http://10.100.0.98:8888/api/pizza-counts/'+arr[i].pizzas[j])
                        .then((response)=>{
                          let obj = this.props.orderHistoryPizzaCountObject;
                          obj[response.data.id] = response.data;
                          this.props.updateMain({orderHistoryPizzaCountObject:obj})
                          console.log('pizza-count');
                          console.log(response);
                          axios.get('http://10.100.0.98:8888/api/pizzas/'+ response.data.pizza)
                            .then((response)=>{
                              let obj = this.props.orderHistoryPizzaObject;
                              obj[response.data.id] = response.data;
                              this.props.updateMain({orderHistoryPizzaObject:obj})
                              console.log('pizza');
                              console.log(response);
                              console.log(this.props.orderHistoryPizzaCountObject);
                              console.log(this.props.orderHistoryPizzaObject);
                            })
                        })
                    }
                  }
                  if (arr[i].sides.length>0) {
                    console.log(i + 'side');
                    for (var j = 0; j < arr[i].sides.length; j++) {
                      axios.get('http://10.100.0.98:8888/api/side-counts/'+arr[i].sides[j])
                        .then((response)=>{
                          // console.log('sides');
                          // console.log(response);
                        })
                    }
                  }

                }
              }
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

    render() {

        let pastOrders = this.props.orderHistoryArray.sort((a,b)=>{return b.id - a.id}).map( (orderObj, i) => {

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


                            <View style={styles.row}>
                              <Text>Line Item {this.props.orderHistoryPizzaCountObject[orderObj.pizzas[0]].count} </Text>

                              <Text>Cost 4 1</Text>
                              <Text>#ordered</Text>
                              <Text>Total</Text>
                            </View>
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
      orderHistoryPageCount: state.mainPage.orderHistoryPageCount,
      orderHistoryArray: state.mainPage.orderHistoryArray,
      orderHistoryModal: state.mainPage.orderHistoryModal,
      orderHistoryPizzaCountObject: state.mainPage.orderHistoryPizzaCountObject,
      orderHistoryPizzaObject: state.mainPage.orderHistoryPizzaObject,
      orderHistoryToppingObject: state.mainPageorderHistoryToppingObject,
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
