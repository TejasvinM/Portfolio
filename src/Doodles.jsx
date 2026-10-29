/* Hand-drawn sticker doodles (original SVGs). Thick ink outline + white sticker edge via CSS. */
const INK = "#141414";

export const Sparkle = ({ color = "#1f9d55" }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path d="M50 4 C55 38 62 45 96 50 C62 55 55 62 50 96 C45 62 38 55 4 50 C38 45 45 38 50 4Z"
      fill={color} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
  </svg>
);

export const Pencil = () => (
  <svg viewBox="0 0 120 120" width="100%" height="100%">
    <g transform="rotate(-40 60 60)" stroke={INK} strokeWidth="4" strokeLinejoin="round">
      <rect x="22" y="47" width="62" height="26" rx="3" fill="#f2672c" />
      <line x1="22" y1="60" x2="84" y2="60" stroke="#c94a17" strokeWidth="3" />
      <rect x="10" y="47" width="14" height="26" rx="4" fill="#f7a8c4" />
      <rect x="20" y="47" width="6" height="26" fill="#cfd3d8" />
      <path d="M84 47 L108 60 L84 73 Z" fill="#f6d7a7" />
      <path d="M100 56 L108 60 L100 64 Z" fill={INK} />
    </g>
  </svg>
);

export const Cursor = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path d="M12 8 L88 46 L54 56 L40 90 Z" fill="#f2552c" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
  </svg>
);

export const Coin = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <circle cx="50" cy="50" r="44" fill="#f5b800" stroke={INK} strokeWidth="4" />
    <circle cx="50" cy="50" r="34" fill="none" stroke={INK} strokeWidth="3" strokeDasharray="3 5" />
    <text x="50" y="66" textAnchor="middle" fontFamily="Figtree, sans-serif" fontWeight="900" fontSize="46" fill={INK}>₹</text>
  </svg>
);

export const Auto = () => (
  <svg viewBox="0 0 170 120" width="100%" height="100%">
    <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
      {/* black canopy */}
      <path d="M14 30 Q16 12 40 10 L112 10 Q128 12 132 30 Z" fill="#232323" />
      {/* yellow-green body tapering to the nose */}
      <path d="M12 30 L132 30 Q150 34 158 66 L160 84 L12 84 Z" fill="#f5c518" />
      <path d="M12 64 L156 64 L160 84 L12 84 Z" fill="#2f9e5a" />
      {/* open passenger side + windshield */}
      <path d="M22 36 L80 36 L80 62 L22 62 Z" fill="#fff6d0" />
      <path d="M96 36 L128 36 Q142 42 146 60 L96 60 Z" fill="#bfe3ff" />
      <line x1="88" y1="30" x2="88" y2="84" />
      <circle cx="112" cy="48" r="6" fill="#7a4a2a" />
      <path d="M158 56 l8 -2" />
      {/* big rear wheel, small front wheel */}
      <circle cx="44" cy="90" r="16" fill="#2b2b2b" />
      <circle cx="44" cy="90" r="6" fill="#cfd3d8" />
      <circle cx="140" cy="94" r="12" fill="#2b2b2b" />
      <circle cx="140" cy="94" r="4.5" fill="#cfd3d8" />
    </g>
  </svg>
);

export const Rider = ({ head }) => (
  <svg viewBox="0 -20 120 130" width="100%" height="100%" overflow="visible">
    <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
      <line x1="2" y1="58" x2="16" y2="58" />
      <line x1="6" y1="68" x2="18" y2="68" />
      {/* scooter */}
      <path d="M30 80 L80 80 L92 52" fill="none" />
      <path d="M86 46 L100 44" />
      <path d="M28 66 Q30 56 50 58 L72 60 L76 78 L30 80 Z" fill="#2f9e5a" />
      <circle cx="34" cy="88" r="12" fill="#fff" />
      <circle cx="34" cy="88" r="4" fill={INK} />
      <circle cx="94" cy="88" r="12" fill="#fff" />
      <circle cx="94" cy="88" r="4" fill={INK} />
      {/* rider */}
      <path d="M50 58 L56 34 Q60 26 70 30 L78 46 L88 48" fill="#f2552c" />
      <path d="M56 56 L66 66 L64 78" fill="none" />
      {head
        ? <image href={head} x="42" y="-18" width="44" height="50" preserveAspectRatio="xMidYMid meet" />
        : <><circle cx="64" cy="18" r="11" fill="#f5b800" /><path d="M58 14 Q66 6 74 14" fill="none" /></>}
    </g>
  </svg>
);

export const Chai = () => (
  <svg viewBox="0 0 100 110" width="100%" height="100%">
    <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" fill="none">
      <path d="M38 8 Q32 16 38 24" /><path d="M54 6 Q48 14 54 22" />
      <path d="M72 50 Q94 50 92 66 Q90 80 70 78" />
      <path d="M18 34 L76 34 L70 96 Q46 104 24 96 Z" fill="#8ec5ff" />
      <text x="47" y="70" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="20" fill={INK} stroke="none">chai</text>
    </g>
  </svg>
);

