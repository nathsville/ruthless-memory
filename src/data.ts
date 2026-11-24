export type Edition = {
  id: string;
  name: string;
  word: string;
  type: string;
  capacity: string;
  color: string;
  ink: string;
  accent: string;
  tags: string[];
  intro: string;
  description: string;
  moment: string;
  photo: string;
};

export const photos = {
  crowd: "/images/music-concert-crowd.webp",
  listener: "/images/girl-in-headphones-cropped.jpg",
  archive: "/images/compact-disc-album.jpg",
  disc: "/images/disc-surface.webp",
};

// Demo destinations. Confirm these before publishing the concept.
export const site = {
  email: "hello@ruthless.studio",
  instagram: "https://www.instagram.com/",
};

export const editions: Edition[] = [
  {
    id: "after-hours",
    name: "AFTER HOURS",
    word: "THE NIGHT OWL",
    type: "CD-R",
    capacity: "700 MB / 80 MIN",
    color: "#ff20a6",
    ink: "#270018",
    accent: "#f8f29b",
    tags: ["LATE NIGHTS", "LOUD MIXES", "NO SKIPS"],
    intro: "For the night you wish had an encore.",
    description:
      "The last track. The first train home. The playlist nobody wanted to end. Put the whole feeling on a disc and turn it up again.",
    moment: "THE NIGHT ENDS. THE MIX DOESN’T.",
    photo: photos.crowd,
  },
  {
    id: "love-letter",
    name: "LOVE LETTER",
    word: "THE ROMANTIC",
    type: "CD-R",
    capacity: "700 MB / 80 MIN",
    color: "#ffadc9",
    ink: "#6d123d",
    accent: "#f9efdf",
    tags: ["MIXTAPES", "FOR SOMEONE", "FEEL EVERYTHING"],
    intro: "Some things sound better than a text.",
    description:
      "A track for the first hello. Another for the long way home. Make something they can hold, scribble on, and keep in a drawer forever.",
    moment: "SAY IT WITH A TRACKLIST.",
    photo: photos.listener,
  },
  {
    id: "no-signal",
    name: "NO SIGNAL",
    word: "THE ESCAPIST",
    type: "DVD-R",
    capacity: "4.7 GB / 120 MIN",
    color: "#b8a4f9",
    ink: "#322357",
    accent: "#efff99",
    tags: ["HOME MOVIES", "OFF THE GRID", "STAY PRESENT"],
    intro: "Your best moments don’t need Wi-Fi.",
    description:
      "The shaky home movie. The road-trip edit. The clip that still makes you laugh. A little offline space for a very real life.",
    moment: "LESS SCROLLING. MORE LIVING.",
    photo: photos.crowd,
  },
  {
    id: "daydream",
    name: "DAYDREAM",
    word: "THE CREATOR",
    type: "CD-RW",
    capacity: "700 MB / REWRITABLE",
    color: "#d8ef8a",
    ink: "#36421a",
    accent: "#ff85c6",
    tags: ["ROUGH CUTS", "FIRST DEMOS", "TRY AGAIN"],
    intro: "A blank canvas. With a little more spin.",
    description:
      "For the demo before the demo. The unfinished masterpiece. Write it, rethink it, and make room for whatever comes next.",
    moment: "MAKE SOMETHING. MAKE IT AGAIN.",
    photo: photos.listener,
  },
  {
    id: "replay",
    name: "REPLAY",
    word: "THE COLLECTOR",
    type: "MINI CD-R",
    capacity: "210 MB / 24 MIN",
    color: "#ff6c46",
    ink: "#5a1f13",
    accent: "#ffd9f0",
    tags: ["POCKET MIXES", "SMALL GIFTS", "BIG FEELINGS"],
    intro: "Little disc. Absolutely no small feelings.",
    description:
      "A handful of favourites, a pocket-size photo album, a tiny surprise. Not everything needs to be an epic. Sometimes one perfect moment is enough.",
    moment: "SMALL ENOUGH TO TAKE EVERYWHERE.",
    photo: photos.archive,
  },
  {
    id: "forever",
    name: "FOREVER",
    word: "THE KEEPER",
    type: "DVD+R",
    capacity: "4.7 GB / WRITE ONCE",
    color: "#9ee2df",
    ink: "#133c43",
    accent: "#ffb6d9",
    tags: ["PHOTO ALBUMS", "FAMILY FILMS", "YOURS TO KEEP"],
    intro: "For the things you don’t want to lose.",
    description:
      "Birthdays. First steps. People being wonderfully themselves. Keep another copy of the things a cloud folder could never explain.",
    moment: "NOT JUST FILES. YOUR WHOLE WORLD.",
    photo: photos.listener,
  },
];

export const stories = [
  {
    slug: "a-little-disc-a-lot-of-feeling",
    category: "STORIES",
    title: "A little disc. A lot of feeling.",
    date: "17 NOV 2026",
    day: "17",
    month: "NOV 2026",
    image: photos.listener,
    intro: "A playlist is a link. A mixtape is a little piece of you.",
    paragraphs: [
      "We wanted to bring back the feeling of making something for someone. Not forwarding it. Not adding it to a shared folder. Making it, choosing every track, writing a name on the front, and handing it over.",
      "RUTHLESS is our love letter to that ritual. Six editions of physical CD and DVD media, each with a different personality and one very simple purpose: a place for the things you want to keep.",
      "Make a mix. Collect a summer. Burn the first version of something brilliant. It doesn’t have to be perfect. It just has to mean something.",
    ],
  },
  {
    slug: "the-art-of-a-really-good-mixtape",
    category: "CULTURE",
    title: "The art of a really good mixtape.",
    date: "10 NOV 2026",
    day: "10",
    month: "NOV 2026",
    image: photos.crowd,
    intro: "Start with a feeling. Finish with something worth replaying.",
    paragraphs: [
      "The best mixes have a beginning, a middle, and a reason to press play again. Start with the song that puts you right back there. Then let the next one take you somewhere else.",
      "Eighty minutes is a beautiful constraint. You have to choose. The unexpected track, the one they showed you, the one you were too embarrassed to admit you loved. Leave a little room for a surprise.",
      "Give it a name. Write the tracklist. Make the cover yourself. Use music you have the right to copy, check that your player supports the format, and give somebody a good reason to keep a disc player around.",
    ],
  },
];

export const links = [
  { to: "/about", label: "ABOUT" },
  { to: "/products", label: "THE COLLECTION" },
  { to: "/news", label: "ON REPEAT" },
  { to: "/contact", label: "SAY HELLO" },
];
