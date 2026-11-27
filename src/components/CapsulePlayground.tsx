"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowClockwise, Pause, Play } from "@phosphor-icons/react";
import type { Body, Engine } from "matter-js";
import { getGlyphRectangles } from "../lib/glyph-colliders";

const fallingPalette = [
  { color: "red", source: "red", hue: 0, saturation: 1, brightness: 1 },
  { color: "mint", source: "yellow", hue: 80, saturation: 0.65, brightness: 1.06 },
  { color: "orange", source: "orange", hue: 0, saturation: 1, brightness: 1 },
  { color: "cyan", source: "blue", hue: -45, saturation: 0.8, brightness: 1.12 },
  { color: "yellow", source: "yellow", hue: 0, saturation: 1, brightness: 1 },
  { color: "pink", source: "red", hue: -38, saturation: 0.7, brightness: 1.1 },
  { color: "blue", source: "blue", hue: 0, saturation: 1, brightness: 1 },
  { color: "aqua", source: "blue", hue: -65, saturation: 0.5, brightness: 1.18 },
  { color: "violet", source: "violet", hue: 0, saturation: 1, brightness: 1 },
  { color: "lilac", source: "violet", hue: 0, saturation: 0.5, brightness: 1.18 },
] as const;

export const capsuleColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "violet",
  "pink",
] as const;

type Actor = {
  body: Body;
  node: HTMLImageElement;
  shadow: HTMLSpanElement;
  width: number;
  height: number;
  imageOffsetY: number;
};

