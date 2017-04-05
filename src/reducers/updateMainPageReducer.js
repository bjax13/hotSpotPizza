import { UPDATE_MAIN } from '../actions/updateMainPageActions'

const initialState = {

  makePizzaModalVisible: false,
  totalCost: 0.00
}



export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
