import React, { Component } from 'react'

class Display extends Component {
  render() {
    return (
      <div>
        {this.props.name}
      </div>
    )
  }
}

export default Display;