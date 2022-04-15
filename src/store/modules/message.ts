import { 
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

interface Message {
  content: string;//存储消息内容
  avatar: string;//存储发送者的头像
  email: string;//存储发送者的邮箱
  isSend: boolean;
}

const initialState: Message[] = []

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    insertMessage: (state, actions: PayloadAction<Message> ) => {
      state.push(actions.payload)
    }
  }
})

//TODO: store操作和请求相结合可以学习一下

export const { insertMessage  } = messageSlice.actions;
export default messageSlice.reducer;
