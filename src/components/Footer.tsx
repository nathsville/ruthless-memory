import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Matter from "matter-js";
import { ArrowUpRight, Instagram, Mail, Music2 } from "lucide-react";
import { editions, links, site } from "../data";
import { DiscFace } from "./DiscFace";
import { Brand } from "./Shell";
import { SplitText, reducedMotion } from "../motion";
import { sound } from "../audio";

function Playground() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const nodes = [...el.querySelectorAll<HTMLElement>(".physics-ball")];
    const { Engine, Bodies, Body, Composite, Constraint, Events } = Matter;
    const engine = Engine.create({ gravity: { x: 0, y: 1.15 } });
    let bodies: Matter.Body[] = [],
      walls: Matter.Body[] = [],
      visible = false,
      raf = 0,
      drag: Matter.Constraint | null = null,
      pressed = false,
      moved = false,
      startX = 0,
      startY = 0,
      lastHit = 0;
    const build = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      if (!w || !h) return;
      Composite.clear(engine.world, false);
      bodies = nodes.map((node, i) => {
        node.style.left = "0px";
        const radius = node.offsetWidth / 2;
        return Bodies.circle(
          radius + ((w - radius * 2) * i) / (nodes.length - 1),
          -radius - (i % 3) * radius,
          radius,
          {
            restitution: 0.82,
            friction: 0.035,
            frictionAir: 0.006,
            angle: (i - 3) * 0.22,
            density: 0.0018,
          },
        );
      });
      walls = [
        Bodies.rectangle(w / 2, h + 35, w + 100, 80, { isStatic: true }),
        Bodies.rectangle(-40, h / 2 - 200, 80, h + 1200, { isStatic: true }),
        Bodies.rectangle(w + 40, h / 2 - 200, 80, h + 1200, { isStatic: true }),
      ];
      Composite.add(engine.world, [...bodies, ...walls]);
      drag = null;
    };
    build();
    const resize = new ResizeObserver(build);
    resize.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    const point = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e: PointerEvent) => {
      const p = point(e);
      const index = nodes.findIndex((node) => node.contains(e.target as Node));
      if (index < 0 || !bodies[index]) return;
      pressed = true;
      moved = false;
      delete el.dataset.dragged;
      startX = e.clientX;
      startY = e.clientY;
      const body = bodies[index];
      Body.setVelocity(body, { x: 0, y: 0 });
      drag = Constraint.create({
        pointA: p,
        bodyB: body,
        pointB: { x: p.x - body.position.x, y: p.y - body.position.y },
        stiffness: 0.16,
        damping: 0.07,
        length: 0,
      });
      Composite.add(engine.world, drag);
      nodes[index].setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 6) {
        moved = true;
        el.dataset.dragged = "true";
      }
      drag.pointA = point(e);
    };
    const up = () => {
      if (drag) Composite.remove(engine.world, drag);
      drag = null;
      pressed = false;
    };
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    Events.on(engine, "collisionStart", () => {
      const now = performance.now();
      if (visible && now - lastHit > 150) {
        lastHit = now;
        sound("hit");
      }
    });
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const delta = Math.min(now - last, 16.666);
      last = now;
      if (!visible || document.hidden) return;
      Engine.update(engine, delta);
      bodies.forEach((body, i) => {
        nodes[i].style.transform =
          `translate3d(${body.position.x - nodes[i].offsetWidth / 2}px,${body.position.y - nodes[i].offsetWidth / 2}px,0) rotate(${body.angle}rad)`;
      });
      el.classList.toggle("is-dragging", pressed);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);
  return (
    <div ref={ref} className="footer-playground" data-drag onDragStart={(event) => event.preventDefault()}>
      {editions.slice(0, 4).map((edition) => (
        <Link
          className="physics-ball"
          key={edition.id}
          to={`/products/${edition.id}`}
          aria-label={`Explore ${edition.name}`}
          draggable="false"
        >
          <DiscFace edition={edition} />
        </Link>
      ))}
      <Link
        to="/contact"
        className="physics-ball social-ball"
        aria-label="Contact RUTHLESS"
      >
        <Mail />
      </Link>
      <a
        href={site.instagram}
        target="_blank"
        rel="noreferrer"
        className="physics-ball social-ball"
        aria-label="Open Instagram"
      >
        <Instagram />
      </a>
      <Link
        to="/news"
        className="physics-ball social-ball"
        aria-label="Read On Repeat"
      >
        <Music2 />
      </Link>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer paper">
      <nav className="footer-nav" aria-label="Footer">
        {links.map((link) => (
          <Link to={link.to} key={link.to}>
            {link.label}
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </nav>
      <div className="footer-center">
        <Brand />
        <SplitText as="h2" className="footer-title">
          {"KEEP IT\nRUTHLESS."}
        </SplitText>
        <p className="scribble footer-note">give them a spin ↘</p>
      </div>
      <Playground />
      <div className="footer-legal">
        <span>
          © {new Date().getFullYear()} RUTHLESS. GOOD THINGS GO ROUND.
        </span>
        <Link to="/credits">Image credits</Link>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reducedMotion() ? "instant" : "smooth",
            })
          }
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
