import { INFOUSER_UPDATE } from '../actions/constants'

const initialState = null

export default function infouserReducer(state = initialState, action) {
  switch (action.type) {
    case INFOUSER_UPDATE:
      state = action.infouser
      return state
    default:
      return state
  }
}
// case VISTRIPS_UPDATE:
//   return{
//     ...state,
//     regs: action.regs
//   };
// case DETAIL_UPDATE:
//   return{
//     ...state,
//     details: { ...state.details, [action.regDetail.regTripId]: action.regDetail}
//   }
