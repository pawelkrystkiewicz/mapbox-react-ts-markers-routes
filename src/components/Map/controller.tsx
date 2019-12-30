import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import './style.scss';
import { CodeDisplay } from '../CodeDisplay';
import { IMapboxViewport, IMapState } from './model';

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const initialState: IMapState = {
	viewport: {
		latitude:  52.3965,
		longitude: 16.9561,
		zoom: 8
	}
};

const data = {
	type: 'Feature',
	geometry: {
		type: 'LineString',
		coordinates: [
			[ 16.9561, 52.3965 ],
			[ 17.51926, 52.33123 ],
			[ 18.70075, 50.97466 ],
			[ 18.90267, 50.84899 ],
			[ 19.1355, 50.80641 ],
			[ 19.1713, 50.73904 ]
		]
	}
};

const mapStyles = {
	street: 'mapbox://styles/mapbox/streets-v11',
	navigation: 'mapbox://styles/mapbox/navigation-preview-day-v4'
};
export default () => {
	const [ state, setState ] = useState(initialState);
	return (
		<div>
			<div className="map-overlay">
				<CodeDisplay code={state} />
			</div>
			<br />
			<MapGL
				style={{ width: '50%', height: '50vh' }}
				mapStyle={mapStyles.street}
				accessToken={accessToken}
				onViewportChange={(viewport: IMapboxViewport) => {
					setState({ viewport: { ...viewport } });
				}}
				{...state.viewport}
			>
				[<Source id="route" type="geojson" data={data} />,
				<Layer
					id="route"
					type="line"
					source="route"
					layout={{
						'line-join': 'round',
						'line-cap': 'round'
					}}
					paint={{
						'line-color': '#f2f',
						'line-width': 3
					}}
				/>]
			</MapGL>
		</div>
	);
};
