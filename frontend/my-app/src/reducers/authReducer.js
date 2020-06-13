import { AuthTypes } from "../constants/actionTypes";

export default function(state = {}, action) {
    switch(action.type) {
        case AuthTypes.LOGIN:
            return { ...state, authenticated: true, token: action.payload};
        case AuthTypes.LOGOUT:
            return { ...state, authenticated: false, token: null};
        case AuthTypes.TOKEN:
            return { ...state, user: action.payload};
        case AuthTypes.USER_PROFILE:
            return { ...state, profile: action.payload};
        case AuthTypes.PRODUCT_LIST:
            return { ...state, lproduct: action.payload};
        case AuthTypes.PRODUCT:
            return { ...state, product: action.payload};
        case AuthTypes.REVIEW_LIST:
            return { ...state, review: action.payload};
    }
    return state;
}