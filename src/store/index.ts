//TODO: 可以关注一下store数据持久化的问题,对redux-persist多点了解

import { 
  createAsyncThunk, 
  combineReducers, 
  configureStore,
} from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from './modules/user';
import message from "./modules/message";
import messageList from './modules/messageList';
import shopDetail from "./modules/shopDetail";
import { persistStore } from 'redux-persist';

const reducers = combineReducers({
  user,
  message,
  messageList,
  shopDetail
})

const persistConfig = {
  key: 'root',
  storage,
  // whilelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store =  configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch