import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Disc3,
  Heart,
  Play,
} from "lucide-react";
import { editions, photos } from "../data";
import Disc3D from "../components/DiscScene";
import { DiscFace } from "../components/DiscFace";
import { Brand, OrbitButton, SectionLabel, Sticker } from "../components/Shell";
import {
  gsap,
  MotionScope,
  reducedMotion,
  ScrollTrigger,
  SplitText,
} from "../motion";
import { sound } from "../audio";

function Hero() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-title .letter", {
        yPercent: 145,
        rotate: 18,
        duration: 1.1,
        stagger: { each: 0.035, from: "random" },
        ease: "power4.out",
        delay: 0.55,
      });
      gsap.from(".hero-disc", {
        yPercent: 75,
        rotate: -60,
        scale: 0.5,
        duration: 1.6,
        ease: "elastic.out(1,.65)",
        delay: 0.7,
      });
      gsap.to(".hero-disc", {
        y: () => (window.innerWidth < 744 ? 300 : 640),
        rotate: 85,
        scale: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom 75%",
          scrub: 0.8,
        },
      });
      gsap.fromTo(
        ".memory-sleeve",
        { yPercent: 32, rotate: 14 },
        {
          yPercent: -20,
          rotate: -9,
          ease: "none",
          scrollTrigger: {
            trigger: ".memory-intro",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="hero-section">
      <div className="hero-poster paper curve">
        <div className="hero-lead">
          <span>WE’RE HERE TO</span>
          <Brand />
          <span>KEEP IT REAL.</span>
        </div>
        <SplitText as="h1" className="hero-title">
          {"MAKE IT\nLAST."}
        </SplitText>
        <span className="hero-side-note">
          LESS CLOUD.
          <br />
          MORE FEELING.
        </span>
        <Link to="/products" className="hero-discover">
          MEET YOUR NEXT MEMORY <ArrowDown size={17} />
        </Link>
        <span className="scribble hero-scribble">
          some things deserve
          <br />a permanent place. ↙
        </span>
        <span className="hero-format">CD / DVD / GOOD TIMES</span>
      </div>
      <div className="hero-disc">
        <Disc3D edition={editions[0]} />
        <span className="disc-glint" aria-hidden="true">
          ✦
        </span>
      </div>
      <div className="memory-intro paper">
        <div className="photo-print intro-photo-one" data-parallax="13">
          <img
            src={photos.listener}
            alt="A listener lost in her favourite music"
            width="1280"
            height="1029"
          />
          <span>THAT SONG. THAT FEELING.</span>
        </div>
        <div className="memory-sleeve">
          <span className="sleeve-rim" />
          <span className="sleeve-brand">RUTHLESS</span>
          <p>
            THE NIGHTS.
            <br />
            THE PEOPLE.
            <br />
            THE SONGS
            <br />
            THAT TAKE
            <br />
            YOU BACK.
          </p>
          <span className="sleeve-bottom">
            NOT EVERYTHING SHOULD DISAPPEAR.
          </span>
          <Disc3 size={45} />
        </div>
        <div className="sticky-note">
          <Heart size={24} />
          <p>Things to keep:</p>
          <span>the first mix</span>
          <span>the last dance</span>
          <span>every little thing</span>
          <span className="scribble">not another forgotten folder.</span>
        </div>
        <div className="photo-print intro-photo-two" data-parallax="-12">
          <img
            src={photos.crowd}
            alt="A crowd sharing a night of live music"
            width="1024"
            height="683"
            loading="lazy"
          />
          <span>WISH YOU WERE HERE.</span>
        </div>
        <p className="intro-line" data-reveal>
          We make room for the moments.
          <br />
          <strong>You make them worth keeping.</strong>
        </p>
        <div className="intro-archive" data-reveal>
          <img
            src={photos.archive}
            alt="An archival photo of a compact disc in its original jewel case"
            width="1280"
            height="960"
            loading="lazy"
          />
          <span className="scribble">
            remember when
            <br />
            music was a thing?
          </span>
        </div>
      </div>
    </section>
  );
}

function WaveBand() {
  return (
    <div className="wave-band" aria-label="Good things go round. Make it last.">
      <div className="wave-track">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i}>
            GOOD THINGS GO ROUND <span className="band-star">✳</span> MAKE IT
            LAST <span className="band-star">✳</span>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CollectionSlider() {
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLElement>(null);
  const busy = useRef(false);
  const edition = editions[index];
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collection-center",
        { rotation: -45, scale: 0.65, xPercent: 25, opacity: 0 },
        {
          rotation: -9,
          scale: 1,
          xPercent: 0,
          opacity: 1,
          duration: 0.95,
          ease: "back.out(1.8)",
        },
      );
      gsap.fromTo(
        ".collection-photo",
        { scale: 0.75, y: 80, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".collection-word .letter",
        { yPercent: 100, rotate: 12 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.7,
          stagger: 0.025,
          ease: "power4.out",
        },
      );
      gsap.fromTo(
        ".collection-copy > *",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.65 },
      );
    }, root);
    return () => ctx.revert();
  }, [index]);
  const change = (next: number) => {
    next = (next + editions.length) % editions.length;
    if (next === index || busy.current) return;
    sound("select");
    if (reducedMotion()) {
      setIndex(next);
      return;
    }
    const wash = root.current?.querySelector(".collection-wash");
    if (!wash) {
      setIndex(next);
      return;
    }
    busy.current = true;
    gsap.set(wash, { backgroundColor: editions[next].color, yPercent: -120 });
    gsap
      .timeline({
        onComplete: () => {
          busy.current = false;
        },
      })
      .to(".collection-center", {
        scale: 0.65,
        rotate: 55,
        opacity: 0,
        duration: 0.25,
      })
      .to(wash, { yPercent: 0, duration: 0.55, ease: "power3.inOut" }, 0)
      .call(() => setIndex(next), [], 0.32)
      .set(wash, { yPercent: -120 }, 0.66);
  };
  return (
    <section
      ref={root}
      className="collection-section paper curve"
      style={
        {
          "--section": edition.color,
          "--section-ink": edition.ink,
          "--section-accent": edition.accent,
        } as CSSProperties
      }
      aria-label="Explore the disc collection"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") change(index + 1);
        if (e.key === "ArrowLeft") change(index - 1);
      }}
    >
      <div className="collection-wash" aria-hidden="true" />
      <div className="collection-heading">
        <SectionLabel>MEET YOUR NEXT MEMORY</SectionLabel>
      </div>
      <div className="collection-title">
        <span className="collection-the">THE</span>
        <SplitText className="collection-word">
          {edition.word.replace("THE ", "")}
        </SplitText>
      </div>
      <div className="collection-photo photo-left">
        <img
          src={edition.photo}
          alt={`The feeling behind ${edition.name}`}
          width="1280"
          height="1029"
          loading="lazy"
        />
        <span className="photo-corner" />
        <span className="photo-caption">{edition.tags[0]}</span>
      </div>
      <div className="collection-photo photo-right">
        <img
          src={index % 2 ? photos.crowd : photos.disc}
          alt={
            index % 2
              ? "A night to remember"
              : "The iridescent recording surface of a compact disc"
          }
          width="1280"
          height="1280"
          loading="lazy"
        />
        <span className="photo-corner" />
      </div>
      <div className="collection-center">
        <DiscFace edition={edition} />
      </div>
      <OrbitButton
        to={`/products/${edition.id}`}
        className="collection-explore"
      />
      <div className="collection-copy">
        <div className="collection-tags">
          {edition.tags.map((tag) => (
            <Sticker key={tag}>{tag}</Sticker>
          ))}
        </div>
        <p>{edition.intro}</p>
        <span>
          {edition.type} · {edition.capacity}
        </span>
      </div>
      <div className="disc-rail" role="group" aria-label="Choose a disc">
        {editions.map((item, i) => {
          let distance = (i - index + 6) % 6;
          if (distance > 3) distance -= 6;
          return (
            <button
              className={`rail-disc ${index === i ? "is-active" : ""}`}
              aria-label={item.name}
              aria-pressed={index === i}
              onClick={() => change(i)}
              key={item.id}
              style={
                {
                  "--rail-y": `${distance * 83}px`,
                  "--rail-x": `${Math.abs(distance) ** 1.4 * 25}px`,
                } as CSSProperties
              }
            >
              <DiscFace edition={item} />
            </button>
          );
        })}
        <span className="scribble">pick a feeling ↙</span>
      </div>
      <div className="slider-controls">
        <button aria-label="Previous disc" onClick={() => change(index - 1)}>
          <ArrowLeft />
        </button>
        <span aria-live="polite">{edition.name}</span>
        <button aria-label="Next disc" onClick={() => change(index + 1)}>
          <ArrowRight />
        </button>
      </div>
      <h2 className="sr-only" aria-live="polite">
        {edition.word}: {edition.name}
      </h2>
    </section>
  );
}

