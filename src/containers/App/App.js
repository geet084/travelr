import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { fetchApod } from '../../thunks/fetchApod';
import { handleObjects } from '../../thunks/handleObjects';
import { setArrivalTime } from '../../actions'
import '../../Main.scss';
import Display from '../Display/Display';
import NavBar from '../../components/NavBar/NavBar'
import Home from '../../components/Home/Home'
import NotFound from '../../components/NotFound/NotFound'
import backupUrl from '../../images/back-img.jpg';
import PropTypes from 'prop-types';

export class App extends Component {

  componentDidMount = async () => {
    const corsPrefix = 'https://cors-anywhere.herokuapp.com/'
    let apiKey = process.env.REACT_APP_NASA_APIKEY;
    const nasaURL = `${corsPrefix}https://api.nasa.gov/planetary/apod?api_key=${apiKey}`

    const objectsURL = 'https://travelr-be.herokuapp.com/api/v1/objects'

    this.props.handleObjects(objectsURL)
    this.props.fetchApod(nasaURL);
    this.props.setArrivalTime(Date.now())
  }

  render() {
    const { arrivalTime, objects, userInfo } = this.props;
    const { media_type, url } = this.props.content;
    let currentUrl = url
    if (media_type === 'video' || url === undefined) currentUrl = backupUrl

    return (
      <div className="App">
        <h1 className="logo">TRAVELR</h1>
        <NavBar />
        <Switch>
          <Route exact path='/' render={() => <Home key='home' url={currentUrl} time={arrivalTime} userInfo={userInfo} />} />
          <Route path='/objects/:id' render={({ match }) => {
            const { id } = match.params
            const info = objects.find(obj => obj.object_name.toLowerCase() === id)
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
  fetchApod: (url) => dispatch(fetchApod(url)),
  handleObjects: (url) => dispatch(handleObjects(url)),
})

export const mapStateToProps = (state) => ({
  content: state.content,
  objects: state.objects,
  arrivalTime: state.arrivalTime,
  userInfo: state.userInfo,
})

App.propTypes = {
  arrivalTime: PropTypes.number,
  content: PropTypes.object,
  fetchApod: PropTypes.func,
  objects: PropTypes.array,
  setArrivalTime: PropTypes.func,
  setBodies: PropTypes.func,
  userInfo: PropTypes.object,
}

App.defaultProps = {
  arrivalTime: 0,
  handleObjects: [],
  content: {},
  userInfo: { userDate: "", elapsedDays: 0 },
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));