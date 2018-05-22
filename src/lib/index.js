import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import terminalReducer from './reducers/terminal-reducer'
import Terminal from './components/Terminal'

const store = createStore(terminalReducer)

class TerminalContainer extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Terminal {...this.props} />
      </Provider>
    )
  }
}

export default TerminalContainer
