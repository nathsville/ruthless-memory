import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const reducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SplitText({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion() || e.pointerType === "touch") return;
    const chars = ref.current?.querySelectorAll<HTMLElement>(".letter");
    if (!chars) return;
    chars.forEach((char) => {
      const r = char.getBoundingClientRect();
      const distance = Math.abs(e.clientX - r.left - r.width / 2);
      const influence = Math.max(0, 1 - distance / 170);
      gsap.to(char, {
        y: -influence * 23,
        rotate: (e.clientX < r.left ? -1 : 1) * influence * 10,
        scale: 1 + influence * 0.075,
        duration: 0.3,
        overwrite: "auto",
      });
    });
  };
  const leave = () => {
    if (ref.current)
      gsap.to(ref.current.querySelectorAll(".letter"), {
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1,.4)",
        overwrite: "auto",
      });
  };
  return (
    <Tag
      ref={ref as never}
      aria-label={children}
      className={`split ${className}`}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children.split("\n").map((line, index) => (
        <span className="split-line" key={index} aria-hidden="true">
          {[...line].map((letter, i) => (
            <span
              className="letter"
              style={{ "--char-index": i } as React.CSSProperties}
              key={i}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

export function MotionScope({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 65, rotate: Number(el.dataset.rotate || 0), opacity: 0.15 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 15);
        gsap.fromTo(
          el,
          { yPercent: -amount, rotate: -3 },
          {
            yPercent: amount,
            rotate: 3,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    }, root);
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
