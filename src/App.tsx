import { useEffect, useState } from "react"

const weddingDate = new Date("2026-12-05T08:00:00+07:00")
const mapsUrl = "https://maps.app.goo.gl/RUE7vcRpxLF5Du1c9?g_st=aw"

type LeafBranchProps = {
  className?: string
  flip?: boolean
}

function LeafBranch({ className = "", flip = false }: LeafBranchProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 180 250"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d="M28 235C42 169 66 105 145 20" />
      <path d="M55 169C24 156 16 135 20 116C46 120 62 135 55 169Z" />
      <path d="M70 133C54 104 59 80 75 67C91 87 91 109 70 133Z" />
      <path d="M91 98C78 69 87 46 104 36C116 57 112 79 91 98Z" />
      <path d="M109 74C112 47 128 31 147 28C148 50 137 66 109 74Z" />
      <path d="M44 200C18 195 4 177 3 158C26 158 43 174 44 200Z" />
      <path d="M63 157C79 132 100 123 119 130C106 153 87 163 63 157Z" />
      <path d="M81 117C101 96 124 91 140 101C123 121 102 126 81 117Z" />
      <circle cx="53" cy="179" r="4" />
      <circle cx="77" cy="119" r="3" />
      <circle cx="100" cy="84" r="3" />
    </svg>
  )
}

function Flourish() {
  return (
    <div className="flourish" aria-hidden="true">
      <span />
      <svg viewBox="0 0 42 24" fill="none">
        <path d="M21 22C19 14 13 6 3 4C5 12 11 17 21 17C23 10 29 4 39 2C37 11 31 16 21 17" />
      </svg>
      <span />
    </div>
  )
}

function DetailIcon({ type }: { type: "calendar" | "clock" | "pin" }) {
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 3v3M19 3v3M3 9h18M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z" />
        <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
      </svg>
    )
  }

  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(
    () => weddingDate.getTime() - Date.now(),
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(weddingDate.getTime() - Date.now())
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const total = Math.max(0, timeLeft)
  const units = [
    { label: "Hari", value: Math.floor(total / 86_400_000) },
    { label: "Jam", value: Math.floor((total / 3_600_000) % 24) },
    { label: "Menit", value: Math.floor((total / 60_000) % 60) },
    { label: "Detik", value: Math.floor((total / 1_000) % 60) },
  ]

  return (
    <div className="countdown">
      {units.map((unit) => (
        <div className="countdown-unit" key={unit.label}>
          <strong>{String(unit.value).padStart(2, "0")}</strong>
          <span>{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)

  return (
    <main className="site-shell">
      {!opened && (
        <section className="cover">
          <div className="cover-frame">
            <LeafBranch className="cover-leaf cover-leaf-left" />
            <LeafBranch className="cover-leaf cover-leaf-right" flip />
            <p className="eyebrow">The Wedding of</p>
            <h1>
              Hery <span>&amp;</span> Barir
            </h1>
            <p className="cover-date">05 . 12 . 2026</p>
            <div className="cover-divider" />
            <p className="guest-label">Kepada Bapak/Ibu/Saudara/i</p>
            <p className="guest-name">Tamu Undangan</p>
            <button type="button" onClick={() => setOpened(true)}>
              Buka Undangan
            </button>
          </div>
        </section>
      )}

      <section className="hero" id="home">
        <div className="hero-arch">
          <LeafBranch className="hero-leaf hero-leaf-left" />
          <LeafBranch className="hero-leaf hero-leaf-right" flip />
          <div className="hero-content">
            <p className="eyebrow">The Wedding of</p>
            <h2>
              Hery <span>&amp;</span> Barir
            </h2>
            <p className="hero-date">Sabtu, 05 Desember 2026</p>
          </div>
        </div>
        <a
          className="scroll-cue"
          href="#invitation"
          aria-label="Lihat undangan"
        >
          <span />
        </a>
      </section>

      <section className="invitation section" id="invitation">
        <p className="arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم</p>
        <p className="intro-copy">
          Maha suci Allah SWT yang telah menciptakan makhluk-Nya
          berpasang-pasangan. Dengan memohon rahmat dan ridho-Nya, kami
          bermaksud menyelenggarakan pernikahan putra-putri kami.
        </p>

        <div className="couple-grid">
          <article className="person">
            <p className="person-kicker">Mempelai Pria</p>
            <h3>Heryono</h3>
            <Flourish />
            <p>Putra dari</p>
            <strong>Bapak Mulyono &amp; Ibu Ernawati</strong>
            <small>Desa Mekar Sekuntum, Kec. Tebas, Kab. Sambas</small>
          </article>

          <div className="ampersand" aria-hidden="true">
            &amp;
          </div>

          <article className="person">
            <p className="person-kicker">Mempelai Wanita</p>
            <h3>Barirrotur Rohmah</h3>
            <Flourish />
            <p>Putri dari</p>
            <strong>Bapak Tumingin &amp; Ibu Nur Ainah</strong>
            <small>Desa Pelang, Kec. Sarang, Kab. Rembang</small>
          </article>
        </div>
      </section>

      <section className="date-section section">
        <div className="date-card">
          <p className="eyebrow">Save the date</p>
          <h2>Hari Bahagia Kami</h2>
          <Flourish />

          <div className="calendar-row" aria-label="Sabtu, 5 Desember 2026">
            <span>Sabtu</span>
            <strong>05</strong>
            <span>
              Desember
              <br />
              2026
            </span>
          </div>

          <Countdown />
        </div>
      </section>

      <section className="events section" id="acara">
        <div className="section-heading">
          <p className="eyebrow">Rangkaian Acara</p>
          <h2>Dengan penuh kebahagiaan</h2>
          <p>
            Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa
            restu.
          </p>
        </div>

        <div className="event-grid">
          <article className="event-card">
            <p className="event-number">01</p>
            <h3>Akad Nikah</h3>
            <Flourish />
            <ul>
              <li>
                <DetailIcon type="calendar" />
                <span>Sabtu, 05 Desember 2026</span>
              </li>
              <li>
                <DetailIcon type="clock" />
                <span>08.00 WIB</span>
              </li>
              <li>
                <DetailIcon type="pin" />
                <span>Masjid Al-Amin, Pelang Wetan</span>
              </li>
            </ul>
          </article>

          <article className="event-card featured">
            <p className="event-number">02</p>
            <h3>Resepsi</h3>
            <Flourish />
            <ul>
              <li>
                <DetailIcon type="calendar" />
                <span>Sabtu, 05 Desember 2026</span>
              </li>
              <li>
                <DetailIcon type="clock" />
                <span>08.00 WIB — Selesai</span>
              </li>
              <li>
                <DetailIcon type="pin" />
                <span>Kediaman Mempelai Wanita</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="location section">
        <LeafBranch className="location-leaf" />
        <div className="location-layout">
          <div className="location-inner">
            <p className="eyebrow">Lokasi Acara</p>
            <h2>Kediaman Mempelai Wanita</h2>
            <p>
              Dukuh Pelang Wetan, Desa Pelang, Kecamatan Sarang, Kabupaten
              Rembang
            </p>
            <a
              className="location-button"
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Lihat di Google Maps
            </a>
          </div>
        </div>
      </section>

      <footer>
        <LeafBranch className="footer-leaf footer-leaf-left" />
        <LeafBranch className="footer-leaf footer-leaf-right" flip />
        <p className="eyebrow">Terima Kasih</p>
        <p className="footer-copy">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <p>Kami yang berbahagia,</p>
        <h2>Hery &amp; Barir</h2>
        <p className="family">Segenap Keluarga</p>
      </footer>
    </main>
  )
}