function GiantJourney() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const horizontal = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.max(innerWidth * 3, 2600)}`,
          pin: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.utils
        .toArray<HTMLElement>(".journey-disc")
        .forEach((el, i) =>
          gsap.to(el, {
            rotate: i % 2 ? -210 : 250,
            y: i % 2 ? 70 : -90,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: horizontal,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }),
        );
      gsap.utils
        .toArray<HTMLElement>(".journey-photo")
        .forEach((el) =>
          gsap.fromTo(
            el,
            { rotate: -9, y: 90 },
            {
              rotate: 8,
              y: -60,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          ),
        );
    }, root);
    return () => ctx.revert();
  }, []);
  const panels = [
    {
      word: "TO FEEL.",
      note: "for the songs that\nknow you by heart.",
      photo: photos.listener,
      edition: editions[1],
      second: editions[0],
    },
    {
      word: "TO MAKE.",
      note: "your weird little idea\nmight be the good one.",
      photo: photos.crowd,
      edition: editions[3],
      second: editions[2],
    },
    {
      word: "TO KEEP.",
      note: "some moments aren’t\nmeant to be temporary.",
      photo: photos.disc,
      edition: editions[5],
      second: editions[4],
    },
  ];
  return (
    <section
      ref={root}
      className="giant-journey paper"
      aria-label="Made for feelings, creation, and memories"
    >
      <div ref={track} className="journey-track">
        <div className="journey-opening">
          <SectionLabel>WHY WE EXIST</SectionLabel>
          <h2>
            FOR THE MOMENTS.
            <br />
            NOT THE ALGORITHM.
          </h2>
          <span className="journey-arrow">
            <ArrowRight strokeWidth={1} />
          </span>
          <p className="scribble">keep going. there’s a feeling for that.</p>
        </div>
        {panels.map((panel, i) => (
          <div className={`journey-panel journey-panel-${i}`} key={panel.word}>
            <h2>{panel.word}</h2>
            <div className="journey-photo">
              <img
                src={panel.photo}
                alt={
                  i === 0
                    ? "Music that makes you feel everything"
                    : i === 1
                      ? "People making memories together"
                      : "A physical place to keep a digital memory"
                }
                width="1280"
                height="1029"
                loading="lazy"
              />
              <span className="photo-corner" />
            </div>
            <Link
              className="journey-disc journey-disc-one"
              to={`/products/${panel.edition.id}`}
              aria-label={`Explore ${panel.edition.name}`}
            >
              <DiscFace edition={panel.edition} />
            </Link>
            <Link
              className="journey-disc journey-disc-two"
              to={`/products/${panel.second.id}`}
              aria-label={`Explore ${panel.second.name}`}
            >
              <DiscFace edition={panel.second} />
            </Link>
            <p className="scribble journey-note">{panel.note}</p>
            <span className="journey-doodle">↗</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="closing-section paper">
      <div className="closing-art" data-reveal>
        <div className="closing-sleeve">
          <Brand />
          <span>FEEL EVERYTHING.</span>
          <Heart size={45} />
        </div>
        <div className="closing-disc">
          <DiscFace edition={editions[0]} />
        </div>
        <div className="closing-disc-two">
          <DiscFace edition={editions[5]} />
        </div>
        <span className="scribble">
          a little piece
          <br />
          of forever. ↗
        </span>
      </div>
      <Link to="/products" className="closing-link" data-reveal>
        <h2>
          MAKE A<br />
          MEMORY.
        </h2>
        <span>
          FIND YOUR DISC <ArrowUpRight size={24} />
        </span>
        <span className="closing-play">
          <Play fill="currentColor" size={25} />
        </span>
      </Link>
    </section>
  );
}

export default function Home() {
  useLayoutEffect(() => {
    document.title = "RUTHLESS — Make It Last.";
    const timer = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <MotionScope>
      <Hero />
      <WaveBand />
      <CollectionSlider />
      <GiantJourney />
      <Closing />
    </MotionScope>
  );
}
