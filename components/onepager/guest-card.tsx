"use client"

import Image from "next/image"
import { useState } from "react"

function initials(name: string) {
  return name
    .replace(/^the\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

/* A guest from the show notes: their X profile photo (via unavatar.io,
   cached by the image optimiser), name and handle. Falls back to initials
   when no photo can be found. */
export function GuestCard({ name, handle, url }: { name: string; handle: string; url: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <a className="gc" href={url} target="_blank" rel="noopener">
      <span className="gc-face">
        {failed ? (
          <span className="gc-init" aria-hidden="true">{initials(name)}</span>
        ) : (
          <Image
            src={`https://unavatar.io/x/${handle}?fallback=false`}
            alt=""
            width={160}
            height={160}
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className="gc-name">{name}</span>
      <span className="gc-handle">@{handle} <span aria-hidden="true">↗</span></span>
    </a>
  )
}
