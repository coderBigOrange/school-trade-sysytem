//TODO: 可以关注一下store数据持久化的问题,对redux-persist多点了解

import { 
  createAsyncThunk, 
  combineReducers, 
  configureStore,
} from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './modules/user';
import messageSlice from "./modules/message";
import { persistStore } from 'redux-persist';

const reducers = combineReducers({
  user: userSlice,
  message: messageSlice
})

const persistConfig = {
  key: 'root',
  storage,
  whilelist: ['user']
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