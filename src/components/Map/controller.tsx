import MapGL, { Layer, Source } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import { useGeoData } from '../../store/geo-data/geo-data';
import colors from '../../utils/colors';
import { CodeDisplay } from '../CodeDisplay';
import { IMapboxViewport, IMapState } from './model';
import './style.scss';

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const initialState: IMapState = {
	hasData: true,
	viewport: {
		latitude: 52.3965,
		longitude: 16.9561,
		zoom: 8
	}
};

const mapStyles = {
	street: 'mapbox://styles/mapbox/streets-v11',
	navDay: 'mapbox://styles/mapbox/navigation-preview-day-v4',
	navNight: 'mapbox://styles/mapbox/navigation-preview-night-v4'
};

const buttonStyle = {
	width: 100,
	borderRadius: 3
};

export default () => {
	const [ state, setState ] = useState(initialState);
	const { data, getRouteById, getRouteMarkersById, resetGeoData } = useGeoData();

	const Route = data.route != null && [
		<Source id="route" type="geojson" data={data.route} />,
		<Layer
			id="route"
			type="line"
			source="route"
			layout={{
				'line-join': 'round',
				'line-cap': 'round'
			}}
			paint={{
				'line-color': colors.blue,
				'line-width': 3
			}}
		/>
	];

	const Markers = data.markers != null && [
		<Source id="markers" type="geojson" data={data.markers} />,
		<Layer
			id="markers"
			type="symbol"
			source="markers"
			layout={{
				// get the icon name from the source's "icon" property
				// concatenate the name to get an icon from the style's sprite sheet
				'icon-image': [ 'concat', [ 'get', 'icon' ], '-15' ],
				// get the title name from the source's "title" property
				'text-field': [ 'get', 'title' ],
				'text-font': [ 'Open Sans Semibold', 'Arial Unicode MS Bold' ],
				'text-offset': [ 0, 0.6 ],
				'text-anchor': 'top'
			}}
		/>
	];
	console.log(`map render`);
	return (
		<React.Fragment>
			<div style={{ marginBottom: 10, display: 'flex' }}>
				<button
					style={buttonStyle}
					onClick={() => {
						getRouteById(1);
					}}
				>
					Load route
				</button>
				<button
					style={buttonStyle}
					onClick={() => {
						getRouteMarkersById(1);
					}}
				>
					Load markers
				</button>
				<button
					style={buttonStyle}
					onClick={() => {
						getRouteById(1);
						getRouteMarkersById(1);
					}}
				>
					Load all data
				</button>
				<button style={buttonStyle} onClick={resetGeoData}>
					Clear map
				</button>
			</div>
			<MapGL
				className="map no-select"
				mapStyle={mapStyles.navNight}
				accessToken={accessToken}
				onViewportChange={(viewport: IMapboxViewport) => {
					setState((s) => ({ ...s, viewport }));
				}}
				{...state.viewport}
			>
				{Route}
				{Markers}
			</MapGL>
			<br />
			GeoData Provider State:
			<CodeDisplay code={data} />
		</React.Fragment>
	);
};
