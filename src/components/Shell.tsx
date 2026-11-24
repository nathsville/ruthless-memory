import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Volume2,
  VolumeX,
  Disc3,
  X,
  MousePointer2,
} from "lucide-react";
import { editions, links } from "../data";
import { DiscFace } from "./DiscFace";
import { gsap, reducedMotion } from "../motion";
import { setSound, sound } from "../audio";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link className={`brand ${className}`} to="/" aria-label="RUTHLESS home">
      <span>
        RUTH
        <br />
        LESS<span className="brand-star">✳</span>
      </span>
      <small>INDEPENDENT MEMORIES</small>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [audio, setAudio] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const tab = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        tab.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest(".navigation")) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  useLayoutEffect(() => {
    const el = menu.current;
    if (!el) return;
    gsap.killTweensOf(el);
    const panelTween = gsap.to(el, {
      y: 0,
      yPercent: open ? 0 : -115,
      autoAlpha: open ? 1 : 0,
      duration: reducedMotion() ? 0 : open ? 0.75 : 0.5,
      ease: open ? "back.out(1.3)" : "power3.inOut",
    });
    const labelTween =
      open && !reducedMotion()
        ? gsap.fromTo(
            el.querySelectorAll(".nav-label"),
            { yPercent: 110, rotate: 5 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 0.65,
              stagger: 0.07,
              ease: "power4.out",
              delay: 0.14,
            },
          )
        : null;
    return () => {
      panelTween.kill();
      labelTween?.kill();
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="masthead">
        <Link to="/" className="mast-note">
          PHYSICAL DISCS.
          <br />
          VERY REAL FEELINGS.
        </Link>
        <Brand />
        <span className="mast-edition">DESIGNED TO BE KEPT.</span>
      </header>
      <nav className={`navigation ${open ? "is-open" : ""}`} aria-label="Main">
        <div ref={menu} className="menu-panel" id="main-menu" inert={!open}>
          {location.pathname !== "/" && (
            <Link to="/" className="menu-link">
              <span className="menu-mini">
                <DiscFace edition={editions[0]} />
              </span>
              <span className="nav-clip">
                <span className="nav-label">HOME</span>
              </span>
              <ArrowUpRight />
            </Link>
          )}
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="menu-link"
              onMouseEnter={() => sound("select")}
            >
              <span className="menu-mini">
                <DiscFace edition={editions[i]} />
              </span>
              <span className="nav-clip">
                <span className="nav-label">{link.label}</span>
              </span>
              <ArrowUpRight />
            </Link>
          ))}
          <div className="menu-bottom">
            <span>GOOD THINGS GO ROUND.</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={18} />
            </button>
          </div>
        </div>
        <button
          ref={tab}
          className="pull-tab"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => {
            sound("sweep");
            setOpen(!open);
          }}
        >
          <span>{open ? "CLOSE ME" : "PULL ME"}</span>
          <span className="tab-perforation" />
        </button>
      </nav>
      <button
        className={`sound-toggle ${audio ? "is-on" : ""}`}
        aria-label={audio ? "Turn sound off" : "Turn sound on"}
        aria-pressed={audio}
        onClick={() => {
          setSound(!audio);
          setAudio(!audio);
          sound("select");
        }}
      >
        <Disc3 size={24} />
        <span>SOUND {audio ? "ON" : "OFF"}</span>
        {audio ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>
    </>
  );
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches || reducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const x = gsap.quickTo(el, "x", { duration: 0.15, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.15, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX + 9);
      y(e.clientY + 9);
      el.classList.add("is-visible");
      el.classList.toggle(
        "is-link",
        !!(e.target as HTMLElement).closest("a,button,[data-drag]"),
      );
    };
    const leave = () => el.classList.remove("is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className="custom-cursor" aria-hidden="true">
      <MousePointer2 size={25} fill="currentColor" />
      <span>PLAY</span>
    </div>
  );
}

export function OrbitButton({
  to,
  children = "EXPLORE",
  className = "",
}: {
  to: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`orbit-button ${className}`}
      onMouseEnter={() => sound("select")}
    >
      <span>{children}</span>
      <ArrowUpRight size={26} />
    </Link>
  );
}

export function Sticker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`sticker ${className}`}>{children}</span>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label">
      <i />
      {children}
    </span>
  );
}
