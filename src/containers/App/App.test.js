import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { shallow, mount } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import Display from '../../containers/Display/Display';
import Home from '../../containers/Home/Home';
import { rootReducer } from '../../reducers/index';
import * as actions from '../../actions/';
import moment from 'moment';

describe('App', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      images: {
        apod: { media_type: 'image', url: 'http:/someurl' },
        currentImage: {}
      },
      stars: [{}],
      planets: [{}],
      moons: [{}],
      bodies: [{}],
      arrivalTime: { _d: '117' },
      userInfo: { userDate: '10-1-2018', elapsedDays: 0 },
      handleObjects: jest.fn(),
      handleImages: jest.fn(),
      setArrivalTime: jest.fn(),
      setBodies: jest.fn(),
    };

    wrapper = shallow(<App {...mockProps} />);
  });

  describe('initial state', () => {
    mockProps = {
      images: {
        apod: {},
        currentImage: { href: '' }
      },
      stars: [],
      planets: [],
      moons: [],
      bodies: [],
      arrivalTime: {},
      userInfo: { userDate: '', elapsedDays: 0 },
      handleObjects: jest.fn(),
      handleImages: jest.fn(),
      setArrivalTime: jest.fn(),
      setBodies: jest.fn(),
    };

    it('renders without crashing', () => {
      const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
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

    it('should match initial snapshot with NO data', () => {
      wrapper = shallow(<App {...mockProps} />, { disableLifecycleMethods: true });

      expect(wrapper).toMatchSnapshot();
    });

    it('should load data and set user arrival time when component mounts', () => {
      wrapper = shallow(<App {...mockProps} />, { disableLifecycleMethods: true });
      wrapper.instance().loadData = jest.fn();
      wrapper.instance().setUserArrivalTime = jest.fn();

      wrapper.instance().componentDidMount();

      expect(wrapper.instance().loadData).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().setUserArrivalTime).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadData', () => {
    let mockNasaUrl;
    let mockServerUrl;

    beforeEach(() => {
      mockNasaUrl = 'http://nasa.org';
      mockServerUrl = 'http://localhost:3000';
      process.env.REACT_APP_NASA_URL = mockNasaUrl;
      process.env.REACT_APP_SERVER_URL = mockServerUrl;
    });

    afterEach(() => {
      delete process.env.REACT_APP_NASA_URL;
      delete process.env.REACT_APP_SERVER_URL;
    });

    it('should call', () => {
      expect(mockProps.handleImages).toHaveBeenCalledTimes(2);
      expect(mockProps.handleObjects).toHaveBeenCalledTimes(1);
    });

    it('should call handleImages with a nasa url and handleApodImage action', () => {
      wrapper.instance().loadData();

      expect(mockProps.handleImages).toHaveBeenCalledWith(mockNasaUrl, actions.handleApodImage);
    });

    it('should call handleObjects with a server url + "/objects"', () => {
      wrapper.instance().loadData();

      expect(mockProps.handleObjects).toHaveBeenCalledWith(mockServerUrl + '/objects');
    });

    it('should call handleImages with a server url + "/images"', () => {
      wrapper.instance().loadData();

      expect(mockProps.handleImages).toHaveBeenCalledWith(mockServerUrl + '/images', actions.handleObjectImages);
    });
  });

  describe('setUserArrivalTime', () => {
    const mockArrivalTime = moment('Mon, 1 Oct 2018 9:00 AM', 'ddd, DD MMM YYYY HH:mm:ss ZZ');
    moment.now = jest.fn().mockReturnValue(mockArrivalTime);

    it('should set the time when the user first arrives on the site', () => {
      expect(mockProps.setArrivalTime).toHaveBeenCalledTimes(1);
    });
  });

  describe('setApodUrl', () => {
    it('should match snapshot with good url', () => {
      wrapper = shallow(<App {...mockProps} />)
      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with bad url', () => {
      let badMockProps = mockProps;
      badMockProps.images.apod.media_type = 'video';

      wrapper = shallow(<App {...badMockProps} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('buildRouteWith', () => {
    it('should build a route for moon objects', () => {
      const mockPath = '/moons/:id';
      const result = wrapper.instance().buildRouteWith(mockPath);

      expect(result.props.path).toEqual(mockPath);
    });
  });

  describe('buildNavBar', () => {
    it('should build a nav bar with just the names of each object', () => {
      mockProps.stars = [{ name: 'Sun', id: 3, size: 'large' }];
      mockProps.planets = [{ name: 'Earth', id: 9 }];
      mockProps.moons = [{ name: 'Luna', id: 1 }, { name: 'Titan', id: 6 }];
      mockProps.bodies = [{ name: 'Asteroid Belt', id: 18 }];
      wrapper = shallow(<App {...mockProps} />);

      const expected = {
        stars: ['Sun'],
        planets: ['Earth'],
        moons: ['Luna', 'Titan'],
        bodies: ['Asteroid Belt']
      };

      const result = wrapper.instance().buildNavBar();

      expect(result.props).toEqual(expected);
    });
  });

  describe('routes', () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
    it('should render Home when at the root route', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App {...mockProps} />
          </MemoryRouter>
        </Provider>
      );

      expect(wrapper.find(Home)).toHaveLength(1);
    });

    it('should render a specific object when on that route', () => {
      mockProps.stars = [{ name: 'Sun' }];
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/stars/sun']}>
            <App {...mockProps} />
          </MemoryRouter>
        </Provider>
      );

      expect(wrapper.find(Display)).toHaveLength(1);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should mapDispatchToProps for setArrivalTime', () => {
      const mockDispatch = jest.fn();
      const mockTime = 999;
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.setArrivalTime(mockTime);
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should mapDispatchToProps for handleObjects', () => {
      const mockDispatch = jest.fn();
      const mockUrl = 'mock url';
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleObjects(mockUrl);
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should mapDispatchToProps for handleImages', () => {
      const mockDispatch = jest.fn();
      const mockUrl = 'mock url';
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleImages(mockUrl);
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should mapStateToProps', () => {
      const mockState = {
        images: [{ id: 1 }],
        arrivalTime: 99,
        stars: [{ name: 'sun' }],
        planets: [{ name: 'earth' }, { name: 'mars' }],
        moons: [{ name: 'titan' }, { name: 'moon' }],
        bodies: [{ name: 'asteroid belt' }, { name: 'oort cloud' }],
        userInfo: { arrivalTime: 5, elapsedTime: 88 },
        fakeData1: "should't show up",
        fakeData2: 'stuff'
      };

      const expected = {
        images: [{ id: 1 }],
        arrivalTime: 99,
        stars: [{ name: 'sun' }],
        planets: [{ name: 'earth' }, { name: 'mars' }],
        moons: [{ name: 'titan' }, { name: 'moon' }],
        bodies: [{ name: 'asteroid belt' }, { name: 'oort cloud' }],
        userInfo: { arrivalTime: 5, elapsedTime: 88 },
      };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
})
