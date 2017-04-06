import { UPDATE_MAIN } from '../actions/updateMainPageActions'

const initialState = {

  pizzaTest: false,

  makePizzaModalVisible: false,
  totalCost: 0.00,
  pizzaQuantity: 1,
  pizzaQuantityArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  pizzaSize: 'Large',
  pizzaSizeArray: ['Small','Medium', 'Large', 'X Large', 'XX Large'],
  pizzaSauce: 'Red Sauce',
  pizzaSauceArray: ['Red Sauce','Garlic White Sauce', 'BBQ Sauce', 'Buffalo Sauce'],
  pizzaCrust: 'Red Crust',
  pizzaCrustArray: ['Red Crust','Garlic White Crust', 'BBQ Crust', 'Buffalo Crust'],
  pizzaToppingArray: [
        {
            "id": 1,
            "name": "Pepperoni",
            "price": "0.50",
            "image": null
        },
        {
            "id": 2,
            "name": "Shrooms",
            "price": "0.50",
            "image": null
        },
        {
            "id": 3,
            "name": "Pineapple",
            "price": "1.00",
            "image": null
        }],
}



export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
