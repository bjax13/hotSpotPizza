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
    axios.get('http://10.100.0.98:8888/api/orders/')
      .then((response) => {
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
              this.props.updateMain({orderHistoryArray: this.props.orderHistoryArray.concat(response.data.results)})
              if (i = pages) {
                let arr = []
                for (var i = 0; i < this.props.orderHistoryArray.length; i++) {
                  this.props.orderHistoryArray[i].modalVisible = false;
                  arr.push(this.props.orderHistoryArray[i])
                }
                this.props.updateMain({orderHistoryArray: arr})
              }
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

    render() {

        let pizzaToppings = this.props.orderHistoryArray.sort((a,b)=>{return b.id - a.id}).map( (orderObj, i) => {

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
                          <View style={{flex:1}}>
                            <View style={styles.row}>
                              <Text>Num Items</Text>
                              <Text>COST</Text>
                            </View>
                            <View style={styles.row}>
                              <Text>Date</Text>
                              <Text>Time</Text>
                            </View>
                          </View>
                          <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                          </View>
                          <View style={{flex:1}}>
                            <View style={styles.row}>
                              <Text>Line Item</Text>
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

              {pizzaToppings}
            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaTest: state.mainPage.pizzaTest,
      orderHistoryArray: state.mainPage.orderHistoryArray,
      orderHistoryModal: state.mainPage.orderHistoryModal,
    }
}

const mapDispatchToActionCreators = {
    updateMain: updateMain
};

const styles = StyleSheet.create({
  row:{
    flex:1,
    flexDirection: 'row',
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
