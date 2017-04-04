import {UPDATE_MAIN, CARD_DECLINE, CARD_ACCEPTED, UPDATE_SWIPER_ID, UPDATE_HUMANS, HUMAN_CARD_ACCEPTED, HUMAN_CARD_DECLINED} from '../actions/updateMainPageActions'

const initialState = {
    main: '',
    cards: [],
    seenId: [],
    humanCards: [],
    swiperId: ''
};
export default (state = initialState, action) => {
    switch (action.type){
        case UPDATE_MAIN:
            return {...state, cards: action.update}
        case UPDATE_HUMANS:
            return { ...state, humanCards: action.update}
        case CARD_DECLINE:
            let newDeclinedArray = [ ...state.cards ]
            newDeclinedArray.shift()
            return { ...state, cards: newDeclinedArray  }
        case CARD_ACCEPTED:
            let newAcceptedArray = [ ...state.cards ]
            newAcceptedArray.shift()
            return { ...state, cards: newAcceptedArray  }
        case HUMAN_CARD_ACCEPTED:
            let newHumanAcceptedArray = [ ...state.humanCards]
            newHumanAcceptedArray.shift()
            return { ...state, humanCards: newHumanAcceptedArray}
        case HUMAN_CARD_DECLINED:
            let newHumanDeclinedArray = [ ...state.humanCards]
            console.log(newHumanDeclinedArray)
            newHumanDeclinedArray.shift()
            return { ...state, humanCards: newHumanDeclinedArray}
        case UPDATE_SWIPER_ID:
            console.log(action.id)
            return { ...state, swiperId: action.id}
        default:
            return state
    }

}
