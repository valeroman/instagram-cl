// import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContent from './context/firebase';
import { firebase, FieldValue } from './lib/firabase';
import './styles/app.css';

ReactDOM.render(
    <FirebaseContent.Provider value={{ firebase, FieldValue }}>
        <App />
    </FirebaseContent.Provider>,
    document.getElementById('root')
);

