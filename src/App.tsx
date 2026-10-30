import { type FormEvent, useEffect, useState } from "react"

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

function getInitialGuestName(): string {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search)
      const paramName =
        params.get("to") ||
        params.get("guest") ||
        params.get("nama") ||
        params.get("u")
      if (paramName && paramName.trim()) {
        return paramName.trim()
      }
      const stored = localStorage.getItem("wedding_guest_name")
      if (stored && stored.trim()) {
        return stored.trim()
      }
    } catch {
      // ignore
    }
  }
  return "Tamu Undangan"
}

function checkIsGuestRecipient(): boolean {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search)
      const hasGuestParam = Boolean(
        params.get("to") ||
          params.get("guest") ||
          params.get("nama") ||
          params.get("u"),
      )
      const isAdmin =
        params.get("admin") === "1" ||
        params.get("admin") === "true" ||
        params.get("edit") === "1"
      return hasGuestParam && !isAdmin
    } catch {
      // ignore
    }
  }
  return false
}

type RSVPStatus = "hadir" | "tidak_hadir" | "ragu"

type WishItem = {
  id: string
  name: string
  status: RSVPStatus
  message: string
  createdAt: number
}

const defaultWishes: WishItem[] = [
  {
    id: "w-1",
    name: "Ahmad Fauzi & Keluarga",
    status: "hadir",
    message:
      "Selamat menempuh hidup baru Mas Hery & Mbak Barir! Semoga menjadi keluarga yang sakinah mawaddah warahmah, senantiasa dilimpahkan berkah dan kebahagiaan.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "w-2",
    name: "Aufal Marom",
    status: "hadir",
    message:
      "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir. Selamat berbahagia Hery & Barir! Insya Allah kami sekeluarga hadir merayakan hari bahagia ini.",
    createdAt: Date.now() - 1000 * 60 * 60 * 10,
  },
  {
    id: "w-3",
    name: "Rina Kusuma",
    status: "tidak_hadir",
    message:
      "Selamat untuk Hery dan Barir! Mohon maaf sekali belum bisa hadir langsung karena dinas luar kota, tapi doa tulus senantiasa mengalir untuk kelancaran acaranya.",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: "w-4",
    name: "Dimas Aditya",
    status: "hadir",
    message:
      "Selamat brader Hery & Barir! Lancar acaranya dari akad sampai resepsi. Semoga langgeng till jannah!",
    createdAt: Date.now() - 1000 * 60 * 45,
  },
]

function getInitialWishes(): WishItem[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("wedding_rsvp_wishes")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // ignore
    }
  }
  return defaultWishes
}

function formatRelativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return "Baru saja"
  if (diffMins < 60) return `${diffMins} menit lalu`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} jam lalu`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "Kemarin"
  if (diffDays < 7) return `${diffDays} hari lalu`
  return new Date(timestamp).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [guestName, setGuestName] = useState(getInitialGuestName)
  const [isGuestRecipient] = useState(checkIsGuestRecipient)
  const [isEditingGuest, setIsEditingGuest] = useState(false)
  const [tempGuestName, setTempGuestName] = useState(guestName)
  const [copiedLink, setCopiedLink] = useState(false)

  // RSVP Form state
  const [wishes, setWishes] = useState<WishItem[]>(getInitialWishes)
  const [rsvpName, setRsvpName] = useState(() =>
    guestName !== "Tamu Undangan" ? guestName : "",
  )
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus | "">("")
  const [rsvpMessage, setRsvpMessage] = useState("")
  const [rsvpSuccess, setRsvpSuccess] = useState(false)
  const [rsvpError, setRsvpError] = useState("")

  useEffect(() => {
    document.title = "Wedding Hery & Barir"
  }, [])

  useEffect(() => {
    if (guestName && guestName !== "Tamu Undangan") {
      setRsvpName((prev) => (!prev ? guestName : prev))
    }
  }, [guestName])

  const handleRSVPSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setRsvpError("")

    if (!rsvpName.trim()) {
      setRsvpError("Mohon masukkan nama lengkap Anda.")
      return
    }
    if (!rsvpStatus) {
      setRsvpError("Mohon pilih status kehadiran Anda.")
      return
    }

    const newWish: WishItem = {
      id: "wish-" + Date.now(),
      name: rsvpName.trim(),
      status: rsvpStatus as RSVPStatus,
      message: rsvpMessage.trim(),
      createdAt: Date.now(),
    }

    const updated = [newWish, ...wishes]
    setWishes(updated)
    try {
      localStorage.setItem("wedding_rsvp_wishes", JSON.stringify(updated))
    } catch {
      // Ignore storage errors
    }

    setRsvpSuccess(true)
    setRsvpMessage("")
    setRsvpStatus("")
    setTimeout(() => {
      setRsvpSuccess(false)
    }, 5000)
  }

  const handleSaveGuestName = () => {
    const trimmed = tempGuestName.trim()
    const finalName = trimmed || "Tamu Undangan"
    setGuestName(finalName)
    setIsEditingGuest(false)

    try {
      localStorage.setItem("wedding_guest_name", finalName)
      const url = new URL(window.location.href)
      if (trimmed) {
        url.searchParams.set("to", trimmed)
      } else {
        url.searchParams.delete("to")
        url.searchParams.delete("guest")
        url.searchParams.delete("nama")
        url.searchParams.delete("u")
      }
      window.history.replaceState({}, "", url.toString())
    } catch {
      // ignore
    }
  }

  const handleCancelGuestEdit = () => {
    setTempGuestName(guestName)
    setIsEditingGuest(false)
  }

  const handleCopyShareLink = async () => {
    try {
      const url = new URL(window.location.href)
      if (guestName && guestName !== "Tamu Undangan") {
        url.searchParams.set("to", guestName)
      } else {
        url.searchParams.delete("to")
        url.searchParams.delete("guest")
        url.searchParams.delete("nama")
        url.searchParams.delete("u")
      }
      const shareUrl = url.toString()

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2500)
        return
      }

      const textArea = document.createElement("textarea")
      textArea.value = shareUrl
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    } catch {
      // ignore
    }
  }

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

            <div className="guest-section">
              <p className="guest-label">Kepada Yth. Bapak/Ibu/Saudara/i:</p>

              {isEditingGuest && !isGuestRecipient ? (
                <form
                  className="guest-edit-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSaveGuestName()
                  }}
                >
                  <div className="guest-input-wrap">
                    <input
                      type="text"
                      className="guest-input"
                      value={tempGuestName}
                      onChange={(e) => setTempGuestName(e.target.value)}
                      placeholder="Ketik Nama Tamu Undangan..."
                      autoFocus
                      maxLength={60}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          handleCancelGuestEdit()
                        }
                      }}
                    />
                  </div>
                  <div className="guest-edit-actions">
                    <button type="submit" className="guest-btn-save">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="guest-btn-cancel"
                      onClick={handleCancelGuestEdit}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="guest-display">
                  <div
                    className={`guest-badge ${
                      isGuestRecipient ? "guest-badge-recipient" : ""
                    }`}
                  >
                    <span className="guest-name">{guestName}</span>
                    {!isGuestRecipient && (
                      <button
                        type="button"
                        className="guest-edit-trigger"
                        onClick={() => {
                          setTempGuestName(
                            guestName === "Tamu Undangan" ? "" : guestName,
                          )
                          setIsEditingGuest(true)
                        }}
                        title="Ubah nama tamu undangan"
                        aria-label="Edit nama tamu"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                        <span>Edit Nama</span>
                      </button>
                    )}
                  </div>

                  {!isGuestRecipient && (
                    <button
                      type="button"
                      className="guest-share-btn"
                      onClick={handleCopyShareLink}
                      title="Salin link undangan khusus tamu ini"
                    >
                      {copiedLink ? (
                        <>
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="success-icon"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Link Khusus Tamu Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>Salin Link untuk Tamu Ini</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="open-invitation-btn"
              onClick={() => setOpened(true)}
            >
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
            {guestName && guestName !== "Tamu Undangan" && (
              <p className="hero-for-guest">
                Kepada Yth. <span>{guestName}</span>
              </p>
            )}
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

      <section className="rsvp-section section" id="rsvp">
        <div className="rsvp-container">
          <div className="rsvp-header">
            <h2 className="rsvp-title">
              KONFIRMASI KEHADIRAN
              <span>&amp; UCAPAN</span>
            </h2>
            <p className="rsvp-subtitle">
              Mohon mengisi form di bawah ini untuk konfirmasi kehadiran
              sekaligus menyampaikan ucapan Anda.
            </p>
          </div>

          <div className="rsvp-card">
            <form onSubmit={handleRSVPSubmit} className="rsvp-form">
              {/* Nama Lengkap */}
              <div className="rsvp-field">
                <div className="rsvp-label-row">
                  <label htmlFor="rsvp-name" className="rsvp-label">
                    Nama Lengkap <span className="required-star">*</span>
                  </label>
                  <span className="rsvp-counter">({rsvpName.length}/100)</span>
                </div>
                <input
                  id="rsvp-name"
                  type="text"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value.slice(0, 100))}
                  placeholder="Ketik nama lengkap Anda..."
                  className="rsvp-input"
                  required
                />
              </div>

              {/* Status Kehadiran */}
              <div className="rsvp-field">
                <div className="rsvp-label-row">
                  <label htmlFor="rsvp-status" className="rsvp-label">
                    Status Kehadiran <span className="required-star">*</span>
                  </label>
                </div>
                <div className="rsvp-select-wrap">
                  <select
                    id="rsvp-status"
                    value={rsvpStatus}
                    onChange={(e) =>
                      setRsvpStatus(e.target.value as RSVPStatus)
                    }
                    className="rsvp-select"
                    required
                  >
                    <option value="" disabled>
                      Pilih status kehadiran
                    </option>
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                    <option value="ragu">Masih Ragu / Belum Pasti</option>
                  </select>
                  <svg
                    className="rsvp-select-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Ucapan/Pesan */}
              <div className="rsvp-field">
                <div className="rsvp-label-row">
                  <label htmlFor="rsvp-message" className="rsvp-label">
                    Ucapan/Pesan
                  </label>
                  <span className="rsvp-counter">
                    ({rsvpMessage.length}/500)
                  </span>
                </div>
                <textarea
                  id="rsvp-message"
                  rows={4}
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value.slice(0, 500))}
                  placeholder="Tulis ucapan atau pesan Anda..."
                  className="rsvp-textarea"
                />
              </div>

              {rsvpError && <p className="rsvp-error-msg">{rsvpError}</p>}
              {rsvpSuccess && (
                <div className="rsvp-success-msg">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    Terima kasih! Konfirmasi kehadiran dan ucapan Anda telah
                    berhasil dikirim.
                  </span>
                </div>
              )}

              <div className="rsvp-btn-row">
                <button type="submit" className="rsvp-submit-btn">
                  Kirim Konfirmasi
                </button>
              </div>
            </form>
          </div>

          {/* Stats Bar */}
          <div className="rsvp-stats">
            <div className="rsvp-stat-box">
              <div className="rsvp-stat-number">{wishes.length}</div>
              <div className="rsvp-stat-label">Total Ucapan</div>
            </div>
            <div className="rsvp-stat-box">
              <div className="rsvp-stat-number" style={{ color: "#2e7d32" }}>
                {wishes.filter((w) => w.status === "hadir").length}
              </div>
              <div className="rsvp-stat-label">Hadir</div>
            </div>
            <div className="rsvp-stat-box">
              <div className="rsvp-stat-number" style={{ color: "#c62828" }}>
                {wishes.filter((w) => w.status === "tidak_hadir").length}
              </div>
              <div className="rsvp-stat-label">Tidak Hadir</div>
            </div>
          </div>

          {/* Wishes Feed */}
          <div className="wishes-container">
            <div className="wishes-heading">
              <h3>Ucapan &amp; Doa Restu</h3>
              <span className="wishes-count">{wishes.length} Ucapan</span>
            </div>

            <div className="wishes-feed">
              {wishes.map((item) => (
                <article key={item.id} className="wish-item">
                  <div className="wish-header">
                    <div className="wish-avatar">
                      {(item.name?.trim()?.charAt(0) || "?").toUpperCase()}
                    </div>
                    <div className="wish-meta">
                      <div className="wish-name-row">
                        <span className="wish-name">{item.name}</span>
                        {item.status === "hadir" && (
                          <span className="badge-hadir">
                            <svg
                              viewBox="0 0 24 24"
                              width="11"
                              height="11"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              aria-hidden="true"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Hadir
                          </span>
                        )}
                        {item.status === "tidak_hadir" && (
                          <span className="badge-tidak-hadir">
                            <svg
                              viewBox="0 0 24 24"
                              width="11"
                              height="11"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              aria-hidden="true"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Tidak Hadir
                          </span>
                        )}
                        {item.status === "ragu" && (
                          <span className="badge-ragu">Belum Pasti</span>
                        )}
                      </div>
                      <span className="wish-time">
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  {item.message && (
                    <p className="wish-message">{item.message}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <LeafBranch className="footer-leaf footer-leaf-left" />
        <LeafBranch className="footer-leaf footer-leaf-right" flip />
        <p className="eyebrow">Terima Kasih</p>
        <p className="footer-copy">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila{" "}
          {guestName && guestName !== "Tamu Undangan" ? (
            <>
              Bapak/Ibu/Saudara/i <strong>{guestName}</strong>
            </>
          ) : (
            "Bapak/Ibu/Saudara/i"
          )}{" "}
          berkenan hadir untuk memberikan doa restu.
        </p>
        <p>Kami yang berbahagia,</p>
        <h2>Hery &amp; Barir</h2>
        <p className="family">Segenap Keluarga</p>
      </footer>

      {opened && (
        <button
          type="button"
          className="back-to-cover-btn"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
            setOpened(false)
          }}
          title="Kembali ke halaman sampul"
          aria-label="Kembali ke halaman sampul"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Sampul</span>
        </button>
      )}
    </main>
  )
}
