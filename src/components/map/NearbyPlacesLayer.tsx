"use client";

import { Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import {
  entertainment,
  food,
  utilities,
  culture,
  health_and_wellness,
  lodging,
  natural_features,
  place_of_worship,
  services,
  shopping,
  sports,
  transport,
  govt,
} from "@/lib/placeTypes";
import { LatLng, Suggestion, SimplifiedPlace } from "@/types/maps";
import { haversineDistance } from "@/lib/utils";

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
        console.log(
          "Food categories:",
          [
            // ...utilities,
            ...place_of_worship,
            // ...culture,
            // ...food,
            // ...entertainment,
            // ...sports,
            // ...transport,
            // ...lodging,
            // ...natural_features,
            // ...services,
            // ...shopping,
            // ...govt,
          ].length
        );

        lastFetchedCenter.current = center;
        service.nearbySearch(
          {
            location: center,
            radius: 5000, // in meters
            rankBy: google.maps.places.RankBy.PROMINENCE,
            maxResultCount: 5,
            types: [
              ...utilities,
              ...place_of_worship,
              // ...culture,
              // ...food,
              // ...entertainment,
              // ...sports,
              // ...transport,
              // ...lodging,
              ...natural_features,
              // ...services,
              // ...shopping,
              // ...govt,
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

export default NearbyPlacesLayer;
