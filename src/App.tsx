import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from './components/Map';

const App: React.FC = () => {
	return (
		<div className="App">
			{process.env.REACT_APP_MAPBOX_TOKEN}
			<Map />
		</div>
	);
};

export default App;
