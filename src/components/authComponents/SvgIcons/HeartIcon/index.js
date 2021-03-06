import React from 'react';
import PropTypes from 'prop-types';

export default function HeartIcon({ color }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={color ? 'red' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.7867 6.1469C27.1057 5.46558 26.2971 4.9251 25.4071 4.55635C24.5172 4.1876 23.5633 3.9978 22.6 3.9978C21.6367 3.9978 20.6828 4.1876 19.7929 4.55635C18.9029 4.9251 18.0943 5.46558 17.4133 6.1469L16 7.56024L14.5867 6.1469C13.2111 4.77131 11.3454 3.99852 9.4 3.99852C7.45462 3.99852 5.58892 4.77131 4.21333 6.1469C2.83774 7.52249 2.06494 9.38819 2.06494 11.3336C2.06494 13.2789 2.83774 15.1446 4.21333 16.5202L5.62666 17.9336L16 28.3069L26.3733 17.9336L27.7867 16.5202C28.468 15.8392 29.0085 15.0307 29.3772 14.1407C29.746 13.2508 29.9358 12.2969 29.9358 11.3336C29.9358 10.3703 29.746 9.41637 29.3772 8.52643C29.0085 7.63648 28.468 6.82791 27.7867 6.1469V6.1469Z"
        stroke="black"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

HeartIcon.propTypes = {
  color: PropTypes.bool,
};

HeartIcon.defaultProps = {
  color: false,
};
