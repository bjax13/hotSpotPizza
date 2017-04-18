import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';

import axios from 'axios';

import TotalLine from './TotalLine'
import LineItems from './LineItems'

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'


class OrderSummary extends Component {
    render() {
        return (
            <View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>
              <View >
                <Text style={styles.welcome}>
                  Summary
                </Text>
              </View>
              <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
              </View>
              <LineItems></LineItems>
              <TotalLine></TotalLine>

            </View>

        )
    }
}

mapStateToProps = (state) => {
    return {

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

export default connect(mapStateToProps, mapDispatchToActionCreators)(OrderSummary)
