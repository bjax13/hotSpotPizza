import React, { Component } from 'react';
import{ Provider } from 'react-redux'
import store from './src/store'

import Main from './src/components/main/Main'
import Login from './src/components/main/login/Login'
import CartModal from './src/components/main/cart/CartModal'
import PizzaModal from './src/components/main/makePizza/PizzaModal'
import SideModal from './src/components/main/sides/SideModal'
import OrderHistory from './src/components/main/orderHist/OrderHistory'

import { Router, Scene } from 'react-native-router-flux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

const Home = () => (
  <Main></Main>
)

export default class hotSpotPizza extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router hideNavBar={true}>
         <Scene key="root">
           <Scene key="Main" component={Main} title="Main Page" initial={true}/>
           <Scene key="Login" component={Login} title="Login Page" />
           <Scene key="Cart" component={CartModal} title="Cart Page" />
           <Scene key="MakePizza" component={PizzaModal} title="MakePizza Page" />
           <Scene key="AddSides" component={SideModal} title="AddSides Page" />
           <Scene key="OrderHistory" component={OrderHistory} title="OrderHistory Page" />
         </Scene>
       </Router>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f4fcff',
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  }
});

AppRegistry.registerComponent('hotSpotPizza', () => hotSpotPizza);
