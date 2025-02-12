import { useState, useEffect } from "react";

// Type for the driver
interface Driver {
  id: string;
  lat: number;
  lng: number;
}

// Custom hook to fetch all and nearby drivers based on the selected location
const useSearchNearbyDrivers = (
  selectedLocation: { lat: number; lng: number } | null,
  tomtomKey: string,
  nearbySearchRadius: number = 1000, // Default radius is 1000 meters (1km)
  totalDrivers: number = 7 // Default total drivers to generate
) => {
  const [allDrivers, setAllDrivers] = useState<Driver[]>([]); // Stores all drivers
  const [nearbyDrivers, setNearbyDrivers] = useState<Driver[]>([]); // Stores nearby drivers

  // Function to calculate distance between two coordinates (Haversine formula)
  const getDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dlng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dlng / 2) *
        Math.sin(dlng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  };

  // Helper function to generate random driver locations with better scatter
  const getRandomDriverLocations = (
    centerLat: number,
    centerlng: number,
    radius: number,
    numDrivers: number
  ): Driver[] => {
    const drivers: Driver[] = [];
    for (let i = 0; i < numDrivers; i++) {
      const angle = Math.random() * 2 * Math.PI; // Random angle between 0 and 2π
      const distance = Math.random() * (radius + 1000); // Allow some drivers outside the radius (extra 1km)

      // Convert polar coordinates to latitude/lnggitude offsets
      const latOffset = (distance / 111300) * Math.sin(angle);
      const lngOffset =
        (distance / (111300 * Math.cos(centerLat * (Math.PI / 180)))) *
        Math.cos(angle);

      const driverLat = centerLat + latOffset;
      const driverlng = centerlng + lngOffset;

      // Store the generated driver
      drivers.push({ id: `driver_${i}`, lat: driverLat, lng: driverlng });
    }

    return drivers;
  };

  // Function to fetch all drivers based on the selected location
  const getAllDrivers = (lat: number, lng: number) => {
    // Generate random driver positions inside and around the radius
    const drivers = getRandomDriverLocations(
      lat,
      lng,
      nearbySearchRadius + 1000,
      totalDrivers
    );

    // Set the all drivers in the state
    setAllDrivers(drivers);

    // Filter drivers that are inside the search radius
    const nearby = drivers.filter(
      (driver) =>
        getDistance(lat, lng, driver.lat, driver.lng) <= nearbySearchRadius
    );

    // Set the nearby drivers in the state
    setNearbyDrivers(nearby);

    // Log all drivers and nearby drivers to the console for debugging
    console.log("All drivers:", drivers);
    console.log("Nearby drivers:", nearby);
  };

  // Use effect to trigger fetching all drivers when selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      const { lat, lng } = selectedLocation;
      getAllDrivers(lat, lng);
    }
  }, [selectedLocation]); // Only run this effect when the location changes

  // Return all drivers and nearby drivers
  return { allDrivers, nearbyDrivers };
};

export default useSearchNearbyDrivers;
