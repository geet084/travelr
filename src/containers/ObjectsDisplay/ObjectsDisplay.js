import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleImages } from '../../thunks/handleImages';
import { getImageSuccess } from '../../actions';
import PropTypes from 'prop-types';

export class ObjectsDisplay extends Component {
  componentDidMount = () => {
    this.getDisplayImage()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.images.currentImage.href === '') this.getDisplayImage()
  }


  getDisplayImage = () => {
    const { info, handleImages } = this.props;
    const url = 'https://images-api.nasa.gov/asset/'

    if (info.images) {
      const urlWithFirstImage = url + info.images[0]
      handleImages(urlWithFirstImage, getImageSuccess)
    }
  }

  render() {
    const { info } = this.props;
    const { currentImage } = this.props.images;

    return (
      <div className='display'>
        {info && <p>{'Name  - ' + info.name}</p>}
        {info && <p>{'Avg. Temp  - ' + info.average_temp}</p>}
        {info && <p>{'Distance from the sun  - '}</p>}
        {info && <p>{info.perihelion + ' / ' + info.aphelion}</p>}
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

ObjectsDisplay.propTypes = {
  handleImages: PropTypes.func,
  images: PropTypes.object,
  info: PropTypes.object,
}

ObjectsDisplay.defaultProps = {
  images: {},
  info: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsDisplay);