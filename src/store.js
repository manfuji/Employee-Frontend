import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducers from './Reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const persistConfig = {
    key: 'root',
    storage:storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducers)
const initialState = {};
const middleware = [thunk];

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);
const persistor = persistStore(store);

export {store,persistor};
