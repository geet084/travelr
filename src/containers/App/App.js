import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { handleObjects } from '../../thunks/handleObjects';
import { handleImages } from '../../thunks/handleImages';
import { setArrivalTime, handleApodImage, handleObjectImages } from '../../actions'
import '../../Main.scss';
import Display from '../Display/Display';
import NavBar from '../../components/NavBar/NavBar'
import Home from '../../components/Home/Home'
import NotFound from '../../components/NotFound/NotFound'
import backupUrl from '../../images/back-img.jpg';
import PropTypes from 'prop-types';

export class App extends Component {

  componentDidMount = () => {
    const corsPrefix = 'https://cors-anywhere.herokuapp.com/'
    const apiKey = process.env.REACT_APP_NASA_APIKEY;
    const nasaURL = `${corsPrefix}https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    const serverURL = process.env.REACT_APP_SERVER_URL;

    this.props.handleImages(nasaURL, handleApodImage)
    this.props.handleObjects(serverURL + '/objects')
    this.props.handleImages(serverURL + '/images', handleObjectImages)
    this.props.setArrivalTime(Date.now())
  }

  setApodUrl() {
    const { media_type, url } = this.props.images.apod;
    return (media_type === 'video' || url === undefined) ? backupUrl : url;
  }

  buildRouteWith = (path) => {
    const category = path.split('/')[1]
    return (
      <Route key={path} path={path} render={({ match }) => {
        const { id } = match.params
        const info = this.props[category].find(data => data.name.toLowerCase() === id)

        return <Display key={id} info={info} />
      }} />
    )
  }

  buildNavBar = () => {
    const { planets, moons, stars, bodies } = this.props
    return <NavBar
      stars={stars.map(obj => obj.name)}
      planets={planets.map(obj => obj.name)}
      moons={moons.map(obj => obj.name)}
      bodies={bodies.map(obj => obj.name)}
    />
  }

  render() {
    const routeList = ['/planets/:id', '/moons/:id', '/bodies/:id', '/stars/:id']
    const { arrivalTime, userInfo } = this.props;

    const navBar = this.buildNavBar();
    const apodUrl = this.setApodUrl();
    const routes = routeList.map(route => this.buildRouteWith(route))

    return (
      <div className="App">
        <h1 className="logo">TRAVELR</h1>
        {navBar}
        <Switch>
          <Route exact path='/' render={() => <Home key='home' url={apodUrl} time={arrivalTime} userInfo={userInfo} />} />
          {routes}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setArrivalTime: (time) => dispatch(setArrivalTime(time)),
  handleObjects: (url) => dispatch(handleObjects(url)),
  handleImages: (url, actionToDispatch) => dispatch(handleImages(url, actionToDispatch))
})

export const mapStateToProps = (state) => ({
  planets: state.planets,
  moons: state.moons,
  stars: state.stars,
  bodies: state.bodies,
  images: state.images,
  arrivalTime: state.arrivalTime,
  userInfo: state.userInfo,
})

App.propTypes = {
  arrivalTime: PropTypes.number,
  handleObjects: PropTypes.func,
  handleImages: PropTypes.func,
  planets: PropTypes.array,
  moons: PropTypes.array,
  bodies: PropTypes.array,
  stars: PropTypes.array,
  setArrivalTime: PropTypes.func,
  userInfo: PropTypes.object,
}

App.defaultProps = {
  arrivalTime: 0,
  handleObjects: [],
  handleImages: [],
  planets: [],
  userInfo: { userDate: "", elapsedDays: 0 },
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));