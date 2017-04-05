import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native'


class Toppings extends Component {

    render() {

        // let pizzaQty = this.props.pizzaQuantityArray.map( (s, i) => {
        //     return <Picker.Item key={i} value={s} label={s.toString()} />
        // });

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
            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {
      pizzaTest: state.mainPage.pizzaTest,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(Toppings)
