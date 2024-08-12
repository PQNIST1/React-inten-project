import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Component, requireAuth, ...rest }) => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();
  const from = location.pathname;
  return accessToken ? <Component {...rest} /> : <Navigate to="/login" state={{ from: from}} />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
