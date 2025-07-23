"use client";

import {
  APIProvider,
  Map as GoogleMap,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";

interface LatLng {
  lat: number;
  lng: number;
}

interface SimplifiedPlace {
  place_id?: string;
  name?: string;
  location?: LatLng;
}

interface Suggestion {
  message: string;
  place_id: string;
  place_name: string;
  location: LatLng;
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "600px",
};

function haversineDistance(coords1: LatLng, coords2: LatLng): number {
  const R = 6371e3; // metres
  const φ1 = (coords1.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (coords2.lat * Math.PI) / 180;
  const Δφ = ((coords2.lat - coords1.lat) * Math.PI) / 180;
  const Δλ = ((coords2.lng - coords1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
}

function NearbyPlacesLayer({
  center,
  setSuggestions,
}: {
  center: LatLng;
  setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>;
}) {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const lastFetchedCenter = useRef<LatLng | null>(null);

  const sendPlacesToBackend = useCallback(
    async (results: google.maps.places.PlaceResult[]) => {
      try {
        const payload = results.map((p) => ({
          place_id: p.place_id,
          name: p.name,
          location: p.geometry?.location?.toJSON(),
        }));

        const response = await fetch("/api/process-places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ places: payload }),
        });

        const data = await response.json();
        if (data.has_suggestions) {
          setSuggestions(data.suggestions);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [setSuggestions]
  );

  // Fetch nearby places
  useEffect(() => {
    if (!map || !placesLib) return;
    const service = new placesLib.PlacesService(map);

    const fetchPlaces = () => {
      if (lastFetchedCenter.current) {
        const distance = haversineDistance(center, lastFetchedCenter.current);
        console.log("Current location:", center);
        console.log("Previous location:", lastFetchedCenter.current);
        console.log(`Distance from last fetch: ${distance.toFixed(2)}m`);
      }

      if (
        !lastFetchedCenter.current ||
        haversineDistance(center, lastFetchedCenter.current) > 50
      ) {
        console.log("Fetching new places...");
        lastFetchedCenter.current = center;
        service.nearbySearch(
          {
            location: center,
            radius: 1000, // in meters
            rankBy: google.maps.places.RankBy.PROMINENCE,
            types: [
              "restaurant",
              "cafe",
              "bar",
              "night_club",
              "movie_theater",
              "amusement_park",
            ],
          },
          (
            results: google.maps.places.PlaceResult[] | null,
            status: google.maps.places.PlacesServiceStatus
          ) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              console.log("Nearby places found:", results);
              setPlaces(results);
              // Send to backend
              sendPlacesToBackend(results);
            } else {
              console.warn("PlacesService status:", status);
            }
          }
        );
      }
    };

    const intervalId = setInterval(fetchPlaces, 2000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, map, placesLib]);

  const simplified = useMemo<SimplifiedPlace[]>(() => {
    return places.map((p) => ({
      place_id: p.place_id,
      name: p.name,
      location: p.geometry?.location?.toJSON(),
    }));
  }, [places]);

  return (
    <>
      {simplified.map((p) =>
        p.location ? <Marker key={p.place_id} position={p.location} /> : null
      )}
    </>
  );
}

export default function MapPage() {
  const [center, setCenter] = useState<LatLng | null>(null);
  const [zoom, setZoom] = useState(15);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCameraChange = (ev: any) => {
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

  // Fetch user location on initial load and watch for changes
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(loc);
        if (isFollowingUser) {
          setCenter(loc);
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isFollowingUser]);

  return (
    <div className="flex flex-col gap-4 p-8 items-center">
      <h1 className="text-2xl font-bold">Nearby Places Demo</h1>

      <div className="w-full flex justify-end">
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
