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

// Feed titles carry format tags and old show branding; split those off so
// the title can be set large on its own.
function parseTitle(raw: string) {
  let t = raw.replace(/\s*\|\s*Found3s on W3GM\s*$/i, "")
  let tag: string | undefined
  t = t.replace(/\s*[[{(]\s*(roundtable)\s*[\]})]\s*/i, (_m, g: string) => {
    tag = g[0].toUpperCase() + g.slice(1).toLowerCase()
    return " "
  })
  return { title: t.replace(/\s+/g, " ").trim().replace(/[.]$/, ""), tag }
}

function sizeFor(title: string) {
  return title.length <= 26 ? "pc-xl" : title.length <= 46 ? "pc-l" : "pc-m"
}

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="3.6" height="14" rx="1" /><rect x="13.9" y="5" width="3.6" height="14" rx="1" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8c0 .8.9 1.3 1.6.9l10-6.4c.6-.4.6-1.4 0-1.8l-10-6.4C8.9 4.3 8 4.8 8 5.6z" /></svg>
  )
}

const PANEL_TONES = ["pc-panel-ink", "pc-panel-grey", "pc-panel-paper"]

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

  const n = episodes.length
  const latest = episodes.slice(0, 3)
  const rest = episodes.slice(3)
  const on = (i: number) => current === i && playing

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audio} preload="none" />

      {latest.map((ep, i) => {
        const { title, tag } = parseTitle(ep.title)
        return (
          <section key={`${ep.title}-${i}`} className={`pc-panel ${PANEL_TONES[i]}`} aria-label={title}>
            <h2 className={`pc-ep-t ${sizeFor(title)}`}>{title}</h2>
            <div className="pc-ep-side">
              <p className="pc-ep-meta">
                {i === 0 ? "Latest · " : ""}Episode {n - i}
                {tag ? ` · ${tag}` : ""}
              </p>
              <p className="pc-ep-meta pc-ep-when">
                {ep.date}
                {ep.duration ? ` · ${ep.duration}` : ""}
              </p>
              {ep.description ? <p className="pc-ep-d">{ep.description.split(/\s*Chapters\s*\d/)[0]}</p> : null}
              <button type="button" className="pc-btn" onClick={() => toggle(i)} aria-label={on(i) ? `Pause ${title}` : `Play ${title}`}>
                <PlayIcon playing={on(i)} />
                {on(i) ? "Pause" : current === i ? "Resume" : "Listen now"}
              </button>
            </div>
          </section>
        )
      })}

      {rest.length ? (
        <section className="pc-all" aria-labelledby="pc-all-h">
          <h2 id="pc-all-h" className="pc-all-h">All episodes</h2>
          <ol className="pc-list">
            {rest.map((ep, j) => {
              const i = j + 3
              const { title, tag } = parseTitle(ep.title)
              return (
                <li key={`${ep.title}-${i}`} className={current === i ? "pc-row is-current" : "pc-row"}>
                  <span className="pc-n">{String(n - i).padStart(2, "0")}</span>
                  <span className="pc-row-t">
                    {title}
                    {tag ? <span className="pc-tag">{tag}</span> : null}
                  </span>
                  <span className="pc-row-m">{ep.date}</span>
                  <span className="pc-row-m">{ep.duration}</span>
                  <button
                    type="button"
                    className={on(i) ? "pc-play is-on" : "pc-play"}
                    onClick={() => toggle(i)}
                    aria-label={on(i) ? `Pause ${title}` : `Play ${title}`}
                  >
                    <PlayIcon playing={on(i)} />
                  </button>
                </li>
              )
            })}
          </ol>
        </section>
      ) : null}

      <div className={current === null ? "pc-bar" : "pc-bar is-on"} aria-hidden={current === null}>
        {current !== null ? (
          <>
            <button type="button" className="pc-play is-on" onClick={() => toggle(current)} aria-label={playing ? "Pause" : "Play"}>
              <PlayIcon playing={playing} />
            </button>
            <button type="button" className="pc-skip" onClick={() => skip(-15)} aria-label="Back 15 seconds">−15</button>
            <button type="button" className="pc-skip" onClick={() => skip(15)} aria-label="Forward 15 seconds">+15</button>
            <div className="pc-bar-main">
              <p className="pc-bar-t">{parseTitle(episodes[current].title).title}</p>
              <div className="pc-track" onClick={seek} role="presentation">
                <div className="pc-fill" style={{ width: len ? `${(time / len) * 100}%` : "0%" }} />
              </div>
            </div>
            <span className="pc-time">{clock(time)} / {clock(len)}</span>
          </>
        ) : null}
      </div>
    </>
  )
}
