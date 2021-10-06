import React from 'react';
import PropTypes from 'prop-types';
import Flickity from 'react-flickity-component';

const flickityOptions = {
  initialIndex: 0,
  wrapAround: true,
  prevNextButtons: false,
  pageDots: false,
  resize: false,
  lazyLoad: true,
};

export default function Carousel({ children }) {
  return (
    <Flickity
      className="carousel"
      elementType="div"
      options={flickityOptions}
      disableImagesLoaded={false}
      reloadOnUpdate
      static
    >
      {children}
    </Flickity>
  );
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};
