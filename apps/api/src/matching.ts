import type { LocationPoint, WorkerProfile } from "@ustaya/shared";

const toRadians = (deg: number) => (deg * Math.PI) / 180;

const distanceKm = (a: LocationPoint, b: LocationPoint) => {
  const earthRadius = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const haversine =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(haversine));
};

export const rankWorkers = (workers: WorkerProfile[], requestLocation: LocationPoint) => {
  return workers
    .map((worker) => {
      const km = distanceKm(requestLocation, worker.location);
      const distanceScore = Math.max(0, 1 - km / Math.max(1, worker.serviceRadiusKm));
      const ratingScore = worker.rating / 5;
      const completionScore = worker.completionRate;
      const responseScore = Math.max(0, 1 - worker.responseTimeSeconds / 300);
      const trustScore = worker.verified ? 1 : 0.6;

      const recommendationScore =
        distanceScore * 0.35 +
        ratingScore * 0.25 +
        completionScore * 0.2 +
        responseScore * 0.1 +
        trustScore * 0.1;

      return {
        worker,
        distanceKm: km,
        recommendationScore
      };
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore);
};
