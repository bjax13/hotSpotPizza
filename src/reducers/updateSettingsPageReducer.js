import { UPDATE_SETTINGS } from '../actions/updateSettingsPageActions'

const initialState = {

  testVal: 'key0'
}



export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
