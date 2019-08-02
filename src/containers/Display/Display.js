import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleImages } from '../../thunks/handleImages';
import { getImageSuccess } from '../../actions/';
import PropTypes from 'prop-types';

export class Display extends Component {

  componentDidMount = () => {
    let { info, handleImages } = this.props;
    const url = `https://images-api.nasa.gov/asset/${info.images[0]}`
    
    if (info.images !== []) handleImages(url, getImageSuccess)
  }

  render() {
    const { info } = this.props;
    const { currentImage } = this.props.images;
    
    return (
      <div className='display'>
        {info && <p>{'Name  - ' + info.object_name}</p>}
        {info && <p>{'Avg. Temp  - ' + info.average_temp}</p>}
        {info && <p>{'Distance from the sun  - '}</p>}
        {info && <p>{info.distance_from_sun}</p>}
        {info && <p>{'Length of day  - ' + info.length_of_day}</p>}
        {info && <p>{'Orbital period  - ' + info.orbital_period}</p>}

        {currentImage.href !== '' && <img className='imgs' src={currentImage.href} alt="" />}
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  handleImages: (url, actionToDispatch) => dispatch(handleImages(url, actionToDispatch))
})

export const mapStateToProps = (state) => ({
  images: state.images,
})

Display.propTypes = {
  handleImages: PropTypes.func,
  images: PropTypes.object,
  info: PropTypes.object,
}

Display.defaultProps = {
  images: {},
  info: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);