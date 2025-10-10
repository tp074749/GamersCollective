const base = import.meta.env.VITE_API_BASE;

export type GameListItem = {
  game_id: number;
  title: string;
  slug: string;
  available_keys: number;
  cover_key: string | null;
  thumb_key: string | null;
  price: number;
};

export async function listGames(): Promise<GameListItem[]> {
  const res = await fetch(`${base}/api/games`);
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

// helper if S3 is public; if private, have backend return pre-signed URLs instead
export function toImageUrl(key?: string | null) {
  if (!key) return "/placeholder.png";
  const bucket = import.meta.env.VITE_PUBLIC_BUCKET;
  return `https://${bucket}.s3.amazonaws.com/${key}`;
}
