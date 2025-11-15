/**
 * Format date to DD/MM/YYYY, HH:mm:ss format
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

/**
 * Format location coordinates
 */
export const formatLocation = (lat: number, lng: number): string => {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};

/**
 * Convert km/h to mph and format with unit
 * API returns speed in km/h, but UI shows in mph
 */
export const formatSpeed = (speedKmh: number): string => {
  // Convert km/h to mph (1 km/h = 0.621371 mph)
  const speedMph = Math.round(speedKmh * 0.621371);
  return `${speedMph} mph`;
};

/**
 * Convert km/h to mph (just the number)
 */
export const kmhToMph = (speedKmh: number): number => {
  return Math.round(speedKmh * 0.621371);
};

/**
 * Calculate time ago in seconds
 */
export const getTimeAgo = (dateString: string): number => {
  const now = new Date().getTime();
  const then = new Date(dateString).getTime();
  return Math.floor((now - then) / 1000);
};

/**
 * Format countdown timer (MM:SS)
 */
export const formatCountdown = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
};