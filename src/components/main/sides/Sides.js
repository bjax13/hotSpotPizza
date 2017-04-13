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
} from 'react-native'


class Sides extends Component {
  componentDidMount(){
    axios.get('http://10.100.0.98:8888/api/sides/')
      .then((response) => {
        let sidesCount = response.data.count
        let resultsPerPage = response.data.results.length
        let pages = Math.ceil(sidesCount / resultsPerPage);
        let pageURL = response.data.next;

        if (pageURL.indexOf('=') != -1) {
          pageURL = pageURL.slice(0,pageURL.indexOf('=')+1)
        }

        this.props.updateMain({pizzaSidesArray: response.data.results});

        for (var i = 2; i <= pages; i++) {
          axios.get(pageURL+i)
            .then((response)=>{
              this.props.updateMain({pizzaSidesArray: this.props.pizzaSidesArray.concat(response.data.results)})
            })

        }
        console.log('sides.then');


      })
      .catch((error) => {
        console.log(error);
      });
  }

    render() {

        let pizzaSides = this.props.pizzaSidesArray.map( (sidesObj, i) => {

            let checkTest = true;

            addSides = (sidesInputObj) =>{

              let newToppArr = this.props.customSidesArr;
              newToppArr.push(sidesInputObj.id);
              this.props.updateMain({customSidesArr: newToppArr});
              this.props.updateMain({pizzaCost: (this.props.pizzaCost + (this.props.pizzaQuantity*parseFloat(sidesInputObj.price))) });
              this.props.updateMain({totalSidesCost: this.props.totalSidesCost + parseFloat(sidesInputObj.price)});

            }
            subSides = (sidesInputObj) =>{
              let newToppArr = this.props.customSidesArr;
              this.props.updateMain({pizzaCost: (this.props.pizzaCost - (this.props.pizzaQuantity*parseFloat(sidesInputObj.price)))})
              this.props.updateMain({totalSidesCost: this.props.totalSidesCost - parseFloat(sidesInputObj.price)})
              for (var i = 0; i < newToppArr.length; i++) {
                if (newToppArr[i] === sidesInputObj.id) {
                  newToppArr.splice(i,1)
                  i = newToppArr.length;
                }
              }
              this.props.updateMain({customSidesArr: newToppArr});
            }

            return (
              <View key={sidesObj.name} style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                <CheckBox
                  label={sidesObj.name}
                  checked={this.checkTest}
                  labelStyle={styles.optionTitle}
                  onChange={(checked) => {
                    checkTest = !checked;
                    if (checkTest) {
                      addSides(sidesObj);
                    } else {
                      subSides(sidesObj);
                    }
                  }}
                />
                <Text >{"$"+parseFloat(sidesObj.price).toFixed(2)}</Text>
              </View>
            );
        });

        return (
            <View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>
              <View >
                <Text style={styles.welcome}>
                  Sides
                </Text>
              </View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>

              {pizzaSides}
            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaTest: state.mainPage.pizzaTest,
      pizzaCost: state.mainPage.pizzaCost,
      customSidesArr: state.mainPage.customSidesArr,
      totalSidesCost: state.mainPage.totalSidesCost,
      pizzaQuantity: state.mainPage.pizzaQuantity,
      pizzaSidesArray: state.mainPage.pizzaSidesArray,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(Sides)
