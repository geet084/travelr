import React, { Component } from 'react';
import '../../Main.scss';
import { nasaApiKey } from '../../ApiKeys';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchURL } from '../../thunks/fetchURL';

class App extends Component {

  componentDidMount = async () => {
    const corsPrefix = 'https://cors-anywhere.herokuapp.com/'
    const url = `${corsPrefix}https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`
    this.props.fetchURL(url)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          TRAVELR
        </header>
        <img className="apod-img" src={this.props.content.url} alt=""/>
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