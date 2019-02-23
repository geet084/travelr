import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImages } from '../../thunks';

class Display extends Component {
 
  componentDidMount = () => {
    let { info, images, fetchImages } = this.props;
    if (info && images !== []) fetchImages(info.imageIDs)
  }
  
  render() {
    const { info, images } = this.props;

    return (
      <div>
        {info && <p>{'name  - ' + info.name}</p>}
        {info && <p>{'temp  - ' + info.average_temperature}</p>}
        {info && <p>{'dist  - ' + info.distance_from_sun}</p>}
        {info && <p>{'day  - ' + info.length_of_day}</p>}
        {info && <p>{'year  - ' + info.orbital_period}</p>}
        
        {images.length !== 0 && <img className='imgs' src={images[0].items[0].href} alt="" />}
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchImages: (arr) => dispatch(fetchImages(arr))
})

export const mapStateToProps = (state) => ({
  images: state.images,
})

export default connect(mapStateToProps, mapDispatchToProps)(Display);