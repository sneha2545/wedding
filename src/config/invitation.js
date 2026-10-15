// ─────────────────────────────────────────────────────────────────────────────
//  Centralised invitation configuration.
//  Edit this file to customise the invitation for each couple. All assets
//  referenced below should live in /public so the URLs stay valid when the
//  site is hosted under any path.
// ─────────────────────────────────────────────────────────────────────────────

export const invitation = {
  // Couple ────────────────────────────────────────────────────────────
  bride: {
    firstName: 'Aadhya',
    fullName: 'Aadhya Iyer',
  },
  groom: {
    firstName: 'Vihaan',
    fullName: 'Vihaan Rathore',
  },

  // Wedding date ─────────────────────────────────────────────────────
  // Date is used internally for validation. The hero only shows the
  // couple's names — date is shown in the ceremony section below.
  wedding: {
    dateISO: '2026-11-22', // YYYY-MM-DD (Sunday)
    day: 'Sunday',
    date: '22',
    month: 'November',
    year: '2026',
    city: 'Jaipur',
    country: 'India',
  },

  // Ceremony events (edit freely — keep `mainDateISO` matching wedding.dateISO
  // for internal consistency).
  events: [
    {
      key: 'haldi',
      title: 'Haldi',
      subtitle: 'The Golden Ceremony',
      mainDateISO: '2026-11-20',
      date: 'Friday, 20 November 2026',
      time: '4:00 PM onwards',
    },
    {
      key: 'mehendi',
      title: 'Mehendi',
      subtitle: 'A Garden of Henna',
      mainDateISO: '2026-11-21',
      date: 'Saturday, 21 November 2026',
      time: '11:00 AM onwards',
    },
    {
      key: 'wedding',
      title: 'Wedding Ceremony',
      subtitle: 'The Sacred Vows',
      mainDateISO: '2026-11-22',
      date: 'Sunday, 22 November 2026',
      time: '7:00 PM onwards',
    },
  ],

  // Message above the ceremony schedule (NOT shown on the opening hero).
  message: {
    opening: 'Together with our families',
    invitation: 'Joyfully invite you to celebrate their wedding',
    body: 'With the blessings of our elders and the love of our families, we invite you to celebrate the beginning of our beautiful journey together.',
  },

  // Venue ────────────────────────────────────────────────────────────
  venue: {
    name: 'The Royal Heritage Palace',
    address: 'Civil Lines, Jaipur, Rajasthan 302006, India',
    mapsQuery: 'Royal Heritage Palace, Civil Lines, Jaipur, Rajasthan',
    photo: 'venue.webp', // drop the file into /public
  },

  // Photographs ──────────────────────────────────────────────────────
  // Filenames resolve from /public. Missing assets fall back gracefully to
  // the inline SVG previews so the invitation never shows broken images.
  photos: {
    // MP4 video that contains the gate-opening sequence. Plays
    // automatically via <video autoPlay muted playsInline loop>.
    // Kept under 3 MB by converting from the supplied animated WebP.
    openingVideo: 'wedding-invitation.mp4',

    // Still image of the open-courtyard scene. Fades in at the reveal
    // moment so the final frame of the video is replaced with this
    // high-quality still and the scene is locked in place.
    openingStill: 'palace-open.webp',

    // Couple + gallery photographs (replace with real files when ready).
    hero: {
      src: 'couple-hero.webp',
      fallback: 'couple-hero.svg',
      alt: 'Aadhya and Vihaan — wedding portrait',
    },
    portrait: {
      src: 'couple-portrait.webp',
      fallback: 'couple-portrait.svg',
      alt: 'Aadhya and Vihaan — couple portrait',
    },
    memory1: {
      src: 'couple-photo-1.webp',
      fallback: 'couple-memory-1.svg',
      alt: 'A memory together',
    },
    memory2: {
      src: 'couple-photo-2.webp',
      fallback: 'couple-memory-2.svg',
      alt: 'A memory together',
    },
  },

  // Opening sequence timing ────────────────────────────────────────────
  // All values in seconds. Tune to match the supplied MP4 video.
  opening: {
    // When the shloka fades in after the page loads.
    shlokaDelaySeconds: 2.0,
    // How long the shloka stays visible before auto-fading out (2 sec total).
    shlokaDurationSeconds: 2.0,
    // How far into the video the gates have fully opened. When the
    // video's currentTime reaches this mark, names appear and the
    // scene freezes on the open-courtyard still.
    gateOpenSeconds: 5.0,
  },

  // Sanskrit shloka displayed on the first scroll section.
  shloka: {
    lines: [
      'वक्रतुण्ड महाकाय,',
      'सूर्य कोटि समप्रभ।',
      'निर्विघ्नं कुरु मे देव,',
      'सर्वकार्येषु सर्वदा॥',
    ],
  },

  // Welcome message on the second scroll section.
  welcomeMessage: 'Welcome to all at this beautiful wedding',

  // Small word between the names on the final section (e.g. "weds").
  finalPhrase: 'weds',

  // Credits ──────────────────────────────────────────────────────────
  credits: {
    company: 'Infirexa',
    url: 'https://infirexa.com',
  },
}

export default invitation