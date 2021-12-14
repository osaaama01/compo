import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import thunk from 'redux-thunk';
import userReducer from "./reducers";

const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
  }

export const rootReducer = combineReducers({userReducer}); // all the reducers you have written


const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () =>
{
    let Store = createStore(persistedReducer,applyMiddleware(thunk));
    let persistor = persistStore(Store)
    return { Store, persistor }
}