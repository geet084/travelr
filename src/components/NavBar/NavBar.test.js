import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

describe('NavBar', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
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

  it('should get category title from props', () => {
    const expected = ["Planets", "Moons", "Stars", "Bodies"];
    const result = wrapper.instance().getCategoryTitles();

    expect(result).toEqual(expected);
  });

  it('should populate the nav bar with categories and items', () => {
    const moonIndex = Object.keys(mockProps).indexOf('moons');
    const moons = Object.keys(mockProps)[moonIndex]
    const expected = wrapper.instance().props[moons].length;

    const mockCategories = ["Planets", "Moons", "Stars", "Bodies"];
    
    const result = wrapper.instance().populateNavItems(mockCategories);
    
    expect(result[moonIndex].props.children).toHaveLength(expected);
  });
})