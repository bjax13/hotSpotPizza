import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import ModalDropdown from 'react-native-modal-dropdown';

import { Actions } from 'react-native-router-flux'

import Sides from './Sides';
import PieOptions from '../makePizza/PieOptions';
import AddToOrder from '../makePizza/AddToOrder';

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

class SideModal extends Component {

     setModalVisible(visible) {
       this.props.updateMain({
         customToppingArr: [],
         pizzaCrust: ['White', 0 , 1],
         pizzaSauce: ['Red Sauce',0 , -1],
         pizzaQuantity: 1,
         pizzaSize: ['Large', 12, 3],
         totalToppingsCost: 0,
       })
       this.props.updateMain({makeSideModalVisible: visible});
       this.props.updateMain({makeCartModalVisible: !visible});
     }


    render() {

        return (
           <View style={{marginTop: 22,flex: 1}}>
            <View style={{margin: 5, flex:1}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7d9de'}}>
                <Text style= {{fontWeight: '600'}}>{'$'+(this.props.totalCost+this.props.sidesCost).toFixed(2)} sides</Text>
              </View>

              <TouchableHighlight
                style={{position: 'absolute', right: 20 , top: 20 }}
                onPress={Actions.pop}>
                <Text style={{fontWeight: '900', color: 'gray'}}>X</Text>
              </TouchableHighlight>

              <View style={{flex:9.5}}>
                <ScrollView >

                  <View style={{flex:9.5, padding: 15}}>
                    <Sides></Sides>
                    <AddToOrder type="sides"></AddToOrder>
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
      makeSideModalVisible: state.mainPage.makeSideModalVisible,
      makeCartModalVisible: state.mainPage.makeCartModalVisible,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(SideModal)
