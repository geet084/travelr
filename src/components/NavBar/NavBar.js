import React, { Component } from 'react'
import NavBtn from '../NavBtn/NavBtn';
import Collapsible from 'react-collapsible';

class NavBar extends Component {
  render() {
    let { planets, moons, bodies } = this.props;
    bodies = bodies.filter(name => name !== 'Sun')

    return (
      <nav className="nav-bar">
        <ul>
          <NavBtn name={'Home'} path='/' />
          <Collapsible className="drop-down" trigger="Solar System ˅" triggerWhenOpen="Solar System ˄">

            <Collapsible className="drop-down" trigger="Sun & Planets ˅" triggerWhenOpen="Sun & Planets ˄">
              <NavBtn name={'Sun'} path={'/objects/Sun'} key={'Sun'} />
              {planets.map(name => <NavBtn name={name} path={`/objects/${name}`} key={name} />)}
            </Collapsible>

            <Collapsible className="drop-down" trigger="Moons ˅" triggerWhenOpen="Moons ˄">
              {moons.map(name => <NavBtn name={name} path={`/moons/${name}`} key={name} />)}
            </Collapsible>

            <Collapsible className="drop-down" trigger="Other Bodies ˅" triggerWhenOpen="Other Bodies ˄">
              {bodies.map(name => <NavBtn name={name} path={`/bodies/${name}`} key={name} />)}
            </Collapsible>

          </Collapsible>
        </ul>
      </nav>
    )
  }
}

export default NavBar;