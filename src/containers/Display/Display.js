import React, { Component } from 'react'

class Display extends Component {
  render() {
    const { info, name } = this.props;
    return (
      <div>
        {!info && name}
        {info && <p>{'name  - ' + info.name}</p>}
        {info && <p>{'temp  - ' + info.average_temperature}</p>}
        {info && <p>{'dist  - ' + info.distance_from_sun}</p>}
        {info && <p>{'day  - ' + info.length_of_day}</p>}
        {info && <p>{'year  - ' + info.orbital_period}</p>}
      </div>
    )
  }
}

export default Display;