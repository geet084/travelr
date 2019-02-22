import React, { Component } from 'react';
import '../../Main.scss';
import { nasaApiKey } from '../../ApiKeys';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { fetchURL } from '../../thunks/fetchURL';
import Display from '../Display/Display';
import NavBar from '../NavBar/NavBar';
import NotFound from '../../components/NotFound/NotFound'


class App extends Component {

  componentDidMount = async () => {
    const corsPrefix = 'https://cors-anywhere.herokuapp.com/'
    const url = `${corsPrefix}https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`
    this.props.fetchURL(url)
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
          <Route  path='/planets' render={() => {
            return <Display name='PLANETS' />
          }}/>
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
})

export const mapStateToProps = (state) => ({
  content: state.content,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));