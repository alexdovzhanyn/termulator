import React, { Component } from 'react'

class TerminalHead extends Component {
  render() {
    let {
      onTerminalClose,
      onTerminalMinimize,
      onTerminalMaximize,
      title
    } = this.props

    return (
      <div className="terminal-head">
        <div className="terminal-head-actions">
          <button className="close" onclick={ onTerminalClose }></button>
          <button className="minimize" onclick={ onTerminalMinimize }></button>
          <button className="maximize" onclick={ onTerminalMaximize }></button>
        </div>
        <p>
          { title }
        </p>
      </div>
    )
  }
}

TerminalHead.defaultProps = {
  title: '/bin/termulator.sh'
}

export default TerminalHead