export const Phone = () => (
  <svg viewBox="0 0 80 120" width="100%" height="100%">
    <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
      <rect x="8" y="6" width="64" height="108" rx="12" fill="#2747d8" />
      <rect x="16" y="20" width="48" height="20" rx="8" fill="#e8f0ff" />
      <circle cx="28" cy="30" r="2.5" fill={INK} stroke="none" /><circle cx="40" cy="30" r="2.5" fill={INK} stroke="none" /><circle cx="52" cy="30" r="2.5" fill={INK} stroke="none" />
      <rect x="22" y="48" width="42" height="12" rx="6" fill="#f5b800" />
      <path d="M40 92 C30 84 26 80 28 74 C30 68 38 68 40 74 C42 68 50 68 52 74 C54 80 50 84 40 92Z" fill="#f7a8c4" />
    </g>
  </svg>
);

export const CurlyArrow = () => (
  <svg viewBox="0 0 60 30" width="44" height="22" style={{ marginLeft: 4, verticalAlign: "middle" }}>
    <path d="M2 10 Q20 2 30 12 Q38 22 50 16" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M42 10 L52 15 L44 22" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Squiggle = ({ color = "#f2552c" }) => (
  <svg viewBox="0 0 200 14" preserveAspectRatio="none" width="100%" height="10" className="squiggle">
    <path d="M2 9 Q30 2 60 8 T120 7 T198 6" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

/* ── Project illustrations ─────────────────────────────────── */
const Browser = ({ url, bar = "#fff", children }) => (
  <g>
    <rect x="2" y="2" width="356" height="236" rx="10" fill={bar} stroke={INK} strokeWidth="3" />
    <rect x="2" y="2" width="356" height="30" rx="10" fill="#eef0f3" stroke={INK} strokeWidth="3" />
    <rect x="2" y="22" width="356" height="10" fill="#eef0f3" />
    <line x1="2" y1="32" x2="358" y2="32" stroke={INK} strokeWidth="3" />
    <circle cx="18" cy="17" r="4.5" fill="#f2552c" /><circle cx="32" cy="17" r="4.5" fill="#f5b800" /><circle cx="46" cy="17" r="4.5" fill="#2f9e5a" />
    <rect x="64" y="9" width="190" height="16" rx="8" fill="#fff" stroke="#c9ccd2" strokeWidth="1.5" />
    <text x="74" y="21" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#666">{url}</text>
    {children}
  </g>
);

export const InvoiceArt = () => (
  <svg viewBox="0 0 470 300" width="100%" height="100%">
    <rect x="40" y="0" width="70" height="18" fill="#a8e6c3" opacity=".9" transform="rotate(-5 75 9)" />
    <g transform="translate(6 14)">
      <Browser url="invoices.app/dashboard" bar="#0f3d2a">
        <text x="20" y="64" fontFamily="Anton, sans-serif" fontSize="22" fill="#fff">Invoices,</text>
        <text x="20" y="90" fontFamily="Anton, sans-serif" fontSize="22" fill="#f9c74f">sorted.</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(20 ${108 + i * 28})`}>
            <rect width="200" height="22" rx="5" fill="#1d5a3f" />
            <rect x="8" y="7" width="70" height="8" rx="4" fill="#cfe9dc" />
            <rect x="140" y="5" width="52" height="12" rx="6" fill={i === 2 ? "#f9c74f" : "#7fdca8"} />
          </g>
        ))}
        <g transform="translate(240 56)">
          <rect width="100" height="70" rx="8" fill="#1d5a3f" />
          {[18, 30, 44, 26, 52].map((h, i) => <rect key={i} x={12 + i * 17} y={60 - h} width="11" height={h} rx="2" fill={i === 4 ? "#f9c74f" : "#7fdca8"} />)}
        </g>
      </Browser>
    </g>
    <g transform="translate(300 110) rotate(6)">
      <rect width="150" height="176" rx="12" fill="#fff" stroke={INK} strokeWidth="3.5" />
      <rect x="0" y="0" width="150" height="34" rx="12" fill="#f9c74f" stroke={INK} strokeWidth="3.5" />
      <text x="16" y="23" fontFamily="Anton, sans-serif" fontSize="15" fill={INK}>INVOICE #2041</text>
      {[52, 68, 84, 100].map((y) => <rect key={y} x="16" y={y} width={y === 84 ? 70 : 110} height="7" rx="3.5" fill="#d9dce1" />)}
      <line x1="16" y1="122" x2="134" y2="122" stroke={INK} strokeWidth="2" strokeDasharray="4 4" />
      <text x="16" y="148" fontFamily="Figtree, sans-serif" fontWeight="800" fontSize="20" fill={INK}>₹ 48,250</text>
      <circle cx="122" cy="146" r="16" fill="#2f9e5a" stroke={INK} strokeWidth="3" />
      <path d="M114 146 l6 6 l10 -12" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const TravelArt = () => {
  const box = (x, y, t, c) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="86" height="54" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect width="86" height="18" rx="6" fill={c} stroke={INK} strokeWidth="2.5" />
      <text x="8" y="13" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" fill={INK}>{t}</text>
      <rect x="8" y="26" width="52" height="5" rx="2.5" fill="#d9dce1" /><rect x="8" y="37" width="38" height="5" rx="2.5" fill="#d9dce1" />
    </g>
  );
  return (
    <svg viewBox="0 0 470 300" width="100%" height="100%">
      <rect x="40" y="0" width="70" height="18" fill="#f7b7c8" opacity=".9" transform="rotate(-5 75 9)" />
      <g transform="translate(6 14)">
        <Browser url="europe-travel / schema.sql" bar="#f4f7ff">
          <g stroke={INK} strokeWidth="2" fill="none">
            <path d="M106 80 L140 80" /><path d="M226 80 L250 80" /><path d="M183 107 L183 140" /><path d="M63 107 L63 140" /><path d="M293 107 L293 140" />
          </g>
          {box(20, 53, "customers", "#a9cdff")}
          {box(140, 53, "bookings", "#f9c74f")}
          {box(250, 53, "tours", "#a8e6c3")}
          {box(20, 140, "payments", "#f7b7c8")}
          {box(140, 140, "hotels", "#c9b8ff")}
          {box(250, 140, "guides", "#a9cdff")}
        </Browser>
      </g>
      <g transform="translate(318 150) rotate(-6)">
        <rect width="132" height="120" rx="12" fill="#2747d8" stroke={INK} strokeWidth="3.5" />
        <text x="16" y="38" fontFamily="Anton, sans-serif" fontSize="26" fill="#fff">10 TABLES</text>
        <rect x="16" y="54" width="100" height="26" rx="13" fill="#f9c74f" stroke={INK} strokeWidth="2.5" />
        <text x="32" y="72" fontFamily="Figtree, sans-serif" fontWeight="800" fontSize="13" fill={INK}>3NF  ✓</text>
        <text x="16" y="104" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#cfe0ff">PK · FK · JOIN</text>
      </g>
    </svg>
  );
};

export const KovaiArt = () => (
  <svg viewBox="0 0 470 300" width="100%" height="100%">
    <rect x="40" y="0" width="70" height="18" fill="#f9c74f" opacity=".9" transform="rotate(-5 75 9)" />
    <g transform="translate(6 14)">
      <Browser url="namma-kovai.netlify.app" bar="#e9f6ff">
        <defs><clipPath id="kv-clip"><rect x="4" y="34" width="352" height="202" rx="6" /></clipPath></defs>
        <g clipPath="url(#kv-clip)">
          <rect x="0" y="32" width="360" height="210" fill="#bfe6ff" />
          <circle cx="292" cy="76" r="20" fill="#f9c74f" stroke={INK} strokeWidth="2.5" />
          <path d="M0 190 Q60 110 120 150 Q170 90 240 140 Q300 100 360 150 L360 240 L0 240Z" fill="#2f9e5a" stroke={INK} strokeWidth="2.5" />
          <path d="M0 214 Q90 170 180 200 Q270 176 360 206 L360 240 L0 240Z" fill="#1f7a3a" stroke={INK} strokeWidth="2.5" />
          {/* temple gopuram */}
          <g transform="translate(206 128)" stroke={INK} strokeWidth="2.5" fill="#f2a65a">
            <path d="M0 64 L6 40 L36 40 L42 64Z" /><path d="M6 40 L10 24 L32 24 L36 40Z" /><path d="M10 24 L14 10 L28 10 L32 24Z" />
            <path d="M14 10 L21 0 L28 10Z" fill="#f2552c" />
          </g>
          <text x="22" y="72" fontFamily="Anton, sans-serif" fontSize="30" fill={INK}>NAMMA</text>
          <text x="22" y="104" fontFamily="Anton, sans-serif" fontSize="30" fill="#f2552c">KOVAI</text>
          <rect x="22" y="116" width="74" height="18" rx="9" fill="#fff" stroke={INK} strokeWidth="2" />
          <text x="32" y="129" fontFamily="Figtree, sans-serif" fontWeight="800" fontSize="9" fill={INK}>EXPLORE →</text>
        </g>
      </Browser>
    </g>
    <g transform="translate(330 120) rotate(7)">
      <rect width="118" height="170" rx="16" fill="#fff" stroke={INK} strokeWidth="3.5" />
      <rect x="10" y="12" width="98" height="90" rx="8" fill="#a8e6c3" stroke={INK} strokeWidth="2.5" />
      <path d="M10 70 Q40 50 60 66 Q80 80 108 58" fill="none" stroke="#fff" strokeWidth="5" />
      <path d="M58 28 C46 28 40 37 40 45 C40 58 58 74 58 74 C58 74 76 58 76 45 C76 37 70 28 58 28Z" fill="#f2552c" stroke={INK} strokeWidth="2.5" />
      <circle cx="58" cy="45" r="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x="12" y="114" width="94" height="10" rx="5" fill="#d9dce1" />
      <rect x="12" y="132" width="64" height="10" rx="5" fill="#d9dce1" />
      <rect x="12" y="150" width="40" height="10" rx="5" fill="#f9c74f" />
    </g>
  </svg>
);
