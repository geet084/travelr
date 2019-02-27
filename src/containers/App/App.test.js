import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App'
import Home from '../../components/Home/Home'
import { shallow, mount } from 'enzyme'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '../../reducers/index';
import thunk from 'redux-thunk';

import { mapStateToProps, mapDispatchToProps } from './App'


describe('App', () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  let wrapper;
  const mockProps = {
    content: { media_type: 'image', url: 'http:/someurl' },
    planets: [{}],
    arrivalTime: 117,
    bodies: [{}],
    userInfo: { userDate: '10-1-2018', elapsedDays: 0 },
    fetchApod: jest.fn(),
    fetchPlanets: jest.fn(),
    setArrivalTime: jest.fn(),
    setBodies: jest.fn(),
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App {...mockProps} />
        </BrowserRouter>
      </Provider>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match snapshot with good url', () => {
    wrapper = shallow(<App {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with bad url', () => {
    let badMockProps = mockProps;
    badMockProps.content.media_type = 'video'
    wrapper = shallow(<App {...badMockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('routes', () => {
    it('should render Home when at the root route', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App {...mockProps} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(Home)).toHaveLength(1)
    })
  })

  describe('mapDispatchToProps', () => {
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
  })

  describe('mapStateToProps', () => {
    it('should mapStateToProps', () => {
      const mockState = {
        content: [{ url: 'some url' }],
        planets: [{ id: 1 }],
        arrivalTime: 99,
        bodies: [{ name: 'sun' }, { name: 'moon' }],
        userInfo: { arrivalTime: 5, elapsedTime: 88 },
        fakeData1: "should't show up",
        fakeData2: 'stuff'
      }
      const expected = {
        content: [{ url: 'some url' }],
        planets: [{ id: 1 }],
        arrivalTime: 99,
        bodies: [{ name: 'sun' }, { name: 'moon' }],
        userInfo: { arrivalTime: 5, elapsedTime: 88 },
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    })
  })
})
