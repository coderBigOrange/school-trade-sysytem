// import { message } from 'antd'
import React from 'react'
import { 
  Route, 
  Routes, 
  BrowserRouter as Router,
} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Message from './pages/Message';
import User from './pages/User';
import Page404 from './pages/404';
import TabButton from './components/TabButton';
import Register from './pages/Register';
import s from './style.module.less'

const App: React.FC = () => (
  <Router>
    <div className={s.app}>
      <div className={s.main}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/message' element={<Message />} />
          <Route path='/me' element={<User />} />
          <Route path='/' element={< Login />} />
        </Routes>
      </div>
      {/* <div className={s.bottom}>
        <TabButton /> 
      </div> */}
    </div>
  </Router>
)

export default App
