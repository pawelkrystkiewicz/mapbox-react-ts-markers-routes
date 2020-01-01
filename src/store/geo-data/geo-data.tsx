import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import markersFile from './markers.json';
import routeFile from './route.json';
import { timeout } from '../../utils/helpers';

interface IGeoData {
	routeId: number | null;
	markers: any;
	route: any;
	routeTimeout: number;
	markersTimeout: number;
}
const initialState: IGeoData = {
	routeId: null,
	markers: null,
	route: null,
	routeTimeout: 300,
	markersTimeout: 300
};

const resetedMapState: Partial<IGeoData> = {
	routeId: null,
	markers: null,
	route: null
};

//Initiate new context
const GeoDataContext = createContext<Partial<any>>({});

//Create HOC for providing context to children
const GeoDataProvider = (props: any) => {
	const [ state, setState ] = useState<IGeoData>(initialState);
	const [ route, getRoute ] = useAsyncFn(async () => await Promise.all([ routeFile, timeout(state.routeTimeout) ]));
	const [ markers, getMarkers ] = useAsyncFn(
		async () => await Promise.all([ markersFile, timeout(state.markersTimeout) ])
	);

	useEffect(
		//observe markers loading
		() => {
			if (!markers.loading && markers.value != null) {
				setState((s: IGeoData) => ({ ...s, markers: markers.value[0] }));
			}
		},
		[ markers.loading ]
	);

	useEffect(
		//observe route loading
		() => {
			console.log(route);
			if (!route.loading && route.value != null) {
				setState((s: IGeoData) => ({ ...s, route: route.value[0] }));
			}
			console.log(state);
		},
		[ route.loading ]
	);

	const setRouteTimeout = (routeTimeout: number) => setState((s: IGeoData) => ({ ...s, routeTimeout }));
	const setMarkersTimeout = (markersTimeout: number) => setState((s: IGeoData) => ({ ...s, markersTimeout }));
	const getRouteById = (routeId: number) => {
		setState((s: IGeoData) => ({ ...s, routeId }));
		getRoute();
	};

	const getRouteMarkersById = (routeId: number) => {
		setState((s: IGeoData) => ({ ...s, routeId }));
		getMarkers();
	};

	const resetGeoData = () => {
		setState((s: IGeoData) => ({ ...s, ...resetedMapState }));

		console.log(state);
	};
	return (
		<GeoDataContext.Provider
			value={{
				data: state,
				getRouteById,
				getRouteMarkersById,
				resetGeoData,
				setRouteTimeout,
				setMarkersTimeout
			}}
			{...props}
		/>
	);
};

function useGeoData() {
	//Here we prepare our context to be used with hooks
	const context = useContext(GeoDataContext);
	if (context === undefined) {
		console.error(`${Object.keys({ GeoDataContext })[0]} must be used within a LikedPictureProvider`);
	}
	return context;
}

export { GeoDataProvider, useGeoData };
