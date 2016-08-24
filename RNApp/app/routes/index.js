import React from 'react';
import Home from './Home';
import Details from './Details';
import Profile from './Profile';
import Form from './Form';

const Routes = {
  getHomeRoute() {
    return {
      renderScene(navigator) {
        return <Home navigator={navigator} />;
      },

      getTitle() {
        return 'Home';
      },
    };
  },
  getDetailsRoute() {
    return {
      renderScene(navigator) {
        return <Details navigator={navigator} />;
      },

      getTitle() {
        return 'Details';
      },
    };
  },
  getFormRoute() {
    return {
      renderScene(navigator) {
        return <Form navigator={navigator} />;
      },

      getTitle() {
        return 'Form';
      },
    };
  },
  getProfileRoute() {
    return {
      renderScene(navigator) {
        return <Profile navigator={navigator} />;
      },

      showNavigationBar: false,
    };
  },
};

export default Routes;
