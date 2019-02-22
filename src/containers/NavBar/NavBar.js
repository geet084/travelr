import React, { Component } from 'react'
import NavBtn from '../../components/NavBtn/NavBtn'
import Collapsible from 'react-collapsible';

class NavBar extends Component {
  render() {
    const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
    return (
      <nav>
        <ul>
          <NavBtn name={'Home'} path='/home'/>
          <NavBtn name={'Moon'} path='/moon'/>
          <Collapsible trigger="Planets">
            {planets.map(planet => <NavBtn name={planet} path={`/planets/${planet}`} key={planet} />)}
          </Collapsible>
          <NavBtn name={'Sun'} path='/sun'/>
        </ul>
      </nav>
    )
  }
}

export default NavBar;