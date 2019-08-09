import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';
import NavBtn from '../NavBtn/NavBtn';

describe('NavBar', () => {
  let wrapper;

  beforeEach(() => {
    const mockProps = {
      planets: ['name1', 'name2'],
      moons: ['name1', 'name2', 'name3'],
      stars: ['name8'],
      bodies: ['name5', 'name4'],
    }
    wrapper = shallow(<NavBar {...mockProps} />)
  });

  it('should match snapshot with no props', () => {
    const mockProps = {
      planets: [''],
      moons: [''],
      stars: [''],
      bodies: [''],
    }
    wrapper = shallow(<NavBar {...mockProps} />)
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshout with props', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should set category title from props', () => {
    const expected = ["Planets", "Moons", "Stars", "Bodies"];
    const result = wrapper.instance().setCategoryTitle();

    expect(result).toEqual(expected);
  });

  it.skip('should populate the category with items given a category path', () => {
    const expected = [<NavBtn name="name1" path="/moons/name1" />, <NavBtn name="name2" path="/moons/name2" />, <NavBtn name="name3" path="/moons/name3" />];
    const mockPath = 'moons';

    const result = wrapper.instance().populateCategory(mockPath);

    expect(result).toEqual(expected);
  });
})