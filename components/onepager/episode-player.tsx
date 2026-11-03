"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

import type { Chapter } from "@/lib/podcast"

function clock(s: number) {
  if (!isFinite(s) || s < 0) return "0:00"
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`
}

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="3.6" height="14" rx="1" /><rect x="13.9" y="5" width="3.6" height="14" rx="1" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8c0 .8.9 1.3 1.6.9l10-6.4c.6-.4.6-1.4 0-1.8l-10-6.4C8.9 4.3 8 4.8 8 5.6z" /></svg>
  )
}

type Audio = {
  playing: boolean
  time: number
  len: number
  toggle: () => void
  jump: (at: number) => void
  skip: (d: number) => void
  seekTo: (fraction: number) => void
}

const Ctx = createContext<Audio | null>(null)
const useAudio = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error("EpisodeAudio missing")
  return v
}

/* One audio element per episode page, shared by the play controls in the
   header and the chapter grid further down. */
export function EpisodeAudio({ audioUrl, children }: { audioUrl: string; children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [len, setLen] = useState(0)

  useEffect(() => {
    const a = audio.current
    if (!a) return
    const onTime = () => setTime(a.currentTime)
    const onMeta = () => setLen(a.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("loadedmetadata", onMeta)
    a.addEventListener("play", onPlay)
    a.addEventListener("pause", onPause)
    a.addEventListener("ended", onPause)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("loadedmetadata", onMeta)
      a.removeEventListener("play", onPlay)
      a.removeEventListener("pause", onPause)
      a.removeEventListener("ended", onPause)
    }
  }, [])

  const value: Audio = {
    playing,
    time,
    len,
    toggle: () => {
      const a = audio.current
      if (!a) return
      if (a.paused) void a.play()
      else a.pause()
    },
    jump: (at) => {
      const a = audio.current
      if (!a) return
      a.currentTime = at
      void a.play()
    },
    skip: (d) => {
      const a = audio.current
      if (a) a.currentTime = Math.max(0, Math.min(len || a.duration || 0, a.currentTime + d))
    },
    seekTo: (f) => {
      const a = audio.current
      if (a && len) a.currentTime = Math.max(0, Math.min(1, f)) * len
    },
  }

  return (
    <Ctx.Provider value={value}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audio} src={audioUrl} preload="metadata" />
      {children}
    </Ctx.Provider>
  )
}

export function EpisodeControls({ title }: { title: string }) {
  const { playing, time, len, toggle, skip, seekTo } = useAudio()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: nothing to do */
    }
  }
  return (
    <div className="ep-player">
      <button type="button" className="ep-play" onClick={toggle} aria-label={playing ? `Pause ${title}` : `Play ${title}`}>
        <PlayIcon playing={playing} />
      </button>
      <div className="ep-player-main">
        <div
          className="ep-track"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            seekTo((e.clientX - r.left) / r.width)
          }}
          role="presentation"
        >
          <div className="ep-fill" style={{ width: len ? `${(time / len) * 100}%` : "0%" }} />
        </div>
        <div className="ep-player-row">
          <span className="ep-time">{clock(time)} / {clock(len)}</span>
          <span className="ep-skips">
            <button type="button" className="pc-skip" onClick={() => skip(-15)} aria-label="Back 15 seconds">−15</button>
            <button type="button" className="pc-skip" onClick={() => skip(15)} aria-label="Forward 15 seconds">+15</button>
          </span>
          <button type="button" className="ep-copy" onClick={copy}>
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  )
}

export function EpisodeChapters({ chapters }: { chapters: Chapter[] }) {
  const { time, jump } = useAudio()
  const current = chapters.reduce((acc, c, i) => (time >= c.at ? i : acc), -1)
  return (
    <section className="ep-chapters" aria-labelledby="ep-ch-h">
      <h2 id="ep-ch-h" className="ep-sec-h">Chapters</h2>
      <div className="ep-ch-grid">
        {chapters.map((c, i) => (
          <button key={c.stamp} type="button" className={i === current && time > 0 ? "ep-ch is-on" : "ep-ch"} onClick={() => jump(c.at)}>
            <span className="ep-ch-t">{c.stamp}</span>
            <span className="ep-ch-l">{c.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
