import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';


import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'


class LineItems extends Component {

    onDelete (id) {
      this.props.updateMain({deleted: this.props.deleted.concat([id])})
    }

    render() {
        let Items = this.props.cartItems
        .filter(item => this.props.deleted.indexOf(item.id) === -1)
        .map(item=> {
          return(
            <Item key={item.id} id={item.id} onDelete={id => this.onDelete(id)} >
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:20}}>{this.props.pizzaSizeNameArray[item.data.size-1]} {item.data.toppings.length} Topping {item.type}</Text>
                <Text style={{flex:4}}>{"$"+parseFloat(item.data.price).toFixed(2)}</Text>
              </View>
            </Item>
          );
        });

        return (
          <View className="items">
            {Items}
          </View>
        )
    }
}

class Item extends Component {
  render() {
    return (
      <View className="item" style={{flex:1, flexDirection: 'row' , paddingTop:5}}>

          <TouchableHighlight
            style={{flex:.9}}
            onPress={() =>{
              this.props.onDelete(this.props.id)
            }}>
            <View>
              <Text>
                X
              </Text>
            </View>
          </TouchableHighlight>

          <View style={{flex:20}}>
            {this.props.children}
          </View>

      </View>
    )
  }
}

mapStateToProps = (state) => {
    return {
      totalCost: state.mainPage.totalCost,
      deleted: state.mainPage.deleted,
      cartItems: state.mainPage.cartItems,
      pizzaSizeNameArray: state.mainPage.pizzaSizeNameArray,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(LineItems)
