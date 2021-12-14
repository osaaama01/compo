import { GET_PEOPLE_LIST, ADD_ACTIVITY, GET_ACTIVITIES_LIST,REMOVE_ACTIVITY } from "./actions";

const initialState = {
    users: [],
    activities: [],
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PEOPLE_LIST:
            return { ...state, users: action.payload };
        case GET_ACTIVITIES_LIST:
            return { ...state, activities: action.payload };
        case ADD_ACTIVITY:
            let activity = state.activities;
            activity.push(action.payload);
            return { ...state, activities: activity };
        case REMOVE_ACTIVITY:
            return { ...state, activities: state.activities.filter(activity=>activity.id !== action.payload) };
        default:
            return state;
    }
}

export default userReducer;