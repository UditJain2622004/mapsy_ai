export interface LatLng {
  lat: number;
  lng: number;
}

export interface SimplifiedPlace {
  place_id?: string;
  name?: string;
  location?: LatLng;
}

export interface Suggestion {
  message: string;
  place_id: string;
  place_name: string;
  location: LatLng;
}
