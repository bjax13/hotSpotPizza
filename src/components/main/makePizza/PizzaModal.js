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

const onMakePizza = () => {

  console.log('Button has been pressed!');
};

class PizzaModal extends Component {

     setModalVisible(visible) {
       this.props.updateMain({makePizzaModalVisible: visible});
     }

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

        let pizzaQty = this.props.pizzaQuantityArray.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s.toString()} />
        });

        return (
            
             <View style={{marginTop: 22,flex: 1}}>
              <View style={{margin: 5, flex:1}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7d9de'}}>
                  <Text>{'$'+this.props.totalCost.toFixed(2)}</Text>
                </View>

                <TouchableHighlight
                  style={{position: 'absolute', right: 4 , top: 4 }}
                  onPress={() =>{
                    this.setModalVisible(!this.props.makePizzaModalVisible)
                  }}>
                  <Text>X</Text>
                </TouchableHighlight>

                <View style={{flex:9.5}}>
                  <ScrollView >
                    <View style={{flex:1.5, padding: 15}}>
                      <Text style={styles.welcome}>Pizza Builder</Text>

                      <Text style={styles.instructions}>Build your perfict pizza by adding crusts and options</Text>
                    </View>
                    <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                        {/* This is the deviding line between welcome and instructions */}
                    </View>
                    <View style={{flex:9.5, padding: 15}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.optionTitle}>Quantity:</Text>

                        <ModalDropdown
                          style={{borderTopWidth:1, borderBottomWidth:1,  width: 20, height: 20,  justifyContent: 'center' ,alignItems: 'center'}}
                          textStyle={{fontSize:15}}
                          adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                          defaultValue = {'1'}
                          onSelect = {(idx, value)=> this._dropdown_Quantity_onSelect(idx,value)}
                          options={this.props.pizzaQuantityArray}/>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.optionTitle}>Size:</Text>

                        <ModalDropdown
                          style={{borderTopWidth:1, borderBottomWidth:1,  width: 70, height: 20,  justifyContent: 'center' ,alignItems: 'center'}}
                          textStyle={{fontSize:15}}
                          adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                          defaultValue = {'Large'}
                          onSelect = {(idx, value)=> this._dropdown_Size_onSelect(idx,value)}
                          options={this.props.pizzaSizeArray}/>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.optionTitle}>Sauce:</Text>

                        <ModalDropdown
                          style={{borderTopWidth:1, borderBottomWidth:1,  width: 150, height: 20,  justifyContent: 'center' ,alignItems: 'center'}}
                          textStyle={{fontSize:15}}
                          adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                          defaultValue = {'Red Sauce'}
                          onSelect = {(idx, value)=> this._dropdown_Sauce_onSelect(idx,value)}
                          options={this.props.pizzaSauceArray}/>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.optionTitle}>Crust: </Text>

                        <ModalDropdown
                          style={{borderTopWidth:1, borderBottomWidth:1,  width: 150, height: 20,  justifyContent: 'center' ,alignItems: 'center'}}
                          textStyle={{fontSize:15}}
                          adjustFrame={style => this._dropdown_1_adjustFrame(style)}
                          defaultValue = {'Red Crust'}
                          onSelect = {(idx, value)=> this._dropdown_Crust_onSelect(idx,value)}
                          options={this.props.pizzaCrustArray}/>

                      </View>

                      <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                          {/* This is the deviding line between above Toppings */}
                      </View>
                      <View >
                        <Text style={styles.welcome}>
                          Toppings
                        </Text>
                      </View>
                      <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
                          {/* This is the deviding line between below Toppings */}
                      </View>
                    </View>
                  </ScrollView>
                </View>
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
      makePizzaModalVisible: state.mainPage.makePizzaModalVisible,
      totalCost: state.mainPage.totalCost,
      pizzaToppingArray: state.mainPage.pizzaToppingArray,
    }
}

const mapDispatchToActionCreators = {
    updateMain: updateMain
};

const styles = StyleSheet.create({


  circle: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: {
    width: 100,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(PizzaModal)
