
import React, { Component } from 'react';
import{ Provider } from 'react-redux'
import store from './src/store'

import Main from './src/components/main/Main'


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

export default class hotSpotPizza extends Component {
  render() {
    const routes = [
      {title: 'First Scene', index: 0},
      {title: 'Second Scene', index: 1},
    ];
    return (


    <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={(route, navigator) =>
        <TouchableHighlight onPress={() => {
          if (route.index === 0) {
            navigator.push(routes[1]);
          } else {
            navigator.pop();
          }
        }}>
        <Text>Hello {route.title}!</Text>
        </TouchableHighlight>
      }
      navigationBar={
         <Navigator.NavigationBar
           routeMapper={{
             LeftButton: (route, navigator, index, navState) =>
              { return (<Text>Cancel</Text>); },
             RightButton: (route, navigator, index, navState) =>
               { return (<Text>Done</Text>); },
             Title: (route, navigator, index, navState) =>
               { return (<Text>Awesome Nav Bar</Text>); },
           }}
           style={{backgroundColor: 'gray'}}
         />
      }
    />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('hotSpotPizza', () => hotSpotPizza);
