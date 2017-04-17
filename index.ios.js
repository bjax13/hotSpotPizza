import React, { Component } from 'react';
import{ Provider } from 'react-redux'
import store from './src/store'

import Main from './src/components/main/Main'
import CartModal from './src/components/main/cart/CartModal'

import { NativeRouter, Route, Link } from 'react-router-native'

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
        <NativeRouter>
        <View style={styles.container}>
          <View style={styles.nav}>
            {/* <Link
              to="/"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
                <Text>Main</Text>
            </Link>
            <Link
              to="/Cart"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
                <Text>Cart</Text>
            </Link> */}

          </View>

          <Route exact path="/" component={Main}/>
          <Route exact path="/Cart" component={CartModal}/>
          {/* <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/> */}
        </View>
      </NativeRouter>
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
