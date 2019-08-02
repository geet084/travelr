import React, { Component } from 'react'
import NavBtn from '../NavBtn/NavBtn';
import Collapsible from 'react-collapsible';

class NavBar extends Component {
  render() {
    const objectNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    return (
      <nav className="nav-bar">
        <ul>
          <NavBtn name={'Home'} path='/' />
          <Collapsible className="drop-down" trigger="Solar System">
            {objectNames.map(name => <NavBtn name={name} path={`/objects/${name}`} key={name} />)}
          </Collapsible>
        </ul>
      </nav>
    )
  }
}

export default NavBar;