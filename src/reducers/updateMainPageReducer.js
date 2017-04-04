import { UPDATE_MAIN } from '../actions/updateSettingsPageActions'

const initialState = {

  testVal1: 'Test Main Success'
}



export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
