/**
 * @format
 */

import {AppRegistry} from 'react-native';
// this will look for index.js in the given folder
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
