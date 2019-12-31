import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import markersFile from './markers.json';
import routeFile from './route.json';

interface IGeoData {
	routeId: number | null;
	markers: any;
	route: any;
}
const initialState: IGeoData = {
	routeId: null,
	markers: null,
	route: null
};

//Initiate new context
const GeoDataContext = createContext<Partial<any>>({});

//Create HOC for providing context to children
const GeoDataProvider = (props: any) => {
	const [ state, setState ] = useState<IGeoData>(initialState);
	const [ route, getRoute ] = useAsyncFn(async () => routeFile);
	const [ markers, getMarkers ] = useAsyncFn(async () => markersFile);

	useEffect(
		//observe markers loading
		() => {
			if (!markers.loading && markers.value != null) {
				setState((s: IGeoData) => ({ ...s, markers: markers.value }));
			}
		},
		[ markers.loading ]
	);

	useEffect(
		//observe markers loading
		() => {
			console.log(route);
			if (!route.loading && route.value != null) {
				setState((s: IGeoData) => ({ ...s, route: route.value }));
			}
		},
		[ route.loading ]
	);

	const getRouteById = (routeId: number) => {
		setState((s: IGeoData) => ({ ...s, routeId }));
		getRoute();
	};

	const getRouteMarkersById = (routeId: number) => {
		setState((s: IGeoData) => ({ ...s, routeId }));
		getMarkers();
	};

	const resetGeoData = () => {
		setState(() => initialState);

		console.log(state);
	};
	return (
		<GeoDataContext.Provider
			value={{
				data: state,
				getRouteById,
				getRouteMarkersById,
				resetGeoData
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
