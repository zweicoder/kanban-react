import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import alt from 'Alt';
import storage from 'Storage';
import persist from 'Persistence';

persist(alt, storage, 'app');

ReactDOM.render(<App />, document.getElementById('app'));