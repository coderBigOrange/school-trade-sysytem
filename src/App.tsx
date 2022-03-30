// import { message } from 'antd'
import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Message from './pages/Message';
import User from './pages/User';
import Page404 from './pages/404';

// 配置全局 message
//TODO: sass全部改为less

const App: React.FC = () => (
  <>
    {/* TODO: 修改一下路由配置 */}
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/message' element={<Message />} />
        <Route path='/user' element={<User />} />
        <Route path='/' element={< Page404 />} />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
