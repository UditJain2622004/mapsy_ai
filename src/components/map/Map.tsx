"use client";

import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";
import NearbyPlacesLayer from "./NearbyPlacesLayer";
import { Suggestion, LatLng } from "@/types/maps";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "600px",
};

export default function Map() {
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const { userLocation, center, setCenter } = useUserLocation(isFollowingUser);
  const [zoom, setZoom] = useState(15);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCameraChange = (ev: any) => {
    if (
      center &&
      (ev.detail.center.lat !== center.lat ||
        ev.detail.center.lng !== center.lng)
    ) {
      setIsFollowingUser(false);
    }
    setCenter(ev.detail.center);
    setZoom(ev.detail.zoom);
  };

  const handleDrag = () => {
    if (isFollowingUser) {
      setIsFollowingUser(false);
    }
  };

  const handleCenterOnMe = () => {
    if (userLocation) {
      setCenter(userLocation);
      setZoom(15);
      if (!isFollowingUser) {
        setIsFollowingUser(true);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={handleCenterOnMe}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!userLocation}
        >
          Center on Me
        </button>
      </div>

      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
      >
        {center ? (
          <GoogleMap
            center={center}
            zoom={zoom}
            style={containerStyle}
            onCameraChanged={handleCameraChange}
            onDrag={handleDrag}
          >
            {/* User marker */}
            {userLocation && <Marker position={userLocation} />}
            {/* Nearby places markers */}
            <NearbyPlacesLayer
              center={center}
              setSuggestions={setSuggestions}
            />
          </GoogleMap>
        ) : (
          <p>Fetching location...</p>
        )}
      </APIProvider>

      {suggestions.length > 0 && (
        <div className="w-full p-4 bg-gray-100 rounded-lg mt-4">
          <h2 className="text-xl font-bold mb-2">Suggestions</h2>
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.place_id} className="mb-1">
                <strong>{suggestion.place_name}:</strong> {suggestion.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
