import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../../actions/updateSettingsPageActions';
import {updateMain} from '../../../actions/updateMainPageActions';

import {Actions} from 'react-native-router-flux'

import Toppings from './Toppings';
import PieOptions from './PieOptions';
import AddToOrder from './AddToOrder';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native'

class PizzaModal extends Component {

  setDefaulValues() {
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
            backgroundColor: '#D40001',
            borderColor: '#D40001',
            borderRadius: 5,
            borderWidth: 1

          }}>
            <Text style={{
              fontWeight: '800',
              color: '#fff',
            }}>{'$' + (this.props.totalCost + this.props.pizzaCost).toFixed(2)}</Text>
          </View>

          <TouchableHighlight style={{
            position: 'absolute',
            right: 20,
            top: 20
          }} onPress={()=>{Actions.pop() ; this.props.updateMain({pizzaCost: 0})}}>
            <Text style={{
              fontWeight: '900',
              color: '#FFF'
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
                <Text style={styles.welcome}>Pizza Builder</Text>
                <Text style={styles.instructions}>Build your perfict pizza by adding crusts and options</Text>
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
                <PieOptions></PieOptions>
                <Toppings></Toppings>
                <AddToOrder type="pizzas"></AddToOrder>
              </View>

            </ScrollView>
          </View>
        </View>
      </Image>

    )
  }
}

mapStateToProps = (state) => {
  return {totalCost: state.mainPage.totalCost, pizzaCost: state.mainPage.pizzaCost}
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(PizzaModal)