export default function CapsulePlayground() {
  const surface = useRef<HTMLDivElement>(null);
  const restart = useRef<() => void>(() => {});
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stage = surface.current;
    if (!stage) return;
    let disposed = false;
    let cleanup = () => {};

    void Promise.all([import("matter-js"), document.fonts.ready]).then(([module]) => {
      if (disposed) return;
      const Matter = module.default ?? module;
      const { Bodies, Body, Composite, Engine, Events, Sleeping, Vector, Vertices } = Matter;
      const engine: Engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 1.55;
      engine.positionIterations = 10;
      engine.velocityIterations = 8;
      let actors: Actor[] = [];
      let walls: Body[] = [];
      let letters: Body[] = [];
      let headlineRamp: Body | null = null;
      let frame = 0;
      let lastTime = 0;
      let nextSpawn = 0;
      let spawned = 0;
      let animationTime = 0;
      let nextReplacement = Infinity;
      let replacement: { actor: Actor; startedAt: number } | null = null;
      let cycleCount = 0;
      let width = stage.clientWidth;
      let height = stage.clientHeight;
      // Match the desktop reference unit used by home-responsive.css.
      const motionScale = () => matchMedia("(min-width: 1200px)").matches
        ? width / 1870
        : 1;
      engine.gravity.y = 1.55 * motionScale();
      let dragging: { actor: Actor; offset: { x: number; y: number } } | null =
        null;
      let cursor = { x: 0, y: 0 };
      let visible = true;
      const motion = matchMedia("(prefers-reduced-motion: reduce)");
      reducedMotionRef.current = motion.matches;

      const render = (actor: Actor) => {
        const offsetX = -Math.sin(actor.body.angle) * actor.imageOffsetY;
        const offsetY = Math.cos(actor.body.angle) * actor.imageOffsetY;
        actor.node.style.transform = `translate3d(${actor.body.position.x + offsetX - actor.width / 2}px,${actor.body.position.y + offsetY - actor.height / 2}px,0) rotate(${actor.body.angle}rad)`;
        const elevation = Math.max(0, height - actor.body.bounds.max.y);
        const shadowScale = 0.7 + Math.min(1, elevation / 260) * 0.7;
        const fade = Number(actor.node.style.opacity || 1);
        actor.shadow.style.transform = `translate3d(${actor.body.position.x - actor.width / 2 + 8}px,${height - 10}px,0) scale(${shadowScale},1)`;
        actor.shadow.style.opacity = String(0.13 * Math.exp(-elevation / 150) * fade);
      };
      const rebuildObstacles = () => {
        letters.forEach((letter) => Composite.remove(engine.world, letter));
        if (headlineRamp) Composite.remove(engine.world, headlineRamp);
        headlineRamp = null;
        const origin = stage.getBoundingClientRect();
        const hero = stage.closest(".hero");
        const text = hero?.querySelectorAll<HTMLElement>(
          ".hero-brand",
        );
        letters = [...(text ?? [])].flatMap((element) =>
          getGlyphRectangles(element, origin).map((rect) =>
            Bodies.rectangle(
              rect.x + rect.width / 2,
              rect.y + rect.height / 2,
              rect.width,
              rect.height,
              {
                isStatic: true,
                label: "headline-letter",
                friction: 0.24,
                frictionStatic: 0.65,
                restitution: 0.6,
              },
            ),
          ),
        );
        Composite.add(engine.world, letters);
        const message = hero?.querySelector<HTMLElement>(".hero-message");
        const firstLine = message?.firstElementChild;
        if (message && firstLine) {
          const bounds = message.getBoundingClientRect();
          const firstText = document.createRange();
          firstText.selectNodeContents(firstLine);
          const first = firstText.getBoundingClientRect();
          // A continuous incline avoids a level ledge where the cap can settle.
          const left = 0;
          const top = Math.max(8, bounds.top - origin.top - 52);
          const right = Math.min(width - 24, bounds.right - origin.left + (width < 600 ? 30 : 65));
          const bottom = Math.min(height - 60, bounds.bottom - origin.top + 14);
          const shoulder = Math.min(right - 40, first.left - origin.left + first.width * 0.72);
          const entryTop = top - Math.min(64, shoulder * 0.25);
          const vertices = [
            { x: left, y: entryTop },
            { x: right, y: bottom },
            { x: left, y: bottom },
          ];
          const center = Vertices.centre(vertices);
          headlineRamp = Bodies.fromVertices(center.x, center.y, [vertices], {
            isStatic: true,
            label: "headline-ramp",
            friction: 0.01,
            frictionStatic: 0.015,
            restitution: 0.48,
          });
          Composite.add(engine.world, headlineRamp);
          stage.dataset.rampVertices = JSON.stringify(vertices);
        }
        stage.dataset.letterBodies = String(letters.length);
      };
      const rebuildWalls = () => {
        walls.forEach((wall) => Composite.remove(engine.world, wall));
        const properties = { isStatic: true, friction: 0.5, restitution: 0.56 };
        walls = [
          Bodies.rectangle(width / 2, height + 40, width + 300, 80, properties),
          Bodies.rectangle(-45, height / 2, 90, height * 4, properties),
          Bodies.rectangle(width + 45, height / 2, 90, height * 4, properties),
        ];
        Composite.add(engine.world, walls);
        rebuildObstacles();
      };
      let textHits = 0;
      let rampHits = 0;
      Events.on(engine, "collisionStart", (event) => {
        for (const pair of event.pairs) {
          if (pair.bodyA.parent.label === "headline-letter" || pair.bodyB.parent.label === "headline-letter") {
            stage.dataset.textHits = String(++textHits);
          }
          if (pair.bodyA.parent.label === "headline-ramp" || pair.bodyB.parent.label === "headline-ramp") {
            stage.dataset.rampHits = String(++rampHits);
          }
        }
      });
      const targetCount = () => (width < 600 ? 13 : 24);
      const spawn = (staticPose = false) => {
        const small = width < 600;
        const spriteWidth = small
          ? 32
          : matchMedia("(min-width: 1200px)").matches
            ? 73 * motionScale()
            : Math.min(73, width * 0.052);
        const spriteHeight = spriteWidth * (1127 / 764);
        const radius = spriteWidth * 0.465;
        const staticCount = small ? 7 : 13;
        const x = staticPose
          ? spriteWidth +
            (spawned / (staticCount - 1)) * (width - spriteWidth * 2)
          : Math.max(spriteWidth, width * 0.075);
        const y = staticPose ? height - spriteHeight * 0.52 : -spriteHeight;
        if (!staticPose) stage.dataset.spawnX = String(Math.round(x));
        const ball = Bodies.circle(x, y + spriteWidth * 0.15, radius, {
          friction: 0.5,
        });
        const cap = Bodies.trapezoid(
          x,
          y - spriteWidth * 0.43,
          spriteWidth * 0.76,
          spriteWidth * 0.34,
          0.35,
        );
        const body = Body.create({
          parts: [ball, cap],
          friction: 0.34,
          frictionStatic: 0.72,
          restitution: 0.72,
          frictionAir: 0.009,
        });
        // Set density after assembling the compound body so its mass is updated.
        Body.setDensity(body, 0.0028);
        // More rotational inertia keeps the glossy capsule feeling solid on impact.
        Body.setInertia(body, body.inertia * 1.25);
        const orientations = ["base-down", "head-down", "side-left", "side-right"] as const;
        const orientationIndex = staticPose ? 0 : spawned % orientations.length;
        const entryAngles = [0, Math.PI, -Math.PI / 2, Math.PI / 2];
        const tilt = staticPose ? -0.16 : (Math.random() - 0.5) * 0.5;
        Body.setAngle(body, entryAngles[orientationIndex] + tilt);
        if (!staticPose) {
          Body.setVelocity(body, { x: (small ? 2.6 : 4.8) * motionScale(), y: 1.8 * motionScale() });
        }
        Body.setAngularVelocity(body, staticPose ? 0 : (Math.random() - 0.5) * 0.028);
        const node = document.createElement("img");
        const finish = fallingPalette[spawned % fallingPalette.length];
        node.src = `/assets/capsule-reference-${finish.source}.webp`;
        node.style.setProperty("--capsule-hue", `${finish.hue}deg`);
        node.style.setProperty("--capsule-saturation", String(finish.saturation));
        node.style.setProperty("--capsule-brightness", String(finish.brightness));
        node.alt = "";
        node.draggable = false;
        node.width = Math.round(spriteWidth);
        node.height = Math.round(spriteHeight);
        node.className = "physics-capsule";
        node.dataset.color = finish.color;
        node.dataset.entryOrientation = orientations[orientationIndex];
        node.dataset.sequence = String(spawned);
        stage.appendChild(node);
        const shadow = document.createElement("span");
        shadow.className = "capsule-ground-shadow";
        shadow.style.width = `${spriteWidth}px`;
        stage.appendChild(shadow);
        const imageOffsetY =
          ball.position.y - body.position.y - spriteWidth * 0.245;
        const actor = {
          body,
          node,
          shadow,
          width: spriteWidth,
          height: spriteHeight,
          imageOffsetY,
        };
        actors.push(actor);
        Composite.add(engine.world, body);
        render(actor);
        spawned += 1;
      };

      const reset = () => {
        dragging = null;
        stage.classList.remove("is-dragging");
        actors.forEach(({ body, node, shadow }) => {
          Composite.remove(engine.world, body);
          node.remove();
          shadow.remove();
        });
        actors = [];
        spawned = 0;
        animationTime = 0;
        nextReplacement = Infinity;
        replacement = null;
        cycleCount = 0;
        stage.dataset.cycleCount = "0";
        stage.dataset.cyclePhase = reducedMotionRef.current ? "static" : "filling";
        textHits = 0;
        rampHits = 0;
        stage.dataset.textHits = "0";
        stage.dataset.rampHits = "0";
        nextSpawn = 0;
        if (reducedMotionRef.current) {
          const count = width < 600 ? 7 : 13;
          for (let i = 0; i < count; i++) spawn(true);
          for (let i = 0; i < 200; i++) Engine.update(engine, 1000 / 60);
          actors.forEach(render);
        }
      };
      restart.current = reset;
      rebuildWalls();
      reset();
      setReady(true);

      const tick = (time: number) => {
        const step = Math.min(time - lastTime, 1000 / 60);
        lastTime = time;
        if (
          visible &&
          !document.hidden &&
          !pausedRef.current &&
          !reducedMotionRef.current
        ) {
          animationTime += step || 1000 / 60;
          if (spawned < targetCount() && animationTime >= nextSpawn) {
            spawn();
            nextSpawn = animationTime + 600;
            if (spawned === targetCount()) {
              nextReplacement = animationTime + 3200;
              stage.dataset.cyclePhase = "waiting";
            }
          }
          // Fade one landed capsule out completely before adding its replacement.
          // This clock advances only while the visible animation is playing.
          if (replacement) {
            const progress = Math.min(1, (animationTime - replacement.startedAt) / 280);
            replacement.actor.node.style.opacity = String(1 - progress);
            if (progress >= 1) {
              const retired = replacement.actor;
              Composite.remove(engine.world, retired.body);
              retired.node.remove();
              retired.shadow.remove();
              actors = actors.filter((actor) => actor !== retired);
              replacement = null;
              spawn();
              stage.dataset.cycleCount = String(++cycleCount);
              stage.dataset.cyclePhase = "waiting";
              nextReplacement = animationTime + 3200;
            }
          } else if (!dragging && animationTime >= nextReplacement) {
            const hasLanded = (actor: Actor) => actor.body.isSleeping || actor.body.position.y > height * 0.58;
            if (actors.every(hasLanded)) {
              const actor = actors.find(hasLanded);
              if (actor) {
                replacement = { actor, startedAt: animationTime };
                stage.dataset.cyclePhase = "fading";
              }
            }
          }
          if (dragging) {
            const body = dragging.actor.body;
            Sleeping.set(body, false);
            const destination = Vector.sub(cursor, dragging.offset);
            Body.setVelocity(
              body,
              Vector.mult(Vector.sub(destination, body.position), 0.16),
            );
          }
          // Resolve fast landings in smaller steps, especially on narrow screens.
          const substep = (step || 1000 / 60) / 2;
          Engine.update(engine, substep);
          Engine.update(engine, substep);
          actors.forEach(render);
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);

      const coordinates = (event: PointerEvent) => {
        const bounds = stage.getBoundingClientRect();
        return {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };
      };
      const isOverActor = (actor: Actor, point: { x: number; y: number }) => {
        const local = Vector.rotate(
          Vector.sub(point, actor.body.position),
          -actor.body.angle,
        );
        return (
          Math.abs(local.x) < actor.width / 2 &&
          Math.abs(local.y - actor.imageOffsetY) < actor.height / 2
        );
      };
      const onDown = (event: PointerEvent) => {
        if (pausedRef.current || reducedMotionRef.current) return;
        cursor = coordinates(event);
        const actor = [...actors]
          .reverse()
          .find((actor) => actor !== replacement?.actor && isOverActor(actor, cursor));
        if (!actor) return;
        event.preventDefault();
        dragging = { actor, offset: Vector.sub(cursor, actor.body.position) };
        Sleeping.set(actor.body, false);
        stage.setPointerCapture(event.pointerId);
        stage.classList.add("is-dragging");
      };
      const onMove = (event: PointerEvent) => {
        cursor = coordinates(event);
        stage.style.cursor = dragging
          ? "grabbing"
          : actors.some((actor) => isOverActor(actor, cursor))
            ? "grab"
            : "default";
      };
      const onUp = () => {
        dragging = null;
        stage.classList.remove("is-dragging");
      };
      stage.addEventListener("pointerdown", onDown);
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerup", onUp);
      stage.addEventListener("pointercancel", onUp);
      const observer = new ResizeObserver(() => {
        const oldWidth = width;
        const oldHeight = height;
        width = stage.clientWidth;
        height = stage.clientHeight;
        engine.gravity.y = 1.55 * motionScale();
        if (Math.abs(oldWidth - width) < 2 && Math.abs(oldHeight - height) < 2)
          return;
        rebuildWalls();
        actors.forEach((actor) => {
          Body.setPosition(actor.body, {
            x: Math.max(
              actor.width,
              Math.min(
                width - actor.width,
                (actor.body.position.x * width) / oldWidth,
              ),
            ),
            y: Math.min(
              height - actor.height / 2,
              (actor.body.position.y * height) / oldHeight,
            ),
          });
          Sleeping.set(actor.body, false);
        });
        // Recreate every capsule when the shared responsive size changes.
        if (Math.abs(oldWidth - width) >= 2) reset();
      });
      observer.observe(stage);
      const intersection = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
      });
      intersection.observe(stage);
      const onMotionChange = () => {
        reducedMotionRef.current = motion.matches;
        reset();
      };
      motion.addEventListener("change", onMotionChange);
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        intersection.disconnect();
        motion.removeEventListener("change", onMotionChange);
        stage.removeEventListener("pointerdown", onDown);
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerup", onUp);
        stage.removeEventListener("pointercancel", onUp);
        actors.forEach((actor) => {
          actor.node.remove();
          actor.shadow.remove();
        });
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  function togglePause() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  }

  function replay() {
    pausedRef.current = false;
    setPaused(false);
    restart.current();
  }

  return (
    <>
      <div
        className="capsule-playground"
        ref={surface}
        aria-hidden="true"
        data-ready={ready}
      />
      <div className="playground-controls">
        <span>Go on, give them a nudge.</span>
        <button
          type="button"
          aria-label={
            paused ? "Play capsule animation" : "Pause capsule animation"
          }
          onClick={togglePause}
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
        <button
          type="button"
          aria-label="Replay falling capsules"
          onClick={replay}
        >
          <ArrowClockwise size={16} />
        </button>
      </div>
    </>
  );
}
