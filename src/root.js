import { combineReducers } from 'redux'
import updateSettingsPageReducer from './reducers/updateSettingsPageReducer'
import updateMainPageActions from './reducers/updateMainPageReducer'

export default combineReducers({
  settingsPage: updateSettingsPageReducer,
    mainPage: updateMainPageActions,

});
