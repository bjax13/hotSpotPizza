import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import CheckBox from 'react-native-checkbox';
import axios from 'axios';

import TotalLine from './TotalLine'

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'


class OrderSummary extends Component {

    render() {

        let orderLineItems = this.props.cartItems.map( (lineItem, i) => {

            let includeInCheckout = true;

            return (
              <View key={i} style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>



                {/* <Text> Line Item {lineItem[1].name}</Text> */}
                <TouchableHighlight style={{flex:1}}>
                  <View>
                    <Text>
                      X
                    </Text>
                  </View>
                </TouchableHighlight>
                <Text style={{flex:10}}>{this.props.pizzaSizeNameArray[lineItem[1].size-1]} {lineItem[1].toppings.length} Topping {lineItem[0]}</Text>
                <Text style={{flex:2}}>{"$"+parseFloat(lineItem[1].price).toFixed(2)}</Text>
              </View>
            );
        });

        return (
            <View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>
              <View >
                <Text style={styles.welcome}>
                  Summary
                </Text>
              </View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>

              {orderLineItems}

              <TotalLine></TotalLine>
            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaTest: state.mainPage.pizzaTest,
      pizzaSizeNameArray: state.mainPage.pizzaSizeNameArray,
      cartItems: state.mainPage.cartItems,
      totalCost: state.mainPage.totalCost,
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
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(OrderSummary)
