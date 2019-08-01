import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { nasaApiKey, planetsApiKey } from '../../utils/ApiKeys';
import { fetchApod } from '../../thunks/fetchApod';
import { fetchPlanets } from '../../thunks/fetchPlanets';
import { setArrivalTime, setBodies } from '../../actions'
import '../../Main.scss';
import Display from '../Display/Display';
import NavBar from '../../components/NavBar/NavBar'
import Home from '../../components/Home/Home'
import NotFound from '../../components/NotFound/NotFound'
import backupUrl from '../../images/back-img.jpg';
import addBodiesInfo from '../../utils/addBodiesInfo'
import PropTypes from 'prop-types';

export class App extends Component {

  componentDidMount = async () => {
    const corsPrefix = 'https://cors-anywhere.herokuapp.com/'
    const nasaURL = `${corsPrefix}https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`
    const planetsURL = `https://galaxcyclopedia.herokuapp.com/solarsystem/?api_key=${planetsApiKey}`;

    this.props.fetchApod(nasaURL);
    this.props.fetchPlanets(planetsURL);
    this.props.setArrivalTime(Date.now())
    const bodies = addBodiesInfo()
    this.props.setBodies(bodies);
  }

  render() {
    const { arrivalTime, bodies, planets, userInfo } = this.props;
    const { media_type, url } = this.props.content;
    let currentUrl = url
    if (media_type === 'video' || url === undefined) currentUrl = backupUrl

    return (
      <div className="App">
        <h1 className="logo">TRAVELR</h1>
        <NavBar />
        <Switch>
          <Route exact path='/' render={() => <Home key='home' url={currentUrl} time={arrivalTime} userInfo={userInfo} />} />
          <Route path='/moon' render={() => <Display key='moon' info={bodies[1]} />} />
          <Route path='/planets/:id' render={({ match }) => {
            const { id } = match.params
            const info = planets.find(planet => planet.name.toLowerCase() === id)
            return <Display key={id} info={info} />
          }} />
          <Route path='/sun' render={() => <Display key='sun' info={bodies[0]} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setArrivalTime: (time) => dispatch(setArrivalTime(time)),
  fetchApod: (url) => dispatch(fetchApod(url)),
  fetchPlanets: (url) => dispatch(fetchPlanets(url)),
  setBodies: (bodies) => dispatch(setBodies(bodies)),
})

export const mapStateToProps = (state) => ({
  content: state.content,
  planets: state.planets,
  arrivalTime: state.arrivalTime,
  bodies: state.bodies,
  userInfo: state.userInfo,
})

App.propTypes = {
  arrivalTime: PropTypes.number,
  bodies: PropTypes.array,
  content: PropTypes.object,
  fetchApod: PropTypes.func,
  fetchPlanets: PropTypes.func,
  planets: PropTypes.array,
  setArrivalTime: PropTypes.func,
  setBodies: PropTypes.func,
  userInfo: PropTypes.object,
}

App.defaultProps = {
  arrivalTime: 0,
  bodies: [],
  content: {},
  planets: [],
  userInfo: { userDate: "", elapsedDays: 0 },
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));