import React from "react"
import ReactDom from "react-dom"
import { createStore, applyMiddleware, compose} from 'redux'
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import "./index.css"

import App from "./App"
import reducers from "./reducers"
const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDom.render(
 <Provider store = {store}>
    <App />
 </Provider> 
, document.getElementById("root"))
