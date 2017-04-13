import { UPDATE_MAIN } from '../actions/updateMainPageActions'

const initialState = {

  pizzaTest: false,
  submitPizza: false,

  makePizzaModalVisible: false,
  makeCartModalVisible: false,
  makeSideModalVisible: false,
  totalCost: 0.00,
  pizzaCost: 0.00,
  customToppingArr: [],
  customSidesArr: [],
  customPizzaObj: {
            "price": "0.00",
            "public_display": false,
            "size": 1,
            "crust": 1,
            "toppings": [1]
        },
  totalToppingsCost: 0.00,
  totalSidesCost: 0.00,
  pizzaQuantity: 1,
  pizzaQuantityArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  pizzaSize: ['Large', 12, 3],
  pizzaSizeArray: [],
  pizzaSizeNameArray: ['Small','Medium', 'Large', 'X Large', 'XX Large'],
  pizzaSauce: ['Red Sauce',0 , -1],
  pizzaSauceArray: ['Red Sauce'],
  pizzaCrust: ['White', 0 , 1],
  pizzaCrustArray: [],
  pizzaCrustNameArray: ['Red Crust','Garlic White Crust', 'BBQ Crust', 'Buffalo Crust'],
  pizzaToppingArray: [],
  pizzaSidesArray: [],
  cartItems: [],
  deleted: [],
  data: [ {id: 1,text: 'This is a test'}, {id: 2,text: 'This is a test'}, {id: 3,text: 'This is a test'}, {id: 4,text: 'This is a test'},],
}



export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
