import {takeLatest, put, all, call} from "redux-saga/effects"
import UserActionTypes from "./user.types"

import {auth, googleProvider, createUserProfileDocument} from "../../firebase/firebase.utils"
import { emailSignInFailure, emailSignInSuccess, googleSiginInSuccess, googleSignInFailure, setCurrentUser } from "./user.actions";

function* googleSignInWorker(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        // console.log(user)
        const userRef = yield call(createUserProfileDocument, user)
        const snapShot = yield userRef.get();
        yield put(googleSiginInSuccess({id: snapShot.id, ...snapShot.data()}))
        // yield put(setCurrentUser(snapShot))
    }
    catch(err){
        yield put(googleSignInFailure(err.message))
    }
    
    
}

function* emailSignInWorker(action){

    const {payload:{email, password}} = action;
    
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password)
        const userRef = yield call(createUserProfileDocument, user);
        const snapShot = yield userRef.get()
        yield put(emailSignInSuccess({id: snapShot.id, ...snapShot.data()}))
    }
    catch(err){
        yield put(emailSignInFailure(err.message))
    }
}

function* onGoogleSignInStartSaga(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, googleSignInWorker)
}

function* onEmailSignInStartSaga(){
    yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, emailSignInWorker)
}

export default function* userAuthSaga(){
    yield all([
        call(onGoogleSignInStartSaga),
        call(onEmailSignInStartSaga)
    ])
}