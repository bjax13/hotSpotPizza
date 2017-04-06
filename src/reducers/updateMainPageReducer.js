import { UPDATE_MAIN } from '../actions/updateMainPageActions'

const initialState = {

  pizzaTest: false,
  submitPizza: false,

  makePizzaModalVisible: false,
  totalCost: 0.00,
  pizzaQuantity: 1,
  pizzaQuantityArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  pizzaSize: 'Large',
  pizzaSizeArray: [],
  pizzaSizeNameArray: ['Small','Medium', 'Large', 'X Large', 'XX Large'],
  pizzaSauce: 'Red Sauce',
  pizzaSauceArray: ['Red Sauce'],
  pizzaCrust: 'Red Crust',
  pizzaCrustArray: [],
  pizzaCrustNameArray: ['Red Crust','Garlic White Crust', 'BBQ Crust', 'Buffalo Crust'],
  pizzaToppingArray: [],
}



export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
