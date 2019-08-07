import React, { Component } from 'react'
import NavBtn from '../NavBtn/NavBtn';
import Collapsible from 'react-collapsible';

class NavBar extends Component {

  setCategory = (title, path) => {
    return (
      <Collapsible className="drop-down" trigger={`${title} ˅`} triggerWhenOpen={`${title} ˄`}>
        {this.props[path].map(name => <NavBtn name={name} path={`/${path}/${name}`} key={name} />)}
      </Collapsible>
    )
  }

  render() {
    return (
      <nav className="nav-bar">
        <ul>
          <NavBtn name={'Home'} path='/' />
          <Collapsible className="drop-down" trigger="Solar System ˅" triggerWhenOpen="Solar System ˄">
            {this.setCategory('Stars', 'stars')}
            {this.setCategory('Planets', 'planets')}
            {this.setCategory('Moons', 'moons')}
            {this.setCategory('Other Bodies', 'bodies')}
          </Collapsible>
        </ul>
      </nav>
    )
  }
}

export default NavBar;