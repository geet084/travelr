import React, { Component } from 'react';
import '../../Main.scss';
import { nasaApiKey, planetsApiKey } from '../../ApiKeys';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { fetchURL } from '../../thunks/fetchURL';
import { fetchPlanets } from '../../thunks/fetchPlanets';
import Display from '../Display/Display';
import NavBar from '../NavBar/NavBar';
import NotFound from '../../components/NotFound/NotFound'


class App extends Component {

  componentDidMount = async () => {
    const corsPrefix = 'https://cors-anywhere.herokuapp.com/'
    const nasaURL = `${corsPrefix}https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`
    const planetsURL = `https://galaxcyclopedia.herokuapp.com/solarsystem/?api_key=${planetsApiKey}`;
    this.props.fetchURL(nasaURL);
    this.props.fetchPlanets(planetsURL);
  }

  render() {
    
    return (
      <div className="App">
        <NavBar />
        <img src={this.props.content.url} alt="apod" />
        <Switch>
          <Route exact path='/' render={() => {
            return <Display name='DISPLAY' />
          }}/>
          <Route exact path='/home' render={() => {
            return <Display name='DISPLAY' />
          }}/>
          <Route  path='/moon' render={() => {
            return <Display name='MOON' />
          }}/>
          <Route path='/planets/:id' render={({ match }) => {
            const { id } = match.params
            const planet = this.props.planets.find(planet => planet.name === id)
            return <Display info={planet} />
          }} />
          <Route  path='/sun' render={() => {
            return <Display name='SUN' />
          }} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchURL: (url) => dispatch(fetchURL(url)),
  fetchPlanets: (url) => dispatch(fetchPlanets(url)),
})

export const mapStateToProps = (state) => ({
  content: state.content,
  planets: state.planets,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));