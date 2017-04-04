
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
      {title: 'Main', index: 0},
      {title: 'First', index: 1},
      {title: 'Second', index: 2},
      {title: 'Third', index: 3},
    ];
    return (


      <Provider store={ store }>
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) => {
            if (route.index ===0) {
              return <Main></Main>
            }else {
              return (
                <TouchableHighlight>
                  <Text>Hello {route.title}!</Text>
                </TouchableHighlight>
              )

            }
          }

        }style={{paddingTop: 64}}
          navigationBar={
             <Navigator.NavigationBar
               routeMapper={{
                 LeftButton: (route, navigator, index, navState) =>
                   {
                     if (route.index === 0) {
                          return null;
                        } else {
                          return (
                            <TouchableHighlight onPress={() => navigator.pop()}>
                              <Text>Back</Text>
                            </TouchableHighlight>
                          );
                        }
                   },
                 RightButton: (route, navigator, index, navState) =>
                   {
                     return (
                       <TouchableHighlight
                           onPress={() => {
                           if (route.index < routes.length-1) {

                             navigator.push(routes[route.index+1]);
                           }
                         }}>
                         <Text>Next</Text>
                       </TouchableHighlight>
                     );
                   },
                 Title: (route, navigator, index, navState) =>
                   {
                     return (
                       <TouchableHighlight>
                         <Text>Awesome {route.title}</Text>
                       </TouchableHighlight>
                     );
                   },
               }}
               style={{backgroundColor: '#BB070C'}}
             />
          }
        />
      </Provider>

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
