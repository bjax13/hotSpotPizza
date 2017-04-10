import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

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

    componentDidMount(){
      let pizzaCost = 0
      // call api's
      axios.get('http://10.100.0.98:8888/api/sizes/')
        .then((response) => {

          this.props.updateMain({pizzaSizeArray: response.data.results});
          let resArr = response.data.results
          let arr = []
          //sort arr so pizzaNames reads sm - med - lrg in order
          resArr.sort((a,b)=> a.id - b.id)
          //populate arr with the names of each item.
          for (var i = 0; i < resArr.length; i++) {
            arr.push(resArr[i].name)

          }
          this.props.updateMain({pizzaSizeNameArray: arr});
          for (var i = 0; i < this.props.pizzaSizeArray.length; i++) {
            if (this.props.pizzaSizeArray[i].name === this.props.pizzaSize[0]) {
              pizzaCost+= parseFloat(this.props.pizzaSizeArray[i].price);
              i=this.props.pizzaSizeArray.length
            }
          }
          this.props.updateMain({pizzaCost: parseFloat(pizzaCost)* this.props.pizzaQuantity})

        })
        .catch((error) => {
          console.log(error);
        });
      axios.get('http://10.100.0.98:8888/api/crusts/')
        .then((response) => {

          this.props.updateMain({pizzaCrustArray: response.data.results});
          this.props.updateMain({pizzaCrust: [response.data.results[0].name,parseFloat(response.data.results[0].price)]});
          let resArr = response.data.results
          let arr = []
          for (var i = 0; i < resArr.length; i++) {
            arr.push(resArr[i].name)
          }
          this.props.updateMain({pizzaCrustNameArray: arr});
          for (var i = 0; i < this.props.pizzaCrustArray.length; i++) {
            if (this.props.pizzaCrustArray[i].name === this.props.pizzaCrust[0]) {
              pizzaCost+= parseFloat(this.props.pizzaCrustArray[i].price);
              i=this.props.pizzaCrustArray.length
            }
            this.props.updateMain({pizzaCost: parseFloat(pizzaCost)* this.props.pizzaQuantity})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    componentDidUpdate(){
      // console.log('Quantity - '+ this.props.pizzaQuantity +' '+ typeof this.props.pizzaQuantity);
      // console.log('Size - '+ this.props.pizzaSize[1]+' '+ typeof this.props.pizzaSize[1]);
      // console.log('Sauce - '+ this.props.pizzaSauce[1]+' '+ typeof this.props.pizzaSauce[1]);
      // console.log('Crust - '+ this.props.pizzaCrust[1]+' '+ typeof this.props.pizzaCrust[1]);
      // console.log('Toppings - '+ this.props.totalToppingsCost+' '+ typeof this.props.totalToppingsCost);


      this.props.updateMain({pizzaCost: (this.props.pizzaSize[1]+this.props.pizzaSauce[1]+this.props.pizzaCrust[1]+ this.props.totalToppingsCost)*this.props.pizzaQuantity});
    }

    _dropdown_1_adjustFrame(style) {
      // console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}, right:${style.right}}`);
      style.top += 5;
      style.left -= 9;
      return style;
    }
    _dropdown_Test_onSelect(idx, value) {
      this.props.updateMain({pizzaTest: value});
    }
    _dropdown_Quantity_onSelect(idx, value) {
      this.props.updateMain({pizzaQuantity: value});
    }
    _dropdown_Size_onSelect(idx, value) {
      this.props.updateMain({pizzaSize: [value, parseFloat(this.props.pizzaSizeArray[idx].price)]});
    }
    _dropdown_Sauce_onSelect(idx, value) {
      this.props.updateMain({pizzaSauce: [value, parseFloat(this.props.pizzaSauceArray[idx].price)]});
    }
    _dropdown_Crust_onSelect(idx, value) {
      this.props.updateMain({pizzaCrust: [value, parseFloat(this.props.pizzaCrustArray[idx].price)]});
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
                defaultValue = {this.props.pizzaQuantityArray[0].toString()}
                onSelect = {(idx, value)=> this._dropdown_Quantity_onSelect(idx,value)}
                options={this.props.pizzaQuantityArray}/>
            </View>
            <View style={styles.pieOptionRow}>
              <Text style={styles.optionTitle}>Size:</Text>

              <ModalDropdown
                style={styles.pieOptionDropdown}
                textStyle={styles.font15}
                adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                defaultValue = {this.props.pizzaSizeNameArray[2]}
                onSelect = {(idx, value)=> this._dropdown_Size_onSelect(idx,value)}
                options={this.props.pizzaSizeNameArray}/>
            </View>
            <View style={styles.pieOptionRow}>
              <Text style={styles.optionTitle}>Sauce:</Text>

              <ModalDropdown
                style={styles.pieOptionDropdown}
                textStyle={styles.font15}
                adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                defaultValue = {this.props.pizzaSauceArray[0]}
                onSelect = {(idx, value)=> this._dropdown_Sauce_onSelect(idx,value)}
                options={this.props.pizzaSauceArray}/>
            </View>
            <View style={styles.pieOptionRow}>
              <Text style={styles.optionTitle}>Crust: </Text>

              <ModalDropdown
                style={styles.pieOptionDropdown}
                textStyle={styles.font15}
                adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                defaultValue = {this.props.pizzaCrustNameArray[0]}
                onSelect = {(idx, value)=> this._dropdown_Crust_onSelect(idx,value)}
                options={this.props.pizzaCrustNameArray}/>

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
      totalToppingsCost: state.mainPage.totalToppingsCost,
      pizzaCrust: state.mainPage.pizzaCrust,
      pizzaCrustArray: state.mainPage.pizzaCrustArray,
      pizzaCrustNameArray: state.mainPage.pizzaCrustNameArray,
      pizzaQuantityArray: state.mainPage.pizzaQuantityArray,
      pizzaSauceArray: state.mainPage.pizzaSauceArray,
      pizzaSizeArray: state.mainPage.pizzaSizeArray,
      pizzaSizeNameArray: state.mainPage.pizzaSizeNameArray,
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
