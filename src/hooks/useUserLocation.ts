"use client";

import { useState, useEffect } from "react";
import { LatLng } from "@/types/maps";

export function useUserLocation(isFollowingUser: boolean) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [center, setCenter] = useState<LatLng | null>(null);

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

  return { userLocation, center, setCenter };
}
