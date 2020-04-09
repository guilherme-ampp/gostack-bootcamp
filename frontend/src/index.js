import React from 'react';
import { render } from 'react-dom';

import App from './App'

// this is us using the render() directly with HTML code, without a component
// render(<h1>Hello World!</h1>, document.getElementById('app'));

// now using our component
render(<App />, document.getElementById('app'));