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


class Toppings extends Component {
  componentDidMount(){
    axios.get('http://10.100.0.98:8000/api/toppings/')
      .then((response) => {
        let toppingCount = response.data.count
        let resultsPerPage = response.data.results.length
        let pages = toppingCount / resultsPerPage;
        let pageURL = response.data.next;

        if (pageURL.indexOf('=') != -1) {
          pageURL = pageURL.slice(0,pageURL.indexOf('=')+1)
          console.log(pageURL);
          console.log(pages);
        }

        this.props.updateMain({pizzaToppingArray: response.data.results});

        for (var i = 2; i <= pages; i++) {
          axios.get(pageURL+i)
            .then((response)=>{
              this.props.updateMain({pizzaToppingArray: this.props.pizzaToppingArray.concat(response.data.results)})
            })

        }


      })
      .catch((error) => {
        console.log(error);
      });
  }

    render() {

        let pizzaToppings = this.props.pizzaToppingArray.map( (toppingObj, i) => {

            let checkTest = true;
            return (
              <View key={toppingObj.name} style={{paddingTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                <CheckBox
                  label={toppingObj.name}
                  checked={this.checkTest}
                  labelStyle={styles.optionTitle}
                  onChange={(checked) => {
                    this.checkTest = !checked;
                  }}
                />
                <Text >{"$"+parseFloat(toppingObj.price).toFixed(2)}</Text>
              </View>
            );
        });

        return (
            <View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>
              <View >
                <Text style={styles.welcome}>
                  Toppings
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
      pizzaToppingArray: state.mainPage.pizzaToppingArray,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(Toppings)
