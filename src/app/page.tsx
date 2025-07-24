"use client";

import Map from "@/components/map/Map";

export default function MapPage() {
  return (
    <div className="flex flex-col gap-4 p-8 items-center">
      <h1 className="text-2xl font-bold">MapsyAI</h1>
      <Map />
    </div>
  );
}
