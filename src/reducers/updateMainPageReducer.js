import { UPDATE_MAIN } from '../actions/updateMainPageActions'

const initialState = {

  makePizzaModalVisible: false,
  totalCost: 0.00,
  pizzaQuantity: 1,
  pizzaQuantityArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  pizzaSizeArray: ['Small','Medium', 'Large', 'X Large', 'XX Large'],
  pizzaSauceArray: ['Red Sauce','Garlic White Sauce', 'BBQ Sauce', 'Buffalo Sauce'],
}



export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
