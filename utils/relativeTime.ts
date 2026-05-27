export function relativeTime(dateStr: string) {
  const now = Date.now();
  const past = new Date(dateStr).getTime();

  const diffMs = now - past;

  // Prevent negative/future weirdness
  if (diffMs <= 0) return '-0m';

  const minutes = Math.floor(diffMs / 1000 / 60);

  // < 1 hour
  if (minutes < 60) {
    return `-${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);

  return `-${hours}H`;
}
