import React from 'react';
import PropTypes from 'prop-types';
import StyledRow from '../styles/StyledRow';

export default function Row({ children }) {
  return <StyledRow>{children}</StyledRow>;
}

Row.propTypes = {
  children: PropTypes.object,
};
