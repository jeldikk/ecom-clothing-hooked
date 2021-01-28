import UserActionTypes from "./user.types"

export const setCurrentUser = (user) => (
    {
        type: UserActionTypes.SET_CURRENT_USER,
        payload: user.currentUser
    }
)

export const googleSignInStart = () => {
    return {
        type: UserActionTypes.GOOGLE_SIGNIN_START
    }
}

export const googleSiginInSuccess = (user)=>{
    return {
        type: UserActionTypes.GOOGLE_SIGNIN_SUCCESS,
        payload: user
    }
}

export const googleSignInFailure = (errorMessage) => {
    return {
        type: UserActionTypes.GOOGLE_SIGNIN_FAILURE,
        payload: errorMessage
    }
}

export const emailSignInStart = ({email, password})=>{
    return {
        type: UserActionTypes.EMAIL_SIGNIN_START,
        payload: {
            email,
            password
        }
    }
}

export const emailSignInSuccess = (user)=>{
    return {
        type: UserActionTypes.EMAIL_SIGIN_SUCCESS,
        payload: user
    }
}

export const emailSignInFailure = (errorMessage) => {
    return {
        type: UserActionTypes.EMAIL_SIGNIN_FAILURE,
        payload: errorMessage
    }
}