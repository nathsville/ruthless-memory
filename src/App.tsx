import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import { Cursor, Header } from "./components/Shell";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import {
  About,
  Article,
  Contact,
  Credits,
  News,
  NotFound,
  ProductDetail,
  Products,
} from "./pages/Pages";
import { gsap, reducedMotion, ScrollTrigger } from "./motion";
import { DiscFace } from "./components/DiscFace";
import { editions } from "./data";
import { sound } from "./audio";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const curtain = useRef<HTMLDivElement>(null);
  const transitioning = useRef(false);
  const lenis = useRef<Lenis | null>(null);
  const [boot, setBoot] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion()) return;
    const scroll = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      wheelMultiplier: 1.05,
      syncTouch: false,
    });
    lenis.current = scroll;
    scroll.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => scroll.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const anchors = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      )
        return;
      const playground = anchor.closest<HTMLElement>(".footer-playground");
      if (playground?.dataset.dragged === "true") {
        e.preventDefault();
        e.stopPropagation();
        delete playground.dataset.dragged;
        return;
      }
      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.hash ||
        !["http:", "https:"].includes(url.protocol)
      )
        return;
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      if (transitioning.current) return;
      transitioning.current = true;
      scroll.stop();
      sound("sweep");
      const el = curtain.current;
      gsap
        .timeline()
        .set(el, { visibility: "visible", y: 0, yPercent: -110 })
        .to(el, { yPercent: 0, duration: 0.55, ease: "power3.inOut" })
        .call(() => {
          navigate(url.pathname + url.search);
          scroll.scrollTo(0, { immediate: true, force: true });
          window.scrollTo(0, 0);
        })
        .to(el, {
          yPercent: 110,
          duration: 0.7,
          delay: 0.15,
          ease: "power4.inOut",
        })
        .set(el, { visibility: "hidden" })
        .call(() => {
          transitioning.current = false;
          scroll.start();
          ScrollTrigger.refresh();
        });
    };
    document.addEventListener("click", anchors, true);
    return () => {
      document.removeEventListener("click", anchors, true);
      gsap.ticker.remove(tick);
      scroll.destroy();
      lenis.current = null;
    };
  }, [navigate]);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const update = (now: number) => {
      const value = Math.min(100, Math.round((now - start) / 13));
      setProgress(value);
      if (value < 100) raf = requestAnimationFrame(update);
      else setBoot(false);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    if (!transitioning.current) {
      window.scrollTo(0, 0);
      lenis.current?.scrollTo(0, { immediate: true });
    }
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);
    const main = document.querySelector<HTMLElement>("#main");
    main?.focus({ preventScroll: true });
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Cursor />
      <main id="main" tabIndex={-1} key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<Article />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
      <div ref={curtain} className="route-curtain paper" aria-hidden="true">
        <span>
          GOOD THINGS
          <br />
          GO ROUND.
        </span>
        <DiscFace edition={editions[1]} />
      </div>
      <div
        className={`boot-screen ${boot ? "" : "is-done"}`}
        aria-hidden="true"
      >
        <div className="boot-disc">
          <DiscFace edition={editions[0]} />
        </div>
        <span className="boot-brand">RUTHLESS</span>
        <span className="boot-progress">
          LOADING THE GOOD STUFF. {progress}%
        </span>
      </div>
    </>
  );
}
