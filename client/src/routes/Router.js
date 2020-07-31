import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default function Router() {
  return (
    <Switch>
      <Route path="period/:period" />
      <Route path="period/:period" />
      <Route path="period/:period" />
      <Route path="period/:period" />
    </Switch>
  );
}
