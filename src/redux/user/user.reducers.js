import UserActionTypes from "./user.types"


let INITIAL_STATE = {
    currentUser: null,
    errorMessage: null
}

const userReducer = (state=INITIAL_STATE, action) => {

    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return {
                
                currentUser: action.payload
            };
        case UserActionTypes.GOOGLE_SIGNIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                errorMessage: null,
            }
        case UserActionTypes.EMAIL_SIGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                errorMessage: null,
            }
        case UserActionTypes.GOOGLE_SIGNIN_FAILURE:
        case UserActionTypes.EMAIL_SIGNIN_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default userReducer