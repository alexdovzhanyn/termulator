import React, { Component } from 'react'
import UserInput from './UserInput'

class TerminalBody extends Component {
  state = {
    content: '',
    userInput: '',
    showInput: false,
    currentDir: '/'
  }

  componentDidMount() {
    let content = ""
    this.printType(content.split(''))
  }

  updateTerminalContent = content => this.setState({ content })
  appendTerminalContent = content => {
    this.setState({ content: this.state.content + content }, () => {
      this.refs.content.scroll(0, this.refs.content.scrollHeight)
    })
  }
  updateWithUserContent = (val, callback) => {
    this.setState({ content: `${this.state.content} <br> ${val}` }, callback)
  }

  printType = ([val, ...rest]) => {
    this.updateTerminalContent(this.state.content + val)

    if (rest.length) {
      setTimeout(() => this.printType(rest), 50)
    } else {
      this.setState({showInput: true})
    }
  }

  changeDirectory = (directory) => {
    let potentialDir = this.state.currentDir + directory
    let contents = this.getDirectoryContents(this.props.directoryStructure, potentialDir)

    if (contents) {
      console.log(contents)
      this.setState({ currentDir: potentialDir })
    } else {
      this.appendTerminalContent(`<br><br>No directory ${directory} found in ${this.state.currentDir}`)
    }
  }

  getDirectoryContents = (directory, path) => {
    const struct = path.split('/').slice(0, -1)

    let recurse = (dir, [curr, ...rest]) => {
      try {
        dir = curr ? dir[curr] : dir
        return rest.length ? recurse(dir, rest) : Object.keys(dir)
      } catch (e) {
        return null
      }
    }

    return recurse(directory, struct)
  }

  handleUserCommand = command => {
    if (command.indexOf('cd') == 0) {
      this.changeDirectory(command.split(' ')[1])
    } if (command == 'ls') {
      let contents = this.getDirectoryContents(this.props.directoryStructure, this.state.currentDir)
      .map(content => {
        return `<strong class='ls-content'> ${content} </strong>`
      }).join('')

      this.appendTerminalContent(`<br><br>${contents}`)
    }
  }

  render() {
    return (
      <div className="terminal-content" ref='content'>
        <div className="results" dangerouslySetInnerHTML={{__html: this.state.content}}></div>

        { this.state.showInput ?
          <UserInput
            updateTerminalContent={ this.updateWithUserContent }
            handleUserCommand={ this.handleUserCommand }
          />
          : null
        }
      </div>
    )
  }
}

TerminalBody.defaultProps = {
  directoryStructure: {}
}

export default TerminalBody
