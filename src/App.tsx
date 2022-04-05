import React from 'react'
import {  BrowserRouter as Router} from 'react-router-dom'
import  './index.less';
import MyRoutes from './router';

const App: React.FC = () => (
  <Router>
    <MyRoutes />
  </Router>
)

export default App
