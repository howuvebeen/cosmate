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
            return { ...state, lreview: action.payload};
        case AuthTypes.REVIEW:
            return { ...state, review: action.payload};
        case AuthTypes.REVIEW_HISTORY:
            return { ...state, hreview: action.payload};



        case AuthTypes.INTEREST:
            return { ...state, interest: action.payload};
        case AuthTypes.LIKE:
            return { ...state, like: action.payload};
        case AuthTypes.LIKED_REVIEWS:
            return { ...state, likedreview: action.payload};
        case AuthTypes.SEARCH:
            return { ...state, search: action.payload};
        case AuthTypes.EVENT:
            return { ...state, event: action.payload};
        case AuthTypes.INSTAGRAM:
            return { ...state, instagram: action.payload};
    }
    return state;
}