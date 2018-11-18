import actiontypes from './actions/authAction'

const INITIAL_STATE={
    USERUID: null,
    REQUEST: null
}
export default (status = INITIAL_STATE, action)=>{
    switch (action.type) {
        case actiontypes.USERUID: {
            return { ...state, USERUID: action.payload }
        }
        case actiontypes.REQUEST: {
            return { ...state, REQUEST: action.payload }
        }
        default: {
            return state;
        }
    }
}