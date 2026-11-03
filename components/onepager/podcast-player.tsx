"use client"

import { useEffect, useRef, useState } from "react"

export type PodEpisode = {
  title: string
  date: string
  duration: string
  description: string
  audioUrl: string
}

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

export function PodcastPlayer({ episodes }: { episodes: PodEpisode[] }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState<number | null>(null)
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

  const toggle = (i: number) => {
    const a = audio.current
    if (!a) return
    if (current === i) {
      if (a.paused) void a.play()
      else a.pause()
      return
    }
    setCurrent(i)
    setTime(0)
    setLen(0)
    a.src = episodes[i].audioUrl
    void a.play()
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audio.current
    if (!a || !len) return
    const r = e.currentTarget.getBoundingClientRect()
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * len
  }
  const skip = (d: number) => {
    const a = audio.current
    if (a) a.currentTime = Math.max(0, Math.min(len || a.duration || 0, a.currentTime + d))
  }

  const lead = episodes[0]
  const rest = episodes.slice(1)
  const n = episodes.length

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audio} preload="none" />

      {lead ? (
        <article className="pod-lead">
          <div>
            <p className="pod-meta">Latest episode &middot; {lead.date}{lead.duration ? ` · ${lead.duration}` : ""}</p>
            <h2 className="pod-lead-t">{lead.title}</h2>
            {lead.description ? <p className="pod-lead-d">{lead.description}</p> : null}
          </div>
          <button
            type="button"
            className={current === 0 && playing ? "pod-play pod-play-lg is-on" : "pod-play pod-play-lg"}
            onClick={() => toggle(0)}
            aria-label={current === 0 && playing ? `Pause ${lead.title}` : `Play ${lead.title}`}
          >
            <PlayIcon playing={current === 0 && playing} />
          </button>
        </article>
      ) : null}

      {rest.length ? (
        <ol className="pod-list" aria-label="All episodes">
          {rest.map((ep, j) => {
            const i = j + 1
            const on = current === i && playing
            return (
              <li key={`${ep.title}-${i}`} className={current === i ? "pod-row is-current" : "pod-row"}>
                <span className="pod-n">{String(n - i).padStart(2, "0")}</span>
                <div className="pod-row-main">
                  <h3 className="pod-row-t">{ep.title}</h3>
                  {ep.description ? <p className="pod-row-d">{ep.description}</p> : null}
                </div>
                <span className="pod-row-m">
                  {ep.date}
                  {ep.duration ? <><br />{ep.duration}</> : null}
                </span>
                <button
                  type="button"
                  className={on ? "pod-play is-on" : "pod-play"}
                  onClick={() => toggle(i)}
                  aria-label={on ? `Pause ${ep.title}` : `Play ${ep.title}`}
                >
                  <PlayIcon playing={on} />
                </button>
              </li>
            )
          })}
        </ol>
      ) : null}

      <div className={current === null ? "pod-bar" : "pod-bar is-on"} aria-hidden={current === null}>
        {current !== null ? (
          <>
            <button type="button" className="pod-play" onClick={() => toggle(current)} aria-label={playing ? "Pause" : "Play"}>
              <PlayIcon playing={playing} />
            </button>
            <button type="button" className="pod-skip" onClick={() => skip(-15)} aria-label="Back 15 seconds">−15</button>
            <button type="button" className="pod-skip" onClick={() => skip(15)} aria-label="Forward 15 seconds">+15</button>
            <div className="pod-bar-main">
              <p className="pod-bar-t">{episodes[current].title}</p>
              <div className="pod-track" onClick={seek} role="presentation">
                <div className="pod-fill" style={{ width: len ? `${(time / len) * 100}%` : "0%" }} />
              </div>
            </div>
            <span className="pod-time">{clock(time)} / {clock(len)}</span>
          </>
        ) : null}
      </div>
    </>
  )
}
