import React from 'react';
import {
  Redirect,
  Route as RouteDom,
  RouteProps as RouteDomProps,
} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type RouteProps = RouteDomProps & {
  isPrivate?: boolean;
  component: React.FC;
};

export const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...restProps
}) => {
  const { user } = useAuth();

  return (
    <RouteDom
      {...restProps}
      render={({ location }) =>
        isPrivate === Boolean(user) ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
