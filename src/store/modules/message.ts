import { 
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {SimpleMessage} from '../../utils/interface';
import cloneDeep from 'lodash/cloneDeep'

type UserMessageType = Record<string, SimpleMessage[]>

const initialState: UserMessageType = {
  fake: []
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    initailMessages: (state, action: PayloadAction<{
      email: string;
      messages: SimpleMessage[]
    }>) => {
      const {
        email,
        messages
      } = action.payload;
      state[email] = messages;
    } ,
    insertMessage: (state, action: PayloadAction<{
      email: string;
      message: SimpleMessage
    }> ) => {
      const {
        email,
        message
      } = action.payload;
        if(state[email]) {
          state[email].push(message)
        } else {
          state[email] = [message]
        }
    }
  }
})

//TODO: store操作和请求相结合可以学习一下

export const { insertMessage, initailMessages } = messageSlice.actions;
export default messageSlice.reducer;