import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import { mapStateToProps, mapDispatchToProps } from './App'


describe('App', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(
      <App />
      )
    })
  // it('renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(<App />, div);
  //   ReactDOM.unmountComponentAtNode(div);
  // });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should mapDispatchToProps for setArrivalTime', () => {
    const mockDispatch = jest.fn();
    const mockTime = 999;
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.setArrivalTime(mockTime)
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('should mapDispatchToProps for fetchApod', () => {
    const mockDispatch = jest.fn();
    const mockUrl = 'mock url';
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.fetchApod(mockUrl)
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('should mapDispatchToProps for fetchPlanets', () => {
    const mockDispatch = jest.fn();
    const mockUrl = 'mock url';
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.fetchPlanets(mockUrl)
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('should mapDispatchToProps for setBodies', () => {
    const mockDispatch = jest.fn();
    const mockBodies = ['mock bodies'];
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.setBodies(mockBodies)
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('should mapStateToProps', () => {
    const mockState = {
      content: [{ url: 'some url' }],
      planets: [{ id: 1 }],
      arrivalTime: 99,
      bodies: [{ name: 'sun' }, { name: 'moon' }],
      userInfo: "should't show up",
      fakeData: 'stuff'
    }
    const expected = {
      content: [{ url: 'some url' }],
      planets: [{ id: 1 }],
      arrivalTime: 99,
      bodies: [{ name: 'sun' }, { name: 'moon' }]
    }
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected)

  })

})
