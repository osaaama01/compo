export const ADD_FIREBASE_USER = 'ADD_FIREBASE_USER';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const GET_ACTIVITIES_LIST = 'GET_ACTIVITIES_LIST';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';

const API_URL_GET_ACTIVITIES = 'https://next-app-eight-sandy.vercel.app/api/getActivities';
const API_URL_GETUSERS = 'https://next-app-eight-sandy.vercel.app/api/getUsers';
const API_URL_ADDACTIVITY = 'https://next-app-eight-sandy.vercel.app/api/addActivity';


export const getActivitiesList = () => {
    try {
        return async dispatch => {
            const result = await fetch(
                API_URL_GET_ACTIVITIES,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const activities = await result.json();
            // console.log("Activites: " + activities);
            if (activities) {
                // console.log("Activites: " + activities);
                dispatch(
                    {
                        type: GET_ACTIVITIES_LIST,
                        payload: activities
                    }
                );
            }
            else
                throw new Error("API call failed.");
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const addActivity = (id,title, description) => {
    return dispatch => {
        fetch(
            API_URL_ADDACTIVITY,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, title, description }),
            })
            .then(result => result.json())
            .then((data) => {
                dispatch(
                    {
                        type: ADD_ACTIVITY,
                        payload: data
                    }
                );
            },
                () => {
                    throw new Error("API POST call failed.")
                }
            ).catch((err) => console.log(err));
    }
}

export const removeActivity = (id) => {
    return dispatch => {
        dispatch(
            {
                type: REMOVE_ACTIVITY,
                payload: id
            }
        );
    }
}

export const addFirebaseUser = (user) => {
    return dispatch => {
        dispatch(
            {
                type: ADD_FIREBASE_USER,
                payload: user
            }
        );
    }
}
