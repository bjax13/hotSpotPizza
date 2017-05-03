import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../../actions/updateSettingsPageActions';
import {updateMain} from '../../../actions/updateMainPageActions';

import {Actions} from 'react-native-router-flux'

import Sides from './Sides';
import AddToOrder from '../makePizza/AddToOrder';

import {StyleSheet, Text, View, Image, TouchableHighlight, ScrollView} from 'react-native'

class SideModal extends Component {

  setModalVisible(visible) {
    this.props.updateMain({
      customToppingArr: [],
      pizzaCrust: [
        'White', 0, 1
      ],
      pizzaSauce: [
        'Red Sauce', 0, -1
      ],
      pizzaQuantity: 1,
      pizzaSize: [
        'Large', 12, 3
      ],
      totalToppingsCost: 0
    })
  }

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
              fontWeight: '600',
              color: '#fff',
            }}>Total - {'$' + (this.props.totalCost + this.props.sidesCost).toFixed(2)}
              </Text>
          </View>

          <TouchableHighlight style={{
            position: 'absolute',
            right: 20,
            top: 20
          }} onPress={()=>{Actions.pop() ; this.props.updateMain({sidesCost: 0})}}>
            <Text style={{
              fontWeight: '900',
              color: '#fff',
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
                <Sides></Sides>
                <AddToOrder type="sides"></AddToOrder>
              </View>

            </ScrollView>
          </View>
        </View>
      </Image>

    )
  }
}

mapStateToProps = (state) => {
  return {totalCost: state.mainPage.totalCost, sidesCost: state.mainPage.sidesCost}
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(SideModal)
