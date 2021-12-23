import React from 'react';
import { useAppSelector } from '~/hooks/redux';
import AuthRoutes from '~/routes/auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const token = useAppSelector((state) => state.authReducer.token);

  return token === '' ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
