import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import store from "./store/store";
import {Provider} from "react-redux";
import Spinner from "./components/PageComponents/Spinner";

ReactDOM.render(
    <React.Suspense fallback={<Spinner/>}>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="*" element={<App/>}/>
                </Routes>
            </Provider>
        </BrowserRouter>
    </React.Suspense>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals