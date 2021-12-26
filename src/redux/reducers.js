import {ADD_FIREBASE_USER } from "./actions";

const initialState = {
    user: {},
    activities: [],
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FIREBASE_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export default userReducer;