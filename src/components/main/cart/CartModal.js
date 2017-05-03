import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../../actions/updateSettingsPageActions';
import {updateMain} from '../../../actions/updateMainPageActions';

import OrderSummary from './OrderSummary';
import Checkout from './Checkout';
import AddPizza from './AddPizza';
import AddSides from './AddSides';

import {Actions} from 'react-native-router-flux'

import {StyleSheet, Text, View, TouchableHighlight, ScrollView} from 'react-native'

class CartModal extends Component {

  render() {

    return (
      <View style={{
        marginTop: 22,
        flex: 1
      }}>
        <View style={{
          margin: 5,
          flex: 1
        }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D40001'
          }}>
            <Text style={{
              fontWeight: '600'
            }}>
              Total - {'$' + (this.props.totalCost).toFixed(2)}</Text>
          </View>

          <TouchableHighlight style={{
            position: 'absolute',
            right: 20,
            top: 20
          }} onPress={Actions.Main}>
            <Text style={{
              fontWeight: '900',
              color: 'gray'
            }}>X</Text>
          </TouchableHighlight>

          <View style={{
            flex: 9.5
          }}>
            <ScrollView >

              <View style={{
                flex: 1.5,
                padding: 15
              }}>
                <Text style={styles.welcome}>Cart</Text>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  {/* <Text style={[styles.instructions,{flex:1}]}>Add more or Checkout</Text> */}
                  <View>
                    <AddPizza></AddPizza>
                  </View>
                  <View>
                    <AddSides></AddSides>
                  </View>
                  <View>
                    <Checkout></Checkout>
                  </View>
                </View>
              </View>

              <View style={{
                borderWidth: .5,
                borderColor: '#CCC'
              }}>
                {/* This is the deviding line between welcome and instructions */}
              </View>

              <View style={{
                flex: 9.5,
                padding: 15
              }}>
                <OrderSummary></OrderSummary>
                <Checkout></Checkout>

              </View>

            </ScrollView>
          </View>
        </View>
      </View>

    )
  }
}

mapStateToProps = (state) => {
  return {totalCost: state.mainPage.totalCost}
}

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

export default connect(mapStateToProps, mapDispatchToActionCreators)(CartModal)
