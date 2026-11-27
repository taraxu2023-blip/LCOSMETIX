"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Props = {
  src: string;
  poster: string;
  label: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
};

export default function ScrollVideo({ src, poster, label, width, height, style }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !window.IntersectionObserver) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let manuallyPaused = false;
    let automaticPauseEvents = 0;
    let playPending = false;
    let resyncAfterPendingPlay = false;
    let disposed = false;
    video.muted = true;

    function pauseAutomatically() {
      if (!video!.paused) {
        automaticPauseEvents += 1;
        video!.pause();
      }
    }

    function syncPlayback() {
      if (!inView || document.hidden || reducedMotion.matches) {
        pauseAutomatically();
        return;
      }
      if (manuallyPaused || !video!.paused) return;
      if (playPending) { resyncAfterPendingPlay = true; return; }
      resyncAfterPendingPlay = false;
      playPending = true;
      video!.play().then(() => {
        if (!disposed && (!inView || document.hidden)) pauseAutomatically();
      }).catch(() => {
        // Keep native controls available when the browser declines autoplay.
      }).finally(() => {
        playPending = false;
        // Re-entry can arrive before a canceled play() attempt settles.
        // Retry only a queued visibility request, never an autoplay denial loop.
        if (resyncAfterPendingPlay && !disposed) {
          resyncAfterPendingPlay = false;
          syncPlayback();
        }
      });
    }

    function onPause() {
      if (automaticPauseEvents > 0) { automaticPauseEvents -= 1; return; }
      if (inView && !document.hidden) manuallyPaused = true;
    }

    function onPlay() {
      manuallyPaused = false;
      if (!inView || document.hidden) pauseAutomatically();
    }

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      if (visible === inView) return;
      inView = visible;
      syncPlayback();
    }, { threshold: [0, 0.35] });

    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", syncPlayback);
    observer.observe(video);

    return () => {
      disposed = true;
      inView = false;
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, [src]);

  return <video ref={ref} controls muted playsInline loop preload="none" poster={poster}
    width={width} height={height} style={style} aria-label={label}>
    <source src={src} type="video/mp4" />
    Your browser does not support this video. <a href={src}>Open the video</a>.
  </video>;
}
