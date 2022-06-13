import React from 'react';
import Routes from './src/routes';
import CodePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  return <Routes />;
};

export default CodePush(codePushOptions)(App);
