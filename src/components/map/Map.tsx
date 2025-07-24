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
  height: "80vh",
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
      <div className="relative">
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
            <div
              style={containerStyle}
              className="flex items-center justify-center bg-gray-200"
            >
              <p>Fetching location...</p>
            </div>
          )}
        </APIProvider>
        <div className="absolute top-15 right-2 z-10">
          <button
            onClick={handleCenterOnMe}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50"
            disabled={!userLocation}
            title="Center on my location"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 13a3 3 0 110-6 3 3 0 010 6z"
              />
            </svg>
          </button>
        </div>
      </div>

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
