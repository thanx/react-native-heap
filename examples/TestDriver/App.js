import React from 'react';
import { Provider } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { store } from './src/reduxElements';
import TopNavigator from './src/topNavigator';

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;

  navigate('Initial');
}

function navigate(routeName, params) {
  console.log(_navigator);
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TopNavigator
          ref={setTopLevelNavigator}
          onNavigationStateChange={(prevState, currentState, action) => {
            const currentScreen = getActiveRouteName(currentState);
            const prevScreen = getActiveRouteName(prevState);

            if (prevScreen !== currentScreen) {
              console.log(currentScreen);
            }
          }}
        />
      </Provider>
    );
  }
}
