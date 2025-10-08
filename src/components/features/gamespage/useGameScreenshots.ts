// Finds all images living in a folder that matches the game id
export function useGameScreenshots(gameId?: string) {
  const all = import.meta.glob<string>(
    "/src/assets/**/*.{png,jpg,jpeg,webp,avif}",
    { eager: true, as: "url" }
  );

  if (!gameId) return [];

  const entries = Object.entries(all).filter(([p]) => p.includes(`/${gameId}/`));
  entries.sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }));
  return entries.map(([, url]) => url);
}
