export type Location = {
  lat: number;
  lng: number;
};

// Simulates the first external API call
export async function callExternalApi1(location: Location) {
  // Emulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mocked response that depends on the provided location
  return {
    ...location,
    placeId: "mock-place-123",
    description: "Mocked response from External API 1",
  };
}

// Simulates the second external API call that depends on the first API's result
export async function callExternalApi2(data: unknown) {
  // Emulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mocked final response
  return {
    status: "success",
    received: data,
    timestamp: Date.now(),
  };
} 