import React from 'react';
import './App.css';
import { Map } from './components/Map';
import { GeoDataProvider } from './store/geo-data/geo-data';


const Wrapper = (props: any) => <GeoDataProvider>{props.children}</GeoDataProvider>;

const App: React.FC = () => {
	document.title = 'Context Mapbox Controller';
	return (
		<Wrapper>
			<div style={{ margin: 15 }}>
				<div className="app">
					<p className="app-title">Map data controlled by React Context</p>
					<Map />
				</div>
			</div>
		</Wrapper>
	);
};

export default App;
