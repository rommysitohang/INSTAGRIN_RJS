import React, { Component } from 'react';
import AppInit from './src/components/AppInit';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';



class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(thunk))
    console.disableYellowBox = true;
    return (
       <Provider store={store}>
         <AppInit />
       </Provider>
    );
  }
}


export default App;