import { 
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import { MessageType } from '../../utils/interface';

const initialState: MessageType[] = [];

export const messageListSlice = createSlice({
  name: 'messageList',
  initialState,
  reducers: {
    insertToMessageList: (state, action: PayloadAction<MessageType>) => {
      state.push(action.payload)
    },
    deleteFromMessageList: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state.splice(idx, 1);
    }
  }
})

export const { insertToMessageList, deleteFromMessageList} = messageListSlice.actions
export default messageListSlice.reducer;