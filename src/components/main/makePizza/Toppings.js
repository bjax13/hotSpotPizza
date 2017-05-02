import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../../../actions/updateSettingsPageActions';
import {updateMain} from '../../../actions/updateMainPageActions';

import CheckBox from 'react-native-checkbox';
import axios from 'axios';

import {StyleSheet, Text, View} from 'react-native'

class Toppings extends Component {
  componentDidMount() {
    axios.get('http://10.100.0.98:8888/api/toppings/').then((response) => {
      let toppingCount = response.data.count
      let resultsPerPage = response.data.results.length
      let pages = Math.ceil(toppingCount / resultsPerPage);
      let pageURL = response.data.next;

      if (pageURL.indexOf('=') != -1) {
        pageURL = pageURL.slice(0, pageURL.indexOf('=') + 1)
      }

      this.props.updateMain({pizzaToppingArray: response.data.results});

      for (var i = 2; i <= pages; i++) {
        axios.get(pageURL + i).then((response) => {
          this.props.updateMain({
            pizzaToppingArray: this.props.pizzaToppingArray.concat(response.data.results)
          })
        })
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {

    let pizzaToppings = this.props.pizzaToppingArray.map((toppingObj, i) => {

      let checkTest = true;

      addTopping = (toppingInputObj) => {

        let newToppArr = this.props.customToppingArr;
        newToppArr.push(toppingInputObj.id);
        this.props.updateMain({customToppingArr: newToppArr});
        this.props.updateMain({
          pizzaCost: (this.props.pizzaCost + (this.props.pizzaQuantity * parseFloat(toppingInputObj.price)))
        });
        this.props.updateMain({
          totalToppingsCost: this.props.totalToppingsCost + parseFloat(toppingInputObj.price)
        });

      }
      subTopping = (toppingInputObj) => {
        let newToppArr = this.props.customToppingArr;
        this.props.updateMain({
          pizzaCost: (this.props.pizzaCost - (this.props.pizzaQuantity * parseFloat(toppingInputObj.price)))
        })
        this.props.updateMain({
          totalToppingsCost: this.props.totalToppingsCost - parseFloat(toppingInputObj.price)
        })
        for (var i = 0; i < newToppArr.length; i++) {
          if (newToppArr[i] === toppingInputObj.id) {
            newToppArr.splice(i, 1)
            i = newToppArr.length;
          }
        }
        this.props.updateMain({customToppingArr: newToppArr});
      }

      return (
        <View key={toppingObj.name} style={{
          paddingTop: 10,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <CheckBox label={toppingObj.name} checked={this.checkTest} labelStyle={styles.optionTitle} onChange={(checked) => {
            checkTest = !checked;
            if (checkTest) {
              addTopping(toppingObj);
            } else {
              subTopping(toppingObj);
            }
          }}/>
          <Text >{"$" + parseFloat(toppingObj.price).toFixed(2)}</Text>
        </View>
      );
    });

    return (
      <View>
        <View style={{
          borderWidth: .5,
          borderColor: '#CCC'
        }}></View>
        <View >
          <Text style={styles.welcome}>
            Toppings
          </Text>
        </View>
        <View style={{
          borderWidth: .5,
          borderColor: '#CCC'
        }}></View>

        {pizzaToppings}
      </View>

    )
  }
}

mapStateToProps = (state) => {
  return {pizzaCost: state.mainPage.pizzaCost, customToppingArr: state.mainPage.customToppingArr, totalToppingsCost: state.mainPage.totalToppingsCost, pizzaQuantity: state.mainPage.pizzaQuantity, pizzaToppingArray: state.mainPage.pizzaToppingArray}
}

const mapDispatchToActionCreators = {
  updateMain: updateMain
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10
  },
  optionTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    textAlign: 'left',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(Toppings)
