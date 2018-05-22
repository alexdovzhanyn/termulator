import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TerminalActions from '../actions/terminal-actions'
import TerminalHead from './TerminalHead'
import TerminalBody from './TerminalBody'
import '../terminal.css'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(TerminalActions, dispatch)
}

class Terminal extends Component {
  componentDidMount() {
    this.refs.terminal.focus()
  }

  handleKeyPress = e => {
    this.props.userKeyPress(e.key)
  }

  render() {
    let { title, directoryStructure } = this.props

    return (
      <div className="terminal-container" tabIndex={ 0 } onKeyDown={ this.handleKeyPress } ref='terminal'>
        <TerminalHead title={ title }/>
        <TerminalBody directoryStructure={ directoryStructure }/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Terminal)
