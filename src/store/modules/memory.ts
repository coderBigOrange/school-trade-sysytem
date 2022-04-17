/**
 * 存储一些记忆性的内容
 */

import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

interface Memory {
  lastActiveIdx: number;
}

const initialState: Memory = {
  lastActiveIdx: 1
}

export const memorySlice  = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    updateActiveIdx: (state, action: PayloadAction<number>) => {
      state.lastActiveIdx = action.payload
    } 
  }
})

export const { updateActiveIdx } = memorySlice.actions;
export default memorySlice.reducer;