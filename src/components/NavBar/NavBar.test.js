import React from 'react';
import { shallow } from 'enzyme';
import NavBar, { getCategoryTitles, getNavCategoryItems, populateNavItems } from './NavBar';

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
    const expected = ['Planets', 'Moons', 'Stars', 'Bodies'];
    const result = getCategoryTitles(mockProps);

    expect(result).toEqual(expected);
  });

  it('should get category items from props and category title', () => {
    const expected = mockProps['stars'].length;
    const mockTitle = 'Stars';
    const result = getNavCategoryItems(mockProps, mockTitle);

    expect(result).toHaveLength(expected);
  });
  

  it('should populate the nav bar with categories and items', () => {
    const resIndex = Object.keys(mockProps).indexOf('moons');
    const expected = mockProps['moons'].length;

    const mockCategories = ['Planets', 'Moons', 'Stars', 'Bodies'];

    const result = populateNavItems(mockProps, mockCategories);
    
    expect(result[resIndex].props.children).toHaveLength(expected);
  });
})