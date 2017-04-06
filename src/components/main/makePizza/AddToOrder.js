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


class AddToOrder extends Component {



    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.button}>
              Submit
            </Text>

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
  },
  button: {

    height: 40,
    textAlign: 'center',
    width: 130,
    borderRadius: 20,

    borderWidth: 2,
    borderColor: '#1ECD97',
    color: '#1ECD97',
    fontWeight: 'bold',

    // transition: all 0.25s ease;
  }

});

export default connect(mapStateToProps, mapDispatchToActionCreators)(AddToOrder)
