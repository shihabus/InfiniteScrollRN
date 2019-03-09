import React, { Component } from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import LandingPage from './components/LandingPage'

export default class App extends Component {
    render() {
        const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk))
        return (
            <Provider store={store}>
                <LandingPage />
            </Provider>
        )

    }
}
