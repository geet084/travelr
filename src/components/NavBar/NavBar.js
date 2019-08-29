import React from 'react';
import NavBtn from '../NavBtn/NavBtn';
import Collapsible from 'react-collapsible';

export const getCategoryTitles = (props) => {
  return Object.keys(props).map(key => {
    const updatedKey = key.split('');
    updatedKey[0] = updatedKey[0].toUpperCase();
    
    return updatedKey.join('');
  });
}

export const getNavCategoryItems = (props, title) => {
  const pathname = title.toLowerCase();

  return props[pathname].map(name => {
    return <NavBtn name={name} path={`/${pathname}/${name}`} key={pathname + name} />;
  });
}

export const populateNavItems = (props) => {
  const navCategories = getCategoryTitles(props);

  return navCategories.map(title => {
    const navItemsInCategory = getNavCategoryItems(props, title)
    
    return <Collapsible
      key={title}
      className="drop-down"
      trigger={`${title} ˅`}
      triggerWhenOpen={`${title} ˄`}
    >
      {navItemsInCategory}
    </Collapsible>;
  });
}

export const NavBar = (props) => {
  const navItems = populateNavItems(props);

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

export default NavBar;