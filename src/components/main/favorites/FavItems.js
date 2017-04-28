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
        for (var i = 0; i < response.data.results.length; i++) {
          response.data.results[i].count = 0
        }

        for (var i = 2; i <= pages; i++) {
          axios.get(pageURL+i)
            .then((response)=>{
              for (var i = 0; i < response.data.results.length; i++) {
                response.data.results[i].count = 0
              }
              this.props.updateMain({pizzaSidesArray: this.props.pizzaSidesArray.concat(response.data.results)})
              let newObj = {}

              for (var i = 0; i < this.props.pizzaSidesArray.length; i++) {
                newObj[i+1]=this.props.pizzaSidesArray[i]
              }
              this.props.updateMain({orderHistorySidesObject: newObj})
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

    render() {

        let pizzaSides = this.props.pizzaSidesArray.map( (sidesObj, i) => {

            let defaultVal = true;

            getCount = () => {
              return sidesObj.count
            }

            decrement = () =>{

              let arr = this.props.pizzaSidesArray;
              if (arr[i].count > 0) {
                arr[i].count--;
                this.props.updateMain({pizzaSidesArray: arr})

                if (this.props.customSidesArr.indexOf(arr[i].id) != -1) {
                  this.props.updateMain({sidesCost: (this.props.sidesCost - (parseFloat(arr[i].price))) });
                  this.props.updateMain({totalSidesCost: this.props.totalSidesCost - parseFloat(arr[i].price)});
                }

              }
              this.forceUpdate()
            }
            increment = () =>{
              let arr = this.props.pizzaSidesArray;
              arr[i].count++;
              defaultVal= false;
              this.props.updateMain({pizzaSidesArray: arr})

              if (this.props.customSidesArr.indexOf(arr[i].id) != -1) {
                this.props.updateMain({sidesCost: (this.props.sidesCost + (parseFloat(arr[i].price))) });
                this.props.updateMain({totalSidesCost: this.props.totalSidesCost + parseFloat(arr[i].price)});
              }else {
                let newSideArr = this.props.customSidesArr;
                newSideArr.push(sidesObj.id);
                this.props.updateMain({customSidesArr: newSideArr});
                this.props.updateMain({sidesCost: (this.props.sidesCost + (sidesObj.count*parseFloat(sidesObj.price))) });
                this.props.updateMain({totalSidesCost: this.props.totalSidesCost + parseFloat(sidesObj.price)});
              }
              this.forceUpdate()
            }

            return (
              <View key={sidesObj.name} style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                <View style={{flex:4}}>
                  <Text style={styles.optionTitle}>{sidesObj.name}</Text>

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
                  Favorite Combos
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
      sidesCost: state.mainPage.sidesCost,
      customSidesArr: state.mainPage.customSidesArr,
      totalSidesCost: state.mainPage.totalSidesCost,
      pizzaSidesArray: state.mainPage.pizzaSidesArray,
      orderHistorySidesObject: state.mainPage.orderHistorySidesObject,
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
