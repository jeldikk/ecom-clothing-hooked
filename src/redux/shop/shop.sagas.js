import {call, put, takeEvery} from 'redux-saga/effects'
import { convertCollectionSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchCollectionFailure, fetchCollectionStart, fetchCollectionSuccess } from './shop.actions';

import ShopActionTypes from "./shop.types"

function* fetchCollectionAsyncWorker(){
    console.log("first console log")
    try{
        const collectionRef = firestore.collection('collections');
        // yield put(fetchCollectionStart());
        let snapshot = yield collectionRef.get();
        let collectionMap = yield call(convertCollectionSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionMap))

    }
    catch(err){
        yield put(fetchCollectionFailure(err.message))
    }
    
}

export function* fetchCollectionStartSaga(){
    yield takeEvery(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionAsyncWorker)
}