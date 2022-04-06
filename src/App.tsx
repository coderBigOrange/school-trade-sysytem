import React from 'react'
import {  BrowserRouter as Router} from 'react-router-dom'
import  './index.less';
import MyRoutes from './router';
//TODO: 所有页面的loading状态
const App: React.FC = () => (
  <Router>
    <MyRoutes />
  </Router>
)

export default App
