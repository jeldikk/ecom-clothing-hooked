import { all, call } from 'redux-saga/effects'

import {fetchCollectionStartSaga} from "./shop/shop.sagas"
import userAuthSaga from "./user/user.sagas"


export default function* rootSaga(){
    yield all([
        call(fetchCollectionStartSaga),
        call(userAuthSaga)
    ])
}