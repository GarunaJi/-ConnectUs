import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you're using Redux

const withAuth = (Component) => {
  console.log(Component);
  return function WithAuth(props) {
    console.log(props);
    const isAuthenticated  = useSelector((state) => ({ ...state.auth }));
    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
  };
};

export default withAuth;