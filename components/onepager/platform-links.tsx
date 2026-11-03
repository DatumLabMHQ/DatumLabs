import { PLATFORMS } from "@/lib/podcast-platforms"

/* Where to listen: one pill per platform. On an episode page the Spotify
   pill points at that episode instead of the show. */
export function PlatformLinks({ spotifyUrl }: { spotifyUrl?: string }) {
  return (
    <div className="pl-row">
      {PLATFORMS.map((p) => (
        <a
          key={p.name}
          className="pl-link"
          href={p.name === "Spotify" && spotifyUrl ? spotifyUrl : p.url}
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={p.d} />
          </svg>
          {p.name}
        </a>
      ))}
    </div>
  )
}
