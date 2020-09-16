import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ ...props }) => {
  const { loggedIn, children } = props;

  return (
    <Route>
      {
        () => (loggedIn === true) ? (
          children
        ) : (
          <Redirect to='/signin' />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
