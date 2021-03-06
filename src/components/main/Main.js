import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../actions/updateSettingsPageActions';
import {updateMain} from '../../actions/updateMainPageActions';

import {Actions} from 'react-native-router-flux'

import axios from 'axios';

import LoginButton from './login/LoginButton'
import Login from './login/Login'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native'

class Main extends Component {
  componentDidMount() {
    this.props.updateMain({orderHistoryPageCount: 0})
    axios.get('http://10.100.0.98:8888/api/orders/').then((response) => {
      this.props.updateMain({
        orderHistoryPageCount: this.props.orderHistoryPageCount + response.data.results.length
      })
      let orderCount = response.data.count
      let resultsPerPage = response.data.results.length
      let pages = Math.ceil(orderCount / resultsPerPage);
      let pageURL = response.data.next;

      if (pageURL) {
        if (pageURL.indexOf('=') != -1) {
          pageURL = pageURL.slice(0, pageURL.indexOf('=') + 1)
        }
      }

      this.props.updateMain({orderHistoryArray: response.data.results});

      for (var i = 2; i <= pages; i++) {
        axios.get(pageURL + i).then((response) => {
          this.props.updateMain({
            orderHistoryPageCount: this.props.orderHistoryPageCount + response.data.results.length
          })

          this.props.updateMain({
            orderHistoryArray: this.props.orderHistoryArray.concat(response.data.results)
          })

          if (this.props.orderHistoryPageCount === response.data.count) {
            let arr = []
            for (var i = 0; i < this.props.orderHistoryArray.length; i++) {
              this.props.orderHistoryArray[i].modalVisible = false;
              arr.push(this.props.orderHistoryArray[i])
            }

            this.props.updateMain({orderHistoryArray: arr})

            for (var i = 0; i < arr.length; i++) {
              if (arr[i].pizzas.length > 0) {
                for (var j = 0; j < arr[i].pizzas.length; j++) {
                  axios.get('http://10.100.0.98:8888/api/pizza-counts/' + arr[i].pizzas[j]).then((response) => {
                    let obj = this.props.orderHistoryPizzaCountObject;
                    obj[response.data.id] = response.data;
                    this.props.updateMain({orderHistoryPizzaCountObject: obj})
                    axios.get('http://10.100.0.98:8888/api/pizzas/' + response.data.pizza).then((response) => {
                      let obj = this.props.orderHistoryPizzaObject;
                      obj[response.data.id] = response.data;

                      this.props.updateMain({orderHistoryPizzaObject: obj})

                    })
                  })
                }
              }
              if (arr[i].sides.length > 0) {
                for (var j = 0; j < arr[i].sides.length; j++) {
                  axios.get('http://10.100.0.98:8888/api/side-counts/' + arr[i].sides[j]).then((response) => {
                    let obj = this.props.orderHistorySidesCountObject;
                    obj[response.data.id] = response.data;
                    this.props.updateMain({orderHistorySidesCountObject: obj})
                    axios.get('http://10.100.0.98:8888/api/sides/' + response.data.side).then((response) => {
                      let obj = this.props.orderHistorySidesObject;
                      obj[response.data.id] = response.data;

                      this.props.updateMain({orderHistorySidesObject: obj})

                    })
                  })
                }
              }
            }
          }
        })
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <Image
        source={require('../../../imgs/closeup.jpg')}
        style={styles.containerImg}>
        <View
          style={styles.container}>
          <View style={{flex:1, backgroundColor: '#D40001', alignSelf: 'stretch'}}>
            <TouchableHighlight style={{flex:1}}
              onPress={()=>{console.log('Pizza Menu Pressed')}}>
              <View style={{flex:1 , justifyContent: 'center',alignSelf: 'baseline', paddingLeft: 10, paddingTop: 10}}>
                <Image
                  style={{height: 35, width:35, tintColor: '#fff'}}
                  
                  source={require('../../../imgs/pizza.png')}/>
              </View>
            </TouchableHighlight>
          </View>

          <View style={{flex:3.4, marginTop: 5}}>
            <TouchableHighlight
              style={styles.circle}
              onPress={()=>{
                if (this.props.logoPosition === this.props.logoUri.length-1) {
                  this.props.updateMain({logoPosition: 0})
                }else {
                  let current = this.props.logoPosition;
                  current++;
                  this.props.updateMain({logoPosition: current})
                }

              }}>
              <Image style={styles.circleImg} source={{
                uri: this.props.logoUri[this.props.logoPosition]
              }}/>
            </TouchableHighlight>
          </View>

          <View style={styles.container}>
            <View style={{backgroundColor: '#F5FCFF', borderRadius: 5, margin: 5}}>
              <Text style={styles.welcome}>
                Welcome to Hot Spot Pizza!
              </Text>
              <Text style={styles.instructions}>
                Get Started by building your Pizza below
              </Text>
            </View>
            <Modal transparent={false} visible={this.props.loginModal}>
              <Login></Login>
            </Modal>

            <TouchableHighlight
              style={styles.button}
              onPress={Actions.MakePizza}>
              <Text style={styles.buttonText}>Make A Pizza!</Text>
            </TouchableHighlight>
            <Text></Text>
            <TouchableHighlight style={styles.button} onPress={Actions.AddFavorites}>
              <Text style={styles.buttonText}>Pick a Favorite</Text>
            </TouchableHighlight>
            <Text></Text>
            <TouchableHighlight style={styles.button} onPress={Actions.OrderHistory}>
              <Text style={styles.buttonText}>Order History</Text>
            </TouchableHighlight>
            <Text></Text>
            <LoginButton></LoginButton>

          </View>
        </View>
      </Image>
    )
  }
}

mapStateToProps = (state) => {
  return {
    loginModal: state.mainPage.loginModal,

    logoUri: state.mainPage.logoUri,
    logoPosition: state.mainPage.logoPosition,

    orderHistoryPageCount: state.mainPage.orderHistoryPageCount,
    orderHistoryArray: state.mainPage.orderHistoryArray,
    orderHistoryModal: state.mainPage.orderHistoryModal,
    orderHistoryPizzaCountObject: state.mainPage.orderHistoryPizzaCountObject,
    orderHistoryPizzaObject: state.mainPage.orderHistoryPizzaObject,
    orderHistoryToppingObject: state.mainPageorderHistoryToppingObject,

    orderHistorySidesCountObject: state.mainPage.orderHistorySidesCountObject,
    orderHistorySidesObject: state.mainPage.orderHistorySidesObject
  }
}

const mapDispatchToActionCreators = {
  updateMain: updateMain
};

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleImg: {
    width: 141,
    height: 141,
    alignItems: 'center'
  },
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF'
  },
  containerImg: {
    flex: 6,
    width: null,
    height: null,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  button: {
    borderRadius: 20,
    borderWidth: 10,
    borderColor: '#19A63F',
    backgroundColor: '#19A63F',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#fff'
  },
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(Main)
