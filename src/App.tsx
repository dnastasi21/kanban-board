import React from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Board from './pages/Board'
import BasicPageLayout from './components/BasicPageLayout'

const App: React.FC = () => {
  return (
    <Router>
      <BasicPageLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/board/:boardId" component={Board} />
        </Switch>
      </BasicPageLayout>
    </Router>
  )
}

export default App
