import { UPDATE_MAIN } from '../actions/updateMainPageActions'

const initialState = {

  pizzaTest: false,
  submitPizza: false,

  user:  {
              "id": "dc6bb53d-2f23-4131-8ea4-a81a24063c0d",
              "last_login": "2017-04-19T21:12:24.286538Z",
              "email": "a@a.com",
              "first_name": "",
              "last_name": "",
              "image": null,
              "preferred_name": "",
              "gender": null,
              "birthdate": null,
              "phone": "",
              "date_joined": "2017-04-04T17:19:47.218582Z",
              "is_developer": false
            },

  totalCost: 0.00,
  pizzaCost: 0.00,
  sidesCost: 0.00,

  customToppingArr: [],
  customSidesArr: [],
  customPizzaObj: {"price": "0.00","public_display": false,"size": 1,"crust": 1,"toppings": [1]},
  totalToppingsCost: 0.00,
  totalSidesCost: 0.00,

  pizzaQuantity: 1,
  orderHistoryPageCount: 0,
  pizzaQuantityArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  pizzaSize: ['Large', 12, 3],
  pizzaSizeArray: [],
  pizzaSizeNameArray: ['Small','Medium', 'Large', 'X Large', 'XX Large'],
  pizzaSauce: ['Red Sauce',0 , -1],
  pizzaSauceArray: ['Red Sauce'],
  pizzaCrust: ['White', 0 , 1],
  pizzaCrustArray: [],
  pizzaCrustNameArray: ['Red Crust','Garlic White Crust', 'BBQ Crust', 'Buffalo Crust'],

  orderHistoryArray: [],
  orderHistorySidesCountObject: {},
  orderHistorySidesObject: {},
  orderHistoryPizzaCountObject: {},
  orderHistoryPizzaObject: {},
  orderHistoryToppingObject: {},
  orderHistoryModal: false,
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
