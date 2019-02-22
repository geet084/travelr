import React, { Component } from 'react'
import { NavBtn } from '../../components'
import Collapsible from 'react-collapsible';

class NavBar extends Component {
  render() {
    const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
    return (
      <nav>
        <ul>
          <NavBtn name={'Home'} path='/' />
          <NavBtn name={'Moon'} path='/moon' />
          <Collapsible trigger="Planets">
            {planetNames.map(name => <NavBtn name={name} path={`/planets/${name}`} key={name} />)}
          </Collapsible>
          <NavBtn name={'Sun'} path='/sun' />
        </ul>
      </nav>
    )
  }
}

export default NavBar;