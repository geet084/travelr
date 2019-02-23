import React, { Component } from 'react'

class Home extends Component {
  render() {
    const { url } = this.props;
    return (
      <div>
        <img className='apod-img' src={url} alt="apod" />

      </div>
    )
  }
}

export default Home;