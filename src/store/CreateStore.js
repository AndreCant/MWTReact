import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (reducers) => {

    const middleware = [thunk, promise];
    const enhancer = [applyMiddleware(...middleware)];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
        compose;

    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        blacklist: 'user'
    };

    const persistedReducer = persistReducer(persistConfig, reducers);

    const store = createStore(persistedReducer, composeEnhancers(...enhancer));

    const persistor = persistStore(store);

    return {store, persistor};
}