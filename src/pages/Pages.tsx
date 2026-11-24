import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Disc3,
  Heart,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { editions, photos, stories, site } from "../data";
import Disc3D from "../components/DiscScene";
import { DiscFace } from "../components/DiscFace";
import { Brand, OrbitButton, SectionLabel, Sticker } from "../components/Shell";
import { gsap, MotionScope, reducedMotion, SplitText } from "../motion";
import { Closing } from "./Home";
import { sound } from "../audio";

export function About() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    document.title = "Our Story — RUTHLESS";
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(".conveyor-row:nth-child(odd)", {
        xPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-conveyor",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".conveyor-row:nth-child(even)", {
        xPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-conveyor",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.fromTo(
        ".about-disc",
        { rotate: -35, y: 180 },
        {
          rotate: 70,
          y: -60,
          scrollTrigger: {
            trigger: ".about-belief",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      gsap.to(".wanted-track", {
        xPercent: -49,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-wanted",
          start: "top top",
          end: "+=160%",
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root}>
      <MotionScope>
        <section className="about-hero paper curve">
          <SplitText as="h1" className="inner-title">
            {"MADE OF\nMOMENTS."}
          </SplitText>
          <p className="about-subtitle">A SMALL DISC. A BIG FEELING.</p>
          <div className="about-photo photo-print">
            <img
              src={photos.listener}
              width="1280"
              height="1029"
              alt="A moment completely lost in music"
            />
            <span>THE GOOD KIND OF LOST.</span>
          </div>
          <div className="about-hero-disc">
            <DiscFace edition={editions[0]} />
          </div>
          <p className="scribble">
            for the things
            <br />
            you can’t put into words.
          </p>
        </section>
        <section
          className="about-conveyor paper"
          aria-label="More than just another file"
        >
          {[
            "ANOTHER LINK. ANOTHER LOST FOLDER.",
            "SOME THINGS DESERVE TO BE HELD.",
            "LESS CLOUD. MORE CONNECTION.",
          ].map((line, i) => (
            <div className="conveyor-row" key={line}>
              {[0, 1, 2].map((n) => (
                <div className="conveyor-item" key={n}>
                  <span>{line}</span>
                  <DiscFace edition={editions[(i + n) % editions.length]} />
                  <img
                    src={i % 2 ? photos.listener : photos.crowd}
                    width="350"
                    height="180"
                    alt="Music, people, and the moments in between"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </section>
        <section className="about-belief paper">
          <SectionLabel>OUR REASON TO EXIST</SectionLabel>
          <SplitText as="h2">{"FEEL IT.\nKEEP IT."}</SplitText>
          <p>
            We believe your memories deserve more than an expired link. A disc
            is a little ritual: choose what matters, make it yours, and keep it
            close.
          </p>
          <div className="about-disc">
            <DiscFace edition={editions[1]} />
          </div>
          <span className="scribble">no login required. ↗</span>
        </section>
        <section className="manifesto-section paper">
          <div className="manifesto-sheet" data-reveal>
            <SectionLabel>A NOTE FROM RUTHLESS</SectionLabel>
            <h2>
              NOT EVERYTHING
              <br />
              IS DISPOSABLE.
            </h2>
            <p>
              The mix you made for someone. The film you shot with your friends.
              The first version of an idea you couldn’t stop thinking about.
            </p>
            <p>
              We’re here for the things that mean something. Physical discs with
              a little personality. Made to be written on, passed around, and
              played again.
            </p>
            <Brand />
            <span className="scribble">keep the good stuff.</span>
          </div>
          <div className="manifesto-silver" data-parallax="15">
            <DiscFace edition={editions[0]} silver />
          </div>
        </section>
        <section className="about-wanted paper">
          <div className="wanted-track">
            <h2>LESS DISPOSABLE. MORE HUMAN.</h2>
            {[
              { label: "FEEL MORE", Icon: Heart },
              { label: "MAKE MORE", Icon: Sparkles },
              { label: "PLAY AGAIN", Icon: RefreshCw },
              { label: "KEEP CLOSE", Icon: Disc3 },
            ].map(({ label, Icon }, i) => (
              <div className={`wanted-badge wanted-badge-${i}`} key={label}>
                <Icon size={55} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="scribble">
            the world doesn’t need more files.
            <br />
            it needs more things that mean something.
          </p>
        </section>
        <Closing />
      </MotionScope>
    </div>
  );
}

export function Products() {
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    document.title = "The Collection — RUTHLESS";
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pick-card",
        { y: 170, scale: 0.3, rotate: -55 },
        {
          y: 0,
          scale: 1,
          rotate: (i: number) => [-10, -5, 2, -3, 6, 12][i],
          duration: 1.15,
          stagger: 0.08,
          ease: "back.out(1.5)",
          delay: 0.2,
          clearProps: "transform",
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  const active = hover === null ? editions[0] : editions[hover];
  return (
    <section
      ref={ref}
      className="pick-player paper curve"
      style={
        {
          "--section": active.color,
          "--section-ink": active.ink,
        } as CSSProperties
      }
    >
      <SectionLabel>THE COLLECTION</SectionLabel>
      <SplitText as="h1" className="pick-title">
        {"PICK YOUR\nFEELING."}
      </SplitText>
      <div className="pick-fan" onMouseLeave={() => setHover(null)}>
        {editions.map((edition, i) => (
          <Link
            key={edition.id}
            to={`/products/${edition.id}`}
            aria-label={`Explore ${edition.name}`}
            className={`pick-card ${hover === i ? "is-active" : ""}`}
            onMouseEnter={() => {
              if (matchMedia("(hover:hover)").matches) {
                setHover(i);
                sound("select");
              }
            }}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            style={
              {
                "--card-rotate": `${[-10, -5, 2, -3, 6, 12][i]}deg`,
                "--neighbor":
                  hover !== null && hover !== i
                    ? `${30 / (i - hover)}px`
                    : "0px",
              } as CSSProperties
            }
          >
            <DiscFace edition={edition} />
            <span className="pick-caption">
              {edition.name}
              <ArrowUpRight size={18} />
            </span>
          </Link>
        ))}
      </div>
      <p className="pick-description">
        Six personalities. One very personal collection.
      </p>
      <span className="scribble pick-note">pick it up. make it yours. ↗</span>
    </section>
  );
}

function ProductReel({ index }: { index: number }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          start: "top top",
          end: "+=200%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="product-reel">
      <div ref={track} className="reel-track">
        <div className="reel-intro">
          <SectionLabel>OUT IN THE REAL WORLD</SectionLabel>
          <h2>
            THIS IS
            <br />
            WHAT IT’S
            <br />
            ALL ABOUT.
          </h2>
          <ArrowRight size={100} />
        </div>
        {[editions[index].photo, photos.crowd, photos.listener].map(
          (photo, i) => (
            <div className="reel-photo" key={i}>
              <img
                src={photo}
                width="1280"
                height="1029"
                alt={
                  [
                    "A feeling worth keeping",
                    "A night with your people",
                    "Your favourite song, one more time",
                  ][i]
                }
                loading="lazy"
              />
              <span className="photo-corner" />
              <DiscFace edition={editions[(index + i) % editions.length]} />
              <span className="scribble">
                {
                  [
                    "press play. feel something.",
                    "you had to be there.",
                    "and then, one more time.",
                  ][i]
                }
              </span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export function ProductDetail() {
  const { id } = useParams();
  const index = editions.findIndex((edition) => edition.id === id);
  const edition = editions[index];
  const [finish, setFinish] = useState("PRINTED");
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (edition) document.title = `${edition.name} ${edition.type} — RUTHLESS`;
  }, [edition]);
  useLayoutEffect(() => {
    if (!edition || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".product-main-disc", {
        y: 150,
        scale: 0.65,
        rotate: -35,
        duration: 1.25,
        ease: "back.out(1.5)",
        delay: 0.2,
      });
      if (innerWidth >= 744)
        gsap.to(".power-stack", {
          y: () =>
            -document.querySelector<HTMLElement>(".power-card")!.offsetHeight *
            2,
          ease: "none",
          scrollTrigger: {
            trigger: ".super-powers",
            start: "top top",
            pin: true,
            end: "+=160%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
    }, root);
    return () => ctx.revert();
  }, [edition]);
  if (!edition) return <NotFound />;
  const next = editions[(index + 1) % editions.length];
  const powers = [
    {
      title: "ALL YOURS.",
      text: "A physical home for the files, music, and moments you choose.",
      Icon: Heart,
    },
    {
      title: "NO LOGINS.",
      text: "No subscriptions. No expired links. Just you and a compatible disc player.",
      Icon: ShieldCheck,
    },
    {
      title: "MAKE IT YOU.",
      text: "Write the title. Design the sleeve. Leave a little piece of yourself.",
      Icon: Sparkles,
    },
  ];
  return (
    <div
      ref={root}
      className="product-page"
      style={
        {
          "--section": edition.color,
          "--section-ink": edition.ink,
          "--section-accent": edition.accent,
        } as CSSProperties
      }
    >
      <MotionScope>
        <section className="product-intro paper curve">
          <Link to="/products" className="product-back">
            <ArrowLeft size={15} /> THE COLLECTION
          </Link>
          <div className="product-giant-word">
            <span>THE</span>
            <h1>{edition.word.replace("THE ", "")}</h1>
          </div>
          <div className="product-main-disc">
            <Disc3D edition={edition} />
          </div>
          <div className="product-specs">
            <span>{edition.name}</span>
            <span>
              {edition.type} · {edition.capacity}
            </span>
          </div>
        </section>
        <section className="product-info paper">
          <div className="product-info-photo photo-print" data-reveal>
            <img
              src={edition.photo}
              width="1280"
              height="1029"
              alt={`The world of ${edition.name}`}
              loading="lazy"
            />
            <span>
              {edition.tags[0]} / {edition.tags[1]}
            </span>
          </div>
          <div className="product-info-copy" data-reveal>
            <SectionLabel>MEET {edition.name}</SectionLabel>
            <h2>{edition.intro}</h2>
            <p>{edition.description}</p>
            <div className="product-tags">
              {edition.tags.map((tag) => (
                <Sticker key={tag}>{tag}</Sticker>
              ))}
            </div>
            <Link to="/contact" className="text-link">
              LET’S MAKE IT YOURS <ArrowUpRight />
            </Link>
          </div>
        </section>
        <section className="disc-variants paper">
          <div className="variant-preview">
            <DiscFace edition={edition} silver={finish === "SILVER"} />
            {finish === "SLEEVE" && (
              <div className="variant-sleeve">
                <Brand />
                <span>{edition.name}</span>
              </div>
            )}
          </div>
          <div className="variant-copy">
            <SectionLabel>ONE DISC. YOUR WAY.</SectionLabel>
            <h2>
              MAKE IT
              <br />
              PERSONAL.
            </h2>
            <p>
              A little personality on the outside.
              <br />A whole world on the inside.
            </p>
            <div
              className="variant-buttons"
              role="group"
              aria-label="Preview disc finish"
            >
              {["PRINTED", "SILVER", "SLEEVE"].map((value) => (
                <button
                  key={value}
                  aria-pressed={finish === value}
                  onClick={() => {
                    setFinish(value);
                    sound("select");
                  }}
                >
                  {value}
                  {finish === value && <Check size={15} />}
                </button>
              ))}
            </div>
            <span className="scribble">try a different side of you. ↖</span>
          </div>
        </section>
        <section className="super-powers">
          <span className="power-super">SUPER</span>
          <div className="power-window">
            <div className="power-stack">
              {powers.map(({ title, text, Icon }) => (
                <div className="power-card" key={title}>
                  <Icon size={60} />
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <span className="power-powers">POWERS</span>
        </section>
        <section className="product-moment paper">
          <p>BUILT FOR THE MOMENTS. NOT THE ALGORITHM.</p>
          <h2 data-reveal>{edition.moment}</h2>
          <DiscFace edition={edition} />
        </section>
        <ProductReel index={index} />
        <Link
          to={`/products/${next.id}`}
          className="next-up"
          aria-label={`Next up: ${next.name}`}
          onMouseEnter={() => sound("select")}
        >
          <span>NEXT UP</span>
          <h2>
            {next.name}
            <ArrowUpRight />
          </h2>
          <DiscFace edition={next} />
        </Link>
      </MotionScope>
    </div>
  );
}

function StoryCard({ story }: { story: (typeof stories)[number] }) {
  return (
    <Link to={`/news/${story.slug}`} className="story-card">
      <span className="story-category">{story.category}</span>
      <h2>{story.title}</h2>
      <span className="story-arrow">
        <ArrowUpRight size={20} />
      </span>
      <img
        src={story.image}
        alt={
          story.slug.includes("mixtape")
            ? "A crowd gathered for live music"
            : "Getting lost in a favourite song"
        }
        width="600"
        height="600"
        loading="lazy"
      />
      <time>
        <strong>{story.day}</strong>
        <span>{story.month}</span>
      </time>
    </Link>
  );
}

export function News() {
  const [filter, setFilter] = useState("ALL");
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.title = "On Repeat — RUTHLESS";
  }, []);
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(
      () =>
        gsap.from(".story-card", {
          y: 60,
          rotate: -5,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
        }),
      grid,
    );
    return () => ctx.revert();
  }, [filter]);
  return (
    <MotionScope>
      <section className="news-hero paper curve">
        <SectionLabel>FROM OUR WORLD</SectionLabel>
        <SplitText as="h1" className="inner-title">
          {"ON\nREPEAT."}
        </SplitText>
        <span className="scribble">good stories. better soundtracks.</span>
      </section>
      <section className="news-content">
        <Link to={`/news/${stories[0].slug}`} className="top-story" data-reveal>
          <img
            src={stories[0].image}
            alt="The feeling behind a carefully chosen song"
            width="1280"
            height="1029"
          />
          <div>
            <SectionLabel>THE LATEST</SectionLabel>
            <h2>{stories[0].title}</h2>
            <p>{stories[0].intro}</p>
            <time>{stories[0].date}</time>
            <ArrowUpRight size={38} />
          </div>
        </Link>
        <div className="news-index">
          <div
            className="news-filters"
            role="group"
            aria-label="Filter stories"
          >
            {["ALL", "STORIES", "CULTURE"].map((category) => (
              <button
                aria-pressed={filter === category}
                onClick={() => {
                  setFilter(category);
                  sound("click");
                }}
                key={category}
              >
                {category}
                <sup>{category === "ALL" ? "02" : "01"}</sup>
              </button>
            ))}
          </div>
          <div ref={grid} className="story-grid" aria-live="polite">
            {stories
              .filter((story) => filter === "ALL" || story.category === filter)
              .map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
          </div>
        </div>
      </section>
    </MotionScope>
  );
}

export function Article() {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (story) document.title = `${story.title} — RUTHLESS`;
  }, [story]);
  if (!story) return <NotFound />;
  const share = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
      window.prompt("Copy this story link:", location.href);
    }
  };
  return (
    <MotionScope>
      <article className="news-article paper">
        <header className="article-header">
          <div>
            <SectionLabel>{story.category}</SectionLabel>
            <SplitText as="h1">{story.title.toUpperCase()}</SplitText>
            <time>
              <strong>{story.day}</strong>
              <span>{story.month}</span>
            </time>
          </div>
          <div className="article-image">
            <img
              src={story.image}
              width="1280"
              height="1029"
              alt={
                story.slug.includes("mixtape")
                  ? "People sharing a live music experience"
                  : "A listener feeling every note"
              }
            />
            <span className="photo-corner" />
          </div>
        </header>
        <div className="article-paper">
          <div className="article-copy">
            <h2>{story.intro}</h2>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside>
            <span>PASS IT ON</span>
            <div className="share-buttons">
              <a
                href={`mailto:?subject=${encodeURIComponent(story.title)}&body=${encodeURIComponent(location.href)}`}
                aria-label="Share by email"
              >
                <Mail />
              </a>
              <button onClick={share} aria-label="Copy story link">
                {copied ? <Check /> : <Copy />}
              </button>
            </div>
            <span className="share-status" role="status">
              {copied ? "LINK COPIED!" : "GOOD STORIES ARE FOR SHARING."}
            </span>
            <Link to="/news" className="text-link">
              <ArrowLeft /> BACK TO ALL
            </Link>
          </aside>
        </div>
      </article>
      <section className="related-news">
        <h2>
          MORE GOOD
          <br />
          THINGS.
        </h2>
        {stories
          .filter((item) => item.slug !== slug)
          .map((item) => (
            <StoryCard key={item.slug} story={item} />
          ))}
      </section>
    </MotionScope>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "prepared">("idle");
  useEffect(() => {
    document.title = "Say Hello — RUTHLESS";
  }, []);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const body = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "—"}\nPhone: ${data.phone || "—"}\n\n${data.message}`;
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(`A little hello from ${data.name}`)}&body=${encodeURIComponent(body)}`;
    setStatus("prepared");
    sound("select");
  };
  return (
    <MotionScope>
      <section className="contact-section paper curve">
        <SectionLabel>GOOD THINGS START WITH HELLO</SectionLabel>
        <SplitText as="h1" className="inner-title">
          {"LET’S MAKE\nSOMETHING."}
        </SplitText>
        <div className="contact-layout">
          <form className="contact-paper" onSubmit={submit}>
            <h2>
              DROP US
              <br />A LITTLE NOTE.
            </h2>
            <div className="form-fields">
              <label>
                <span>NAME</span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="YOUR NAME"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                <span>COMPANY</span>
                <input
                  name="company"
                  autoComplete="organization"
                  placeholder="COMPANY (IF YOU HAVE ONE)"
                  maxLength={150}
                />
              </label>
              <label>
                <span>PHONE</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="PHONE (OPTIONAL)"
                  maxLength={40}
                />
              </label>
              <label>
                <span>EMAIL</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="YOUR EMAIL"
                  required
                  maxLength={150}
                />
              </label>
              <label className="message-field">
                <span>MESSAGE</span>
                <textarea
                  name="message"
                  placeholder="WHAT’S ON YOUR MIND?"
                  rows={5}
                  required
                  maxLength={3000}
                />
              </label>
            </div>
            <button type="submit" className="send-button">
              MAKE CONTACT <ArrowUpRight size={28} />
            </button>
            <p className="form-note" role="status">
              {status === "prepared"
                ? "YOUR EMAIL DRAFT IS READY. SEND IT FROM YOUR EMAIL APP."
                : "Opens your email app with your message. Nothing is sent automatically."}
            </p>
          </form>
          <div className="contact-note">
            <Heart size={27} />
            <span className="scribble">we’re all ears.</span>
            <a href={`mailto:${site.email}`}>
              {site.email.split("@")[0].toUpperCase()}@
              <br />
              {site.email.split("@")[1].toUpperCase()}
              <ArrowUpRight size={25} />
            </a>
            <p>
              Collabs. Custom artwork.
              <br />A really good song recommendation.
              <br />
              We’d love to hear it.
            </p>
            <DiscFace edition={editions[1]} />
          </div>
        </div>
      </section>
    </MotionScope>
  );
}

export function Credits() {
  useEffect(() => {
    document.title = "Image Credits — RUTHLESS";
  }, []);
  const images = [
    {
      image: photos.crowd,
      title: "Music Concert Crowd",
      author: "via rawpixel",
      url: "https://www.rawpixel.com/image/5970282/music-concert-crowd",
    },
    {
      image: photos.listener,
      title: "Girl in headphones (cropped)",
      author: "Bruce Mars",
      url: "https://commons.wikimedia.org/w/index.php?curid=79385330",
    },
    {
      image: photos.archive,
      title: "Compact disc album",
      author: "Taras",
      url: "https://commons.wikimedia.org/w/index.php?curid=116190144",
    },
    {
      image: photos.disc,
      title: "Audio Compact Disc",
      author: "liam",
      url: "https://commons.wikimedia.org/w/index.php?curid=142519248",
    },
  ];
  return (
    <section className="credits-page paper">
      <h1>
        GOOD IMAGES.
        <br />
        GOOD CREDIT.
      </h1>
      <p>
        These photographs show the world around RUTHLESS. They are not
        photographs of RUTHLESS products or customers. All four are supplied
        under CC0. Disc labels, sleeves, textures, and 3D artwork are original
        work created for this concept.
      </p>
      <div className="credits-list">
        {images.map((image) => (
          <div key={image.title}>
            <img src={image.image} width="400" height="300" alt={image.title} />
            <div>
              <h2>{image.title}</h2>
              <p>{image.author} · CC0</p>
              <a href={image.url} target="_blank" rel="noreferrer">
                SOURCE PHOTOGRAPH <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="credits-disclaimer">
        RUTHLESS is a design concept. Edition names, product specifications,
        stories, and the contact email are sample content and must be confirmed
        before a public launch.
      </p>
      <Link to="/" className="text-link">
        <ArrowLeft /> BACK TO THE GOOD STUFF
      </Link>
    </section>
  );
}

export function NotFound() {
  return (
    <section className="not-found paper">
      <DiscFace edition={editions[2]} />
      <SectionLabel>NO SIGNAL / 404</SectionLabel>
      <h1>WRONG TRACK.</h1>
      <p>
        This page isn’t in the collection.
        <br />
        Let’s get you back to something good.
      </p>
      <OrbitButton to="/">GO HOME</OrbitButton>
    </section>
  );
}
