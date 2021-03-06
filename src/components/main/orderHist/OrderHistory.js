import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../../actions/updateSettingsPageActions';
import {updateMain} from '../../../actions/updateMainPageActions';

import {Actions} from 'react-native-router-flux'

import PastOrders from './PastOrders'

import {StyleSheet, Text, View, Image, TouchableHighlight, ScrollView} from 'react-native'

class OrderHistory extends Component {

  render() {

    return (
      <Image
        source={require('../../../../imgs/closeup.jpg')}
        style={{
        marginTop: 22,
        flex: 1,
        padding: 5,
        height: null,
        width: null,
      }}>
        <View style={{
          margin: 5,
          flex: 1,
          borderRadius: 5,
          backgroundColor: '#F5FCFF',
        }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: '#D40001'
          }}>
            <Text style={{
              fontWeight: '900',
              color: '#fff'
            }}>Order History</Text>
          </View>

          <TouchableHighlight style={{
            position: 'absolute',
            right: 20,
            top: 20
          }} onPress={Actions.pop}>
            <Text style={{
              fontWeight: '900',
              color: '#fff'
            }}>X</Text>
          </TouchableHighlight>

          <View style={{
            flex: 9.5
          }}>
            <ScrollView >

              <View style={{
                flex: 9.5,
                padding: 15
              }}>
                <PastOrders></PastOrders>
              </View>

            </ScrollView>
          </View>
        </View>
      </Image>

    )
  }
}

mapStateToProps = (state) => {
  return {
    // pizzaTest: state.mainPage.pizzaTest,
  }
};

const mapDispatchToActionCreators = {
  updateMain: updateMain
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(OrderHistory)
