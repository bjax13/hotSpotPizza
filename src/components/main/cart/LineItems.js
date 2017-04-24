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
      for (var i = 0; i < this.props.cartItems.length; i++) {
        if (id === this.props.cartItems[i].id) {
          let totalCost = this.props.totalCost;
          totalCost -= this.props.cartItems[i].data.price * this.props.cartItems[i].data.count
          this.props.updateMain({totalCost: totalCost})
        }
      }
      this.props.updateMain({deleted: this.props.deleted.concat([id])})
    }

    render() {
        let Items = this.props.cartItems
          .filter(item => this.props.deleted.indexOf(item.id) === -1)
          .map(item=> {
            let ItemName = '';
            let Price = 0;

            if (item.type === 'Side') {
              ItemName = item.data.name
            }else if (item.type === 'Pizza') {
              ItemName = (this.props.pizzaSizeNameArray[item.data.size-1] + item.data.toppings.length +' Topping '+item.type);
            }
            else {
              ItemName = 'erroros'
            }

            decrement = () =>{
              console.log( 'decrement');

              // let arr = this.props.pizzaSidesArray;
              // if (arr[i].count > 0) {
              //   arr[i].count--;
              //   this.props.updateMain({pizzaSidesArray: arr})
              //
              //   if (this.props.customSidesArr.indexOf(arr[i].id) != -1) {
              //     this.props.updateMain({sidesCost: (this.props.sidesCost - (parseFloat(arr[i].price))) });
              //     this.props.updateMain({totalSidesCost: this.props.totalSidesCost - parseFloat(arr[i].price)});
              //   }
              //
              // }
              // this.forceUpdate()
            }
            increment = () =>{
              console.log('increment');

              // let arr = this.props.pizzaSidesArray;
              // arr[i].count++;
              // defaultVal= false;
              // this.props.updateMain({pizzaSidesArray: arr})
              //
              // if (this.props.customSidesArr.indexOf(arr[i].id) != -1) {
              //   this.props.updateMain({sidesCost: (this.props.sidesCost + (parseFloat(arr[i].price))) });
              //   this.props.updateMain({totalSidesCost: this.props.totalSidesCost + parseFloat(arr[i].price)});
              // }else {
              //   let newSideArr = this.props.customSidesArr;
              //   newSideArr.push(sidesObj.id);
              //   this.props.updateMain({customSidesArr: newSideArr});
              //   this.props.updateMain({sidesCost: (this.props.sidesCost + (sidesObj.count*parseFloat(sidesObj.price))) });
              //   this.props.updateMain({totalSidesCost: this.props.totalSidesCost + parseFloat(sidesObj.price)});
              // }
              // this.forceUpdate()
            }

          return(
            <Item key={item.id} id={item.id} onDelete={id => this.onDelete(id)} >
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:20}}>{ItemName}</Text>
                <TouchableHighlight
                  onPress={ decrement}
                  style={{flex:3}}>
                  <Text> - </Text>
                </TouchableHighlight>
                <Text style={{flex:2}}>{item.data.count}</Text>
                <TouchableHighlight
                  onPress={ increment}
                  style={{flex:3}}>
                  <Text> + </Text>
                </TouchableHighlight>
                <Text style={{flex:5}}>{"$"+parseFloat(item.data.price * item.data.count).toFixed(2)}</Text>
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
