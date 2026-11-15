"use client";

import Image from "next/image";
import { useState } from "react";
import s from "./case.module.css";

type Props = { src: string; poster: string; width: number; height: number; label: string };

/** Poster with a play button; the video only loads once the visitor asks for it. */
export default function DemoVideo({ src, poster, width, height, label }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={s.demo} style={{ aspectRatio: `${width} / ${height}` }}>
      {playing ? (
        <video src={src} poster={poster} controls autoPlay muted playsInline preload="auto" aria-label={label} />
      ) : (
        <button type="button" className={s.demoPoster} onClick={() => setPlaying(true)} aria-label={`Play: ${label}`}>
          <Image src={poster} alt="" fill sizes="(max-width: 1152px) 100vw, 1120px" />
          <span className={s.demoPlay} aria-hidden>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
              <path d="M7 4.5v13l11-6.5z" />
            </svg>
          </span>
          <span className={s.demoTime} aria-hidden>
            0:30 · NO SOUND
          </span>
        </button>
      )}
    </div>
  );
}
