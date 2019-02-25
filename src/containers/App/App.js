import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { nasaApiKey, planetsApiKey } from '../../utils/ApiKeys';
import { fetchApod, fetchPlanets } from '../../thunks';
import { setArrivalTime } from '../../actions'
import '../../Main.scss';
import { Display, Home } from '../'
import { NavBar, NotFound } from '../../components'
import backupUrl from '../../images/back-img.jpg';

class App extends Component {

  componentDidMount = async () => {
    const corsPrefix = 'https://cors-anywhere.herokuapp.com/'
    const nasaURL = `${corsPrefix}https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`
    const planetsURL = `https://galaxcyclopedia.herokuapp.com/solarsystem/?api_key=${planetsApiKey}`;
    this.props.fetchApod(nasaURL);
    this.props.fetchPlanets(planetsURL);
    this.props.setArrivalTime(Date.now())
  }

  render() {
    const { arrivalTime, planets } = this.props;
    const { media_type, url } = this.props.content;
    let currentUrl = url
    if (media_type === 'video' || url === undefined) currentUrl = backupUrl

    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' render={() => <Home key='home' url={currentUrl} time={arrivalTime} />} />
          <Route path='/moon' render={() => <Display key='moon' info='MOON' />} />
          <Route path='/planets/:id' render={({ match }) => {
            const { id } = match.params
            const info = planets.find(planet => planet.name.toLowerCase() === id)
            return <Display key={id} info={info} />
          }} />
          <Route path='/sun' render={() => <Display key='sun' info='SUN' />} />
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
})

export const mapStateToProps = (state) => ({
  content: state.content,
  planets: state.planets,
  arrivalTime: state.arrivalTime,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));