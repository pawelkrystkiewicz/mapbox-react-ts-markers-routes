export interface IMapboxViewport {
	latitude: number;
	longitude: number;
	zoom?: number;
	pitch?: number;
	bearing?: number;
}

export interface IMapState {
	hasData: Boolean;
	viewport: IMapboxViewport;
}
