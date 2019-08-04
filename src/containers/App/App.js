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

  render() {
    const { arrivalTime, objects, userInfo } = this.props;
    const { media_type, url } = this.props.images.apod;
    let currentUrl = url
    if (media_type === 'video' || url === undefined) currentUrl = backupUrl

    const planets = objects.filter(obj => obj.planet).map(obj => obj.object_name)
    const moons = objects.filter(obj => obj.moon).map(obj => obj.object_name)
    const bodies = objects.filter(obj => !obj.planet && !obj.moon).map(obj => obj.object_name)

    return (
      <div className="App">
        <h1 className="logo">TRAVELR</h1>
        <NavBar planets={planets} moons={moons} bodies={bodies} />
        <Switch>
          <Route exact path='/' render={() => <Home key='home' url={currentUrl} time={arrivalTime} userInfo={userInfo} />} />
          <Route path='/objects/:id' render={({ match }) => {
            const { id } = match.params
            const info = objects.find(obj => obj.object_name.toLowerCase() === id)

            return <Display key={id} info={info} />
          }} />
          <Route path='/moons/:id' render={({ match }) => {
            const { id } = match.params
            const info = objects.find(moon => moon.object_name.toLowerCase() === id)

            return <Display key={id} info={info} />
          }} />
          <Route path="/bodies/:id" render={({ match }) => {
            const { id } = match.params
            const info = objects.find(body => body.object_name.toLowerCase() === id)

            return <Display key={id} info={info} />
          }} />
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
  objects: state.objects,
  images: state.images,
  arrivalTime: state.arrivalTime,
  userInfo: state.userInfo,
})

App.propTypes = {
  arrivalTime: PropTypes.number,
  handleObjects: PropTypes.func,
  handleImages: PropTypes.func,
  objects: PropTypes.array,
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