import {UPDATE_MAIN} from '../actions/updateMainPageActions'

const initialState = {

  pizzaTest: true,
  loginModal: true,
  submitPizza: false,
  userCredentials: {},

  logoPosition: 0,
  logoUri:
  [
    'https://www.48hourslogo.com/48hourslogo_data/2014/09/09/201409090947415741.png',
    'https://www.48hourslogo.com/48hourslogo_data/2014/09/08/2014090814323320522.jpg',
    'https://www.48hourslogo.com/48hourslogo_data/2014/09/09/2014090903062818739.jpg',
    'https://www.48hourslogo.com/48hourslogo_data/2014/09/09/2014090903054718739.jpg',
    'https://www.48hourslogo.com/48hourslogo_data/2014/09/10/201409101224082397.jpg',
  ],

  user: {
    "id": "ebdb2707-7d05-46e3-a853-24d8ec5cda9d",
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
  addToOrderArr: [],
  pizzaArray: [],
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
  orderHistoryPageCount: 0,
  pizzaQuantityArray: [1,2,3,4,5,6,7,8,9,10,],
  pizzaSize: [
    'Large', 12, 3
  ],
  pizzaSizeArray: [],
  pizzaSizeNameArray: [
    'Small', 'Medium', 'Large', 'X Large', 'XX Large'
  ],
  pizzaSauce: [
    'Red Sauce', 0, -1
  ],
  pizzaSauceArray: ['Red Sauce'],
  pizzaCrust: [
    'White', 0, 1
  ],
  pizzaCrustArray: [],
  pizzaCrustNameArray: [
    'Red Crust', 'Garlic White Crust', 'BBQ Crust', 'Buffalo Crust'
  ],

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
  data: [
    {
      id: 1,
      text: 'This is a test'
    }, {
      id: 2,
      text: 'This is a test'
    }, {
      id: 3,
      text: 'This is a test'
    }, {
      id: 4,
      text: 'This is a test'
    }
  ]
}

export default(state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
