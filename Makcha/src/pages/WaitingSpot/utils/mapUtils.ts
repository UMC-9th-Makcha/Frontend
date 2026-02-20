export function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const dx = lat1 - lat2;
  const dy = lng1 - lng2;
  return Math.sqrt(dx * dx + dy * dy) * 111000;
}

export function getLevelByDistance(distance: number) {
  if (distance < 700) return 3;
  if (distance < 1000) return 4;
  if (distance < 2000) return 5;
  if (distance < 3000) return 6;
  return 7;
}
