import { UPDATE_SETTINGS } from '../actions/updateSettingsPageActions'

const initialState = {

  animationType: 'fade',
  modalVisible: false,
  transparent: false,
  selectedSupportedOrientation: 0,
  currentOrientation: 'unknown',
  searchDistance: 50,
  searchDistanceMin: 1,
  searchDistanceMax: 100,
  setAge: 50,
  setAgeLow: 10,
  setAgeHigh: 90,
  setAgeMin: 1,
  setAgeMax: 100,
  showOnGrowlr: true,
  notificationNewMatch: true,
  notificationMessages: true,
  notificationMessageLikes: true,
  notificationSuperLikes: true,
  notificationInAppVibrations: false,
  notificationInAppSounds: false,
  searchDogs: true,
  searchCats: true,
  searchBunnies: true,
  searchHamsters: true,
  searchExotic: true,
}



export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return Object.assign({}, state, action.update)

    default:
      return state

  }
}
