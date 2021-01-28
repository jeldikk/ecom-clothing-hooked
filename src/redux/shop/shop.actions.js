import { convertCollectionSnapshotToMap, firestore } from "../../firebase/firebase.utils"
import ShopActionTypes from "./shop.types"

export const setShopDataCollection = (collection) => {
    return {
        type: ShopActionTypes.SET_SHOP_DATA,
        payload: collection
    }
}

export const fetchCollectionStart = () => {
    return {
        type: ShopActionTypes.FETCH_COLLECTION_START,
    }
}

export const fetchCollectionSuccess = (collectionMap) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
        payload: collectionMap
    }
}

export const fetchCollectionFailure = (errorMessage) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
        payload: errorMessage
    }
}

export const fetchCollectionStartAsync = () => {
    
    return (dispatch, arg2) => {
        
        // since the action is returning an object, thunk middleware will come into picture and expects the returned
        // function to take two arguments namely dispatch and getState functions.

        // console.log({arg2: arg2});
        // console.log({arg1: dispatch});

       const collectionRef = firestore.collection("collections")
        dispatch(fetchCollectionStart())
        
        collectionRef.get()
            .then((snapshot) => {
                const collectionMap = convertCollectionSnapshotToMap(snapshot);
                dispatch(fetchCollectionSuccess(collectionMap));
                
            })
            .catch((error)=>{
                dispatch(fetchCollectionFailure(error.message))
            })
            
    }
}