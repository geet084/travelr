import React, { Component } from 'react'
import NavBtn from '../NavBtn/NavBtn';
import Collapsible from 'react-collapsible';

export class NavBar extends Component {
  
  getCategoryTitles = () => {
    return Object.keys(this.props).map(key => {
      const updatedKey = key.split('');
      updatedKey[0] = updatedKey[0].toUpperCase();
      
      return updatedKey.join('');
    });
  }

  populateNavItems = (navCategories) => {
    return navCategories.map(title => {
      const pathname = title.toLowerCase();
      const navItemsInCategory = this.props[pathname].map(name => {
        return <NavBtn name={name} path={`/${pathname}/${name}`} key={pathname + name} />
      })

      return <Collapsible
        key={pathname}
        className="drop-down"
        trigger={`${title} ˅`}
        triggerWhenOpen={`${title} ˄`}
      >
        {navItemsInCategory}
      </Collapsible>;
    });
  }

  render() {
    const navCategoryTitles = this.getCategoryTitles();
    const navItems = this.populateNavItems(navCategoryTitles);

    return (
      <nav className="nav-bar">
        <ul>
          <NavBtn key={'home'} name={'Home'} path='/' />
          <Collapsible
            className="drop-down"
            trigger="Solar System ˅"
            triggerWhenOpen="Solar System ˄"
          >
            {navItems}
          </Collapsible>
        </ul>
      </nav>
    )
  }
}

export default NavBar;