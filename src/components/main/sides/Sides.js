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
        console.log(response.data.results);
        for (var i = 0; i < response.data.results.length; i++) {
          response.data.results[i].count = 0
        }
        console.log(response.data.results);

        for (var i = 2; i <= pages; i++) {
          axios.get(pageURL+i)
            .then((response)=>{
              for (var i = 0; i < response.data.results.length; i++) {
                response.data.results[i].count = 0
              }
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


          console.log(sidesObj);

            let checkTest = true;

            getCount = () => {
              return sidesObj.count
            }

            decrement = () =>{
              let arr = this.props.pizzaSidesArray;


              if (arr[i].count > 0) {
                console.log(arr);
                arr[i].count--;
                console.log('dec '+ i + ' ' + arr[i].count) ;

                console.log(arr[i].count);
                this.props.updateMain({pizzaSidesArray: arr})

              }
              this.forceUpdate()

            }
            increment = () =>{
              let arr = this.props.pizzaSidesArray;
              console.log(arr);
              arr[i].count++;
              console.log('inc '+ i + ' ' + arr[i].count);

              console.log(arr);
              this.props.updateMain({pizzaSidesArray: arr})
              this.forceUpdate()
            }

            addSides = (sidesInputObj) =>{

              let newSideArr = this.props.customSidesArr;
              newSideArr.push(sidesInputObj.id);
              this.props.updateMain({customSidesArr: newSideArr});
              this.props.updateMain({pizzaCost: (this.props.pizzaCost + (this.props.pizzaQuantity*parseFloat(sidesInputObj.price))) });
              this.props.updateMain({totalSidesCost: this.props.totalSidesCost + parseFloat(sidesInputObj.price)});

            }
            subSides = (sidesInputObj) =>{
              let newSideArr = this.props.customSidesArr;
              this.props.updateMain({pizzaCost: (this.props.pizzaCost - (this.props.pizzaQuantity*parseFloat(sidesInputObj.price)))})
              this.props.updateMain({totalSidesCost: this.props.totalSidesCost - parseFloat(sidesInputObj.price)})
              for (var i = 0; i < newSideArr.length; i++) {
                if (newSideArr[i] === sidesInputObj.id) {
                  newSideArr.splice(i,1)
                  i = newSideArr.length;
                }
              }
              this.props.updateMain({customSidesArr: newSideArr});
            }

            return (
              <View key={sidesObj.name} style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                <View style={{flex:4}}>
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
                </View>

                <View style={{flex:1.5,flexDirection: 'row'}}>
                  <TouchableHighlight
                    onPress={ decrement}
                    style={{flex:1}}>
                    <Text> - </Text>
                  </TouchableHighlight>
                  <Text style={{flex:1}}>
                    {this.props.pizzaSidesArray[i].count}
                  </Text>
                  <TouchableHighlight
                    onPress={ increment}
                    style={{flex:1}}>
                    <Text> + </Text>
                  </TouchableHighlight>
                </View>
                <View style={{flex:1, alignItems: 'flex-end'}}>
                  <Text >{"$"+parseFloat(sidesObj.price).toFixed(2)}</Text>
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
