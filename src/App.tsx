import React from 'react';
import './App.css';
import { Map } from './components/Map';
import { GeoDataProvider, useGeoData } from './store/geo-data/geo-data';
import { CodeDisplay } from './components/CodeDisplay';

const Wrapper = (props: any) => <GeoDataProvider>{props.children}</GeoDataProvider>;

const App: React.FC = () => {
	return (
		<Wrapper>
			<div className="App">
				<p>Map components display driven by React Context</p>
				<div style={{ margin: 15 }}>
					<Map />
				</div>
			</div>
		</Wrapper>
	);
};

export default App;
