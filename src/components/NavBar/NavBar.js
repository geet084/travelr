import React, { Component } from 'react'
import NavBtn from '../NavBtn/NavBtn';
import Collapsible from 'react-collapsible';

export class NavBar extends Component {
  setCategoryTitle = () => {
    return Object.keys(this.props).map(key => {
      const updatedKey = key.split('');
      updatedKey[0] = updatedKey[0].toUpperCase();
      return updatedKey.join('');
    });
  }

  populateCategory = (pathname) => {
    return this.props[pathname].map(name => <NavBtn name={name} path={`/${pathname}/${name}`} key={name} />)
  }

  render() {
    const navCategories = this.setCategoryTitle();
    const navItems = navCategories.map(title => {
      let pathname = title.toLowerCase()

      return <Collapsible
        key={pathname}
        className="drop-down"
        trigger={`${title} ˅`}
        triggerWhenOpen={`${title} ˄`} >
        {this.populateCategory(pathname)}
      </Collapsible>
    });

    return (
      <nav className="nav-bar">
        <ul>
          <NavBtn name={'Home'} path='/' />
          <Collapsible
            className="drop-down"
            trigger="Solar System ˅"
            triggerWhenOpen="Solar System ˄" >
            {navItems}
          </Collapsible>
        </ul>
      </nav>
    )
  }
}

export default NavBar;