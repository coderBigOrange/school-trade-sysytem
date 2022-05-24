/**
 * 存储一些记忆性的内容
 */

import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

interface Memory {
  searchHistory: string[];
}

const initialState: Memory = {
  searchHistory: []
}

export const memorySlice  = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    addHistorySearch: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      if( value && state.searchHistory && !state.searchHistory.includes(value)) {
        state.searchHistory.unshift(value)
      }
    },
    deleteHistorySearch: (state, action: PayloadAction<string>) => {
      const history = state.searchHistory;
      state.searchHistory = history.filter(item => item !== action.payload)
    }
  }
})

export const { addHistorySearch, deleteHistorySearch } = memorySlice.actions;
export default memorySlice.reducer;