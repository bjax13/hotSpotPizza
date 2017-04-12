import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateSettings } from '../../../actions/updateSettingsPageActions';
import { updateMain } from '../../../actions/updateMainPageActions';


import {
    StyleSheet,
    Text,
    View,
} from 'react-native'


class TotalLine extends Component {

    render() {

        return (
          <View>
            <View style={{borderWidth: .5 , borderColor: '#CCC', marginTop: 5}}>
            </View>
            <Text style={{fontSize: 1, height: 2,}}></Text>
            <View style={{borderWidth: .5 , borderColor: '#CCC'}}>
            </View>

            <View style={{paddingTop: 10, paddingRight: 8, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
              <Text>Total</Text>
              <Text>{"$"+parseFloat(this.props.totalCost).toFixed(2)}</Text>
            </View>
          </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
      totalCost: state.mainPage.totalCost,
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

export default connect(mapStateToProps, mapDispatchToActionCreators)(TotalLine)
