import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import { Actions } from 'react-native-router-flux'


import FavItems from './FavItems';
import AddToOrder from '../makePizza/AddToOrder';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
} from 'react-native'


class Favorites extends Component {

     setModalVisible(visible) {
       this.props.updateMain({
         customToppingArr: [],
         pizzaCrust: ['White', 0 , 1],
         pizzaSauce: ['Red Sauce',0 , -1],
         pizzaQuantity: 1,
         pizzaSize: ['Large', 12, 3],
         totalToppingsCost: 0,
       })
     }


    render() {

        return (
           <View style={{marginTop: 22,flex: 1}}>
            <View style={{margin: 5, flex:1}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7d9de'}}>
                <Text style= {{fontWeight: '600'}}>Order Total {'$'+(this.props.totalCost+this.props.pizzaCost).toFixed(2)}</Text>
              </View>

              <TouchableHighlight
                style={{position: 'absolute', right: 20 , top: 20 }}
                onPress={Actions.pop}>
                <Text style={{fontWeight: '900', color: 'gray'}}>X</Text>
              </TouchableHighlight>

              <View style={{flex:9.5}}>
                <ScrollView >

                  <ScrollView style={{flex:9.5, padding: 15}}>
                    <FavItems></FavItems>
                    <AddToOrder type="favorite"></AddToOrder>
                  </ScrollView>

                </ScrollView>
              </View>
            </View>
           </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      totalCost: state.mainPage.totalCost,
      pizzaCost: state.mainPage.pizzaCost,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(Favorites)
