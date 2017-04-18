import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import { Actions } from 'react-native-router-flux'
import CheckBox from 'react-native-checkbox';
import axios from 'axios';
import moment from 'moment';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'

class OrderHistory extends Component {
  componentDidMount(){
    axios.get('http://10.100.0.98:8888/api/orders/')
      .then((response) => {
        let orderCount = response.data.count
        let resultsPerPage = response.data.results.length
        let pages = Math.ceil(orderCount / resultsPerPage);
        let pageURL = response.data.next;

        if (pageURL.indexOf('=') != -1) {
          pageURL = pageURL.slice(0,pageURL.indexOf('=')+1)
        }

        this.props.updateMain({orderHistoryArray: response.data.results});

        for (var i = 2; i <= pages; i++) {
          axios.get(pageURL+i)
            .then((response)=>{
              this.props.updateMain({orderHistoryArray: this.props.orderHistoryArray.concat(response.data.results)})
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

    render() {

        let pizzaToppings = this.props.orderHistoryArray.map( (orderObj, i) => {
            console.log(orderObj);
            console.log(i);
            console.log(moment(orderObj.created_at).format('LL'));

            return (
              <View key={orderObj.id} style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                <Text style={[styles.instructions,{flex:10}]}>{moment(orderObj.created_at).format('MMM Do')}</Text>
                <Text style={[styles.instructions,{flex:5}]}>{"$"+parseFloat(orderObj.total).toFixed(2)}</Text>
                <Text style={[styles.instructions,{flex:4}]}>Details ></Text>
              </View>
            );
        });

        return (
            <View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>
              <View >
                <Text style={styles.welcome}>
                  Orders
                </Text>
              </View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>

              {pizzaToppings}
            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaTest: state.mainPage.pizzaTest,
      orderHistoryArray: state.mainPage.orderHistoryArray,
      orderHistoryModal: state.mainPage.orderHistoryModal,
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
    fontSize: 17,
    color: '#333333',
    marginBottom: 5,
    marginTop: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToActionCreators)(OrderHistory)
