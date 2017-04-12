import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../actions/updateSettingsPageActions';
import { updateMain } from '../../actions/updateMainPageActions';

import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

import PizzaModal from './makePizza/PizzaModal';
import CartModal from './cart/CartModal';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableHighlight,
} from 'react-native'


class Main extends Component {

     setModalVisible(visible) {
       this.props.updateMain({makePizzaModalVisible: visible});
     }

    render() {
        return (
          <View style={{flex:1}}>
                <View style={styles.container}>

                  <View style={styles.circle}>
                    <Image
                      style={{width: 141, height: 141 , alignItems: 'center'}}
                      source={{uri: 'https://www.48hourslogo.com/48hourslogo_data/2014/09/09/201409090947415741.png'}}/>
                  </View>
                    <View style={styles.container}>
                      <Text style={styles.welcome}>
                        Welcome to Hot Spot Pizza!
                      </Text>
                      <Text style={styles.instructions}>
                        Get Started by building your Pizza below
                      </Text>

                      <Modal
                        animationType={"fade"}
                        transparent={false}
                        visible={this.props.makePizzaModalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                          <PizzaModal></PizzaModal>

                      </Modal>
                      <Modal
                        animationType={"fade"}
                        transparent={false}
                        visible={this.props.makeCartModalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                          <CartModal></CartModal>

                      </Modal>

                      <TouchableHighlight onPress={() => {


                          this.props.updateMain({makePizzaModalVisible: true});
                        // this.setModalVisible(true)
                      }}>
                        <Text style={{color: 'red'}}>Make A Pizza!</Text>
                      </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
      makePizzaModalVisible: state.mainPage.makePizzaModalVisible,
      makeCartModalVisible: state.mainPage.makeCartModalVisible,
      pizzaSizeNameArray: state.mainPage.pizzaSizeNameArray,
      pizzaSizeArray: state.mainPage.pizzaSizeArray,
      pizzaSize: state.mainPage.pizzaSize,
      pizzaSauce: state.mainPage.pizzaSauce,
      pizzaCrust: state.mainPage.pizzaCrust,
      totalToppingsCost: state.mainPage.totalToppingsCost,
      pizzaQuantity: state.mainPage.pizzaQuantity,
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(Main)
