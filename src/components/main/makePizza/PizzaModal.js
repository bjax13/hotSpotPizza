import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import ModalDropdown from 'react-native-modal-dropdown';

import Toppings from './Toppings';
import PieOptions from './PieOptions';
import AddToOrder from './AddToOrder';

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
       this.props.updateMain({
         customToppingArr: [],
         pizzaCrust: ['White', 0 , 1],
         pizzaSauce: ['Red Sauce',0 , -1],
         pizzaQuantity: 1,
         pizzaSize: ['Large', 12, 3],
         totalToppingsCost: 0,
       })
       this.props.updateMain({makePizzaModalVisible: visible});
     }


    render() {

        return (
           <View style={{marginTop: 22,flex: 1}}>
            <View style={{margin: 5, flex:1}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7d9de'}}>
                <Text style= {{fontWeight: '600'}}>{'$'+(this.props.totalCost+this.props.pizzaCost+this.props.sidesCost).toFixed(2)}</Text>
              </View>

              <TouchableHighlight
                style={{position: 'absolute', right: 20 , top: 20 }}
                onPress={() =>{
                  console.log(this.props.totalCost);
                  console.log(this.props.pizzaCost);


                  this.setModalVisible(!this.props.makePizzaModalVisible)
                }}>
                <Text style={{fontWeight: '900', color: 'gray'}}>X</Text>
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
                    <PieOptions></PieOptions>
                    <Toppings></Toppings>
                    <AddToOrder type="pizzas"></AddToOrder>
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
      pizzaTest: state.mainPage.pizzaTest,
      makePizzaModalVisible: state.mainPage.makePizzaModalVisible,
      totalCost: state.mainPage.totalCost,
      pizzaCost: state.mainPage.pizzaCost,
      sidesCost: state.mainPage.sidesCost,
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
