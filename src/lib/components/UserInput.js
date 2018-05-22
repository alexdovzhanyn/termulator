import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    keysPressed: state.userKeysInput
  }
}

const prefix = 'guest@alexdovzhanyn:~$ '

class UserInput extends Component {
  state = {
    value: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState;
    const mostRecentKey = nextProps.keysPressed[nextProps.keysPressed.length - 1]
    if (mostRecentKey) {
      if (mostRecentKey == "Enter") {
        newState = {
          value: ''
        }

        nextProps.updateTerminalContent(`<strong>${prefix}</strong> ${prevState.value}`, () => {
          nextProps.handleUserCommand(prevState.value)
        })

      } else if (mostRecentKey == "Backspace") {
        newState = {
          value: prevState.value.slice(0, -1)
        }
      } else {
        newState = {
          value: prevState.value + mostRecentKey
        }
      }
    }

    return newState
  }

  render() {
    return (
      <div className="user-input">
        <strong>{ prefix }</strong> { this.state.value }
      </div>
    )
  }
}

export default connect(mapStateToProps)(UserInput)
