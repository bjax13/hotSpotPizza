import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import ModalDropdown from 'react-native-modal-dropdown';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Modal,
    TouchableHighlight,
    ScrollView,
    Picker,
    Item
} from 'react-native'


class PieOptions extends Component {

    _dropdown_1_adjustFrame(style) {
      // console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}, right:${style.right}}`);
      style.top += 5;
      style.left -= 9;
      return style;
    }
    _dropdown_Test_onSelect(idx, value) {

      console.log('idx - '+ idx);
      console.log('value - '+ value);

      this.props.updateMain({pizzaTest: value});
    }
    _dropdown_Quantity_onSelect(idx, value) {
      this.props.updateMain({pizzaQuantity: value});
    }
    _dropdown_Size_onSelect(idx, value) {
      this.props.updateMain({pizzaSize: value});
    }
    _dropdown_Sauce_onSelect(idx, value) {
      this.props.updateMain({pizzaSauce: value});
    }
    _dropdown_Crust_onSelect(idx, value) {
      this.props.updateMain({pizzaCrust: value});
    }

    render() {
        return (
          <View>

            <View style={styles.pieOptionRow}>
              <Text style={styles.optionTitle}>Quantity:</Text>

              <ModalDropdown
                style={styles.pieOptionDropdown}
                textStyle={styles.font15}
                adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                defaultValue = {'1'}
                onSelect = {(idx, value)=> this._dropdown_Quantity_onSelect(idx,value)}
                options={this.props.pizzaQuantityArray}/>
            </View>
            <View style={styles.pieOptionRow}>
              <Text style={styles.optionTitle}>Size:</Text>

              <ModalDropdown
                style={styles.pieOptionDropdown}
                textStyle={styles.font15}
                adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                defaultValue = {'Large'}
                onSelect = {(idx, value)=> this._dropdown_Size_onSelect(idx,value)}
                options={this.props.pizzaSizeArray}/>
            </View>
            <View style={styles.pieOptionRow}>
              <Text style={styles.optionTitle}>Sauce:</Text>

              <ModalDropdown
                style={styles.pieOptionDropdown}
                textStyle={styles.font15}
                adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                defaultValue = {'Red Sauce'}
                onSelect = {(idx, value)=> this._dropdown_Sauce_onSelect(idx,value)}
                options={this.props.pizzaSauceArray}/>
            </View>
            <View style={styles.pieOptionRow}>
              <Text style={styles.optionTitle}>Crust: </Text>

              <ModalDropdown
                style={styles.pieOptionDropdown}
                textStyle={styles.font15}
                adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                defaultValue = {'Red Crust'}
                onSelect = {(idx, value)=> this._dropdown_Crust_onSelect(idx,value)}
                options={this.props.pizzaCrustArray}/>

            </View>
          </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaQuantity: state.mainPage.pizzaQuantity,
      pizzaTest: state.mainPage.pizzaTest,
      pizzaSize: state.mainPage.pizzaSize,
      pizzaSauce: state.mainPage.pizzaSauce,
      pizzaCrust: state.mainPage.pizzaCrust,
      pizzaCrustArray: state.mainPage.pizzaCrustArray,
      pizzaQuantityArray: state.mainPage.pizzaQuantityArray,
      pizzaSauceArray: state.mainPage.pizzaSauceArray,
      pizzaSizeArray: state.mainPage.pizzaSizeArray,
      totalCost: state.mainPage.totalCost,
      pizzaToppingArray: state.mainPage.pizzaToppingArray,
    }
}

const mapDispatchToActionCreators = {
    updateMain: updateMain
};

const styles = StyleSheet.create({

  font15:{
    fontSize:15
  },
  pieOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pieOptionDropdown: {
    borderTopWidth:1,
    borderBottomWidth:1,
    width: 150,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(PieOptions)
