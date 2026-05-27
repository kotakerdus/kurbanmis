export function toTwentyFourHours(dateStr: string) {
  const date = new Date(dateStr);
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return time;
}
