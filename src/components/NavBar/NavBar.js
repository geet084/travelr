import React, { Component } from 'react'
import NavBtn from '../NavBtn/NavBtn';
import Collapsible from 'react-collapsible';

class NavBar extends Component {
  render() {
    const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
    return (
      <nav className="nav-bar">
        <ul>
          <NavBtn name={'Home'} path='/' />
          <Collapsible className="drop-down" trigger="Solar System">
            <NavBtn name={'Sun'} path='/sun' />
            <NavBtn name={'Moon'} path='/moon' />
            {planetNames.map(name => <NavBtn name={name} path={`/planets/${name}`} key={name} />)}
          </Collapsible>
        </ul>
      </nav>
    )
  }
}

export default NavBar;