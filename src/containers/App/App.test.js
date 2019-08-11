import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App'
import Home from '../../components/Home/Home'
import Display from '../../containers/Display/Display'
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
    images: {
      apod: { media_type: 'image', url: 'http:/someurl' },
      currentImage: {}
    },
    stars: [{}],
    planets: [{}],
    moons: [{}],
    bodies: [{}],
    arrivalTime: 117,
    userInfo: { userDate: '10-1-2018', elapsedDays: 0 },
    handleObjects: jest.fn(),
    handleImages: jest.fn(),
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
    badMockProps.images.apod.media_type = 'video'
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

    it('should render a specific object when on that route', () => {
      mockProps.stars = [{ name: 'Sun' }];
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/stars/sun']}>
            <App {...mockProps} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(Display)).toHaveLength(1)
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

    it('should mapDispatchToProps for handleObjects', () => {
      const mockDispatch = jest.fn();
      const mockUrl = 'mock url';
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleObjects(mockUrl)
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should mapDispatchToProps for handleImages', () => {
      const mockDispatch = jest.fn();
      const mockUrl = 'mock url';
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleImages(mockUrl)
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should mapStateToProps', () => {
      const mockState = {
        images: [{ id: 1 }],
        arrivalTime: 99,
        stars: [{ name: 'sun' }],
        planets: [{ name: 'earth' },{name: 'mars'}],
        moons: [{ name: 'titan' }, { name: 'moon' }],
        bodies: [{ name: 'asteroid belt' }, { name: 'oort cloud' }],
        userInfo: { arrivalTime: 5, elapsedTime: 88 },
        fakeData1: "should't show up",
        fakeData2: 'stuff'
      }
      const expected = {
        images: [{ id: 1 }],
        arrivalTime: 99,
        stars: [{ name: 'sun' }],
        planets: [{ name: 'earth' },{name: 'mars'}],
        moons: [{ name: 'titan' }, { name: 'moon' }],
        bodies: [{ name: 'asteroid belt' }, { name: 'oort cloud' }],
        userInfo: { arrivalTime: 5, elapsedTime: 88 },
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    })
  })
})
