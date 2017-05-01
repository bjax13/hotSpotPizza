import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import CheckBox from 'react-native-checkbox';
import axios from 'axios';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'


class FavItems extends Component {
  componentDidMount(){
    axios.get('http://10.100.0.98:8888/api/pizzas/')
      .then((response) => {
        let pizzaCount = response.data.count
        let resultsPerPage = response.data.results.length
        let pages = Math.ceil(pizzaCount / resultsPerPage);
        let pageURL = response.data.next;

        if (pageURL.indexOf('=') != -1) {
          pageURL = pageURL.slice(0,pageURL.indexOf('=')+1)
        }

        this.props.updateMain({pizzaArray: response.data.results});
        for (var i = 0; i < response.data.results.length; i++) {
          response.data.results[i].count = 0
        }

        for (var i = 2; i <= pages; i++) {
          axios.get(pageURL+i)
            .then((response)=>{
              for (var i = 0; i < response.data.results.length; i++) {
                response.data.results[i].count = 0
              }
              this.props.updateMain({pizzaArray: this.props.pizzaArray.concat(response.data.results)})
              let newObj = {}

              for (var i = 0; i < this.props.pizzaArray.length; i++) {
                newObj[i+1]=this.props.pizzaArray[i]
              }
              this.props.updateMain({orderHistoryPizzaObject: newObj})
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

    render() {

        let favPizzas = this.props.pizzaArray
          .filter((order)=> order.public_display === true)
          .map( (pizzaObj, i) => {

            let index = -1 ;

            for (var i = 0; i < this.props.pizzaArray.length; i++) {
              if (this.props.pizzaArray[i].id === pizzaObj.id) {
                index = i;
                i = this.props.pizzaArray.length;
              }
            }

            getCount = () => {
              return pizzaObj.count
            }

            decrement = () =>{

              let arr = this.props.pizzaArray;
              if (arr[index].count > 0) {
                arr[index].count--;
                this.props.updateMain({pizzaArray: arr})

                if (this.props.addToOrderArr.indexOf(arr[index].id) != -1) {
                  this.props.updateMain({pizzaCost: (this.props.pizzaCost - (parseFloat(arr[index].price))) });
                  this.props.updateMain({totalPizzaCost: this.props.totalPizzaCost - parseFloat(arr[index].price)});
                }

              }
              this.forceUpdate()
            }
            increment = () =>{
              let arr = this.props.pizzaArray;

              if (arr[index].id === pizzaObj.id) {
                arr[index].count++;
              }

              this.props.updateMain({pizzaArray: arr})

              if (this.props.addToOrderArr.indexOf(arr[index].id) != -1) {
                this.props.updateMain({pizzaCost: (this.props.pizzaCost + (parseFloat(arr[index].price))) });
                this.props.updateMain({totalPizzaCost: this.props.totalPizzaCost + parseFloat(arr[index].price)});
              }else {
                let newSideArr = this.props.addToOrderArr;
                newSideArr.push(pizzaObj.id);
                this.props.updateMain({addToOrderArr: newSideArr});
                this.props.updateMain({pizzaCost: (this.props.pizzaCost + (pizzaObj.count*parseFloat(pizzaObj.price))) });
                this.props.updateMain({totalPizzaCost: this.props.totalPizzaCost + parseFloat(pizzaObj.price)});
              }
              this.forceUpdate()
            }

            return (
              <View key={pizzaObj.id} style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                <View style={{flex:3.8}}>
                  <Text style={styles.optionTitle}>{pizzaObj.name}</Text>

                </View>

                <View style={{flex:1.5,flexDirection: 'row'}}>
                  <TouchableHighlight
                    onPress={ decrement}
                    style={{flex:1}}>
                    <Text> - </Text>
                  </TouchableHighlight>
                  <Text style={{flex:1}}>
                    {this.props.pizzaArray[index].count}
                  </Text>
                  <TouchableHighlight
                    onPress={ increment}
                    style={{flex:1}}>
                    <Text> + </Text>
                  </TouchableHighlight>
                </View>
                <View style={{flex:1, alignItems: 'flex-end'}}>
                  <Text >{"$"+parseFloat(pizzaObj.price).toFixed(2)}</Text>
                </View>
              </View>
            );
        });

        return (
            <View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>
              <View >
                <Text style={styles.welcome}>
                  Favorite Pizzas
                </Text>
              </View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>

              {favPizzas}
            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaCost: state.mainPage.pizzaCost,
      addToOrderArr: state.mainPage.addToOrderArr,
      totalPizzaCost: state.mainPage.totalPizzaCost,
      pizzaArray: state.mainPage.pizzaArray,
      orderHistoryPizzaObject: state.mainPage.orderHistoryPizzaObject,
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
    color: '#000',
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(FavItems)
