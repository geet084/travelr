import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleImages } from '../../thunks/handleImages';
import PropTypes from 'prop-types';

export class Display extends Component {

  componentDidMount = () => {
    let { info, images, handleImages } = this.props;
    const url = 'https://images-api.nasa.gov/asset/'

    if (info && images.items !== []) handleImages(url + info.imageIDs)
  }

  render() {
    const { info, images } = this.props;
    return (
      <div className='display'>
        {info && <p>{'Name  - ' + info.object_name}</p>}
        {info && <p>{'Avg. Temp  - ' + info.average_temp}</p>}
        {info && <p>{'Distance from the sun  - '}</p>}
        {info && <p>{info.distance_from_sun}</p>}
        {info && <p>{'Length of day  - ' + info.length_of_day}</p>}
        {info && <p>{'Orbital period  - ' + info.orbital_period}</p>}

        {images.length !== 0 && <img className='imgs' src={images.items[0].href} alt="" />}
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  handleImages: (url) => dispatch(handleImages(url))
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