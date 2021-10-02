import { Lottie } from '@crello/react-lottie';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../layout/Box';
import loading from '../animations/loading.json';

export default function Loading({ width, height }) {
  return (
    <Box display="flex" justifyContent="center" margin="auto">
      <Lottie
        width={'250px' || width}
        height={'250px' || height}
        config={{
          animationData: loading,
          loop: true,
          autoplay: true,
        }}
      />
    </Box>
  );
}

Loading.defaultProps = {
  width: '250px',
  height: '250px',
};

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
