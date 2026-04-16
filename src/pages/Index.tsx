import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const KITSUNE_IMG = "https://cdn.poehali.dev/projects/d2308c17-abb8-4ebc-b018-33a9fa7319af/files/f8c047f7-b965-4a7a-bd8a-670304314350.jpg";
const BOOK_IMG = "https://cdn.poehali.dev/projects/d2308c17-abb8-4ebc-b018-33a9fa7319af/files/7e591d1a-8fbd-4aaf-a63e-e8a85e3ca1eb.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "О книге", href: "#book" },
  { label: "Об авторе", href: "#author" },
  { label: "Купить", href: "#buy" },
  { label: "Отзывы", href: "#reviews" },
];

const BUY_LINKS = [
  { name: "Ozon", icon: "ShoppingBag", href: "#", color: "#005BFF" },
  { name: "ЛитРес", icon: "BookOpen", href: "#", color: "#FF6B00" },
  { name: "Amazon", icon: "Globe", href: "#", color: "#FF9900" },
  { name: "Читай-город", icon: "BookMarked", href: "#", color: "#E31E24" },
];

function WispOrb({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: "8px",
        height: "8px",
        background: "radial-gradient(circle, #C9943A 0%, #D4521A44 60%, transparent 100%)",
        boxShadow: "0 0 12px 4px #C9943A88",
        animation: `wisp ${4 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 4}s`,
        ...style,
      }}
    />
  );
}

function FoxDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-fox-gold/40 to-transparent" />
      <span className="text-fox-gold text-lg">🦊</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-fox-gold/40 to-transparent" />
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(href.replace("#", ""));
  };

  const wisps = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i * 7 + 5) % 95}%`,
    top: `${(i * 13 + 10) % 85}%`,
    animationDelay: `${i * 0.7}s`,
  }));

  return (
    <div
      className="min-h-screen font-golos"
      style={{
        background: "#0A0608",
        color: "#F0E6D3",
      }}
    >
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 20% 10%, #8B1A2A18 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 80%, #C9943A14 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, #D4521A0A 0%, transparent 70%)
          `,
        }}
      />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,6,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,148,58,0.15)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#hero")}
            className="font-cormorant text-xl font-semibold tracking-widest"
            style={{ color: "#C9943A", letterSpacing: "0.2em" }}
          >
            狐の花嫁
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className="font-golos text-sm tracking-widest uppercase transition-all duration-300"
                  style={{
                    color: activeSection === item.href.replace("#", "") ? "#C9943A" : "#C8BFB5",
                    borderBottom: activeSection === item.href.replace("#", "") ? "1px solid #C9943A" : "1px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile burger */}
          <button
            className="md:hidden text-fox-cream"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
            style={{ background: "rgba(10,6,8,0.97)" }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left font-golos text-sm tracking-widest uppercase"
                style={{ color: "#C8BFB5" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Kitsune bg image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${KITSUNE_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.25) saturate(0.8)",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #0A060888 0%, transparent 40%, #0A060890 70%, #0A0608 100%)",
          }}
        />

        {/* Wisps */}
        <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
          {wisps.map((w, i) => (
            <WispOrb key={i} style={{ left: w.left, top: w.top, animationDelay: w.animationDelay }} />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto" style={{ paddingTop: "80px" }}>
          <p
            className="font-golos text-xs tracking-[0.4em] uppercase mb-6 animate-fade-up"
            style={{ color: "#C9943A", animationDelay: "0.1s", opacity: 0 }}
          >
            Мистическое романтическое фэнтези
          </p>

          <h1
            className="font-cormorant font-light leading-none mb-6 animate-fade-up"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              color: "#F0E6D3",
              textShadow: "0 0 60px rgba(201,148,58,0.3)",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Невеста
            <br />
            <em style={{ color: "#C9943A" }}>Лиса</em>
          </h1>

          <FoxDivider />

          <p
            className="font-cormorant italic text-xl mt-6 leading-relaxed animate-fade-up"
            style={{ color: "#C8BFB5", animationDelay: "0.5s", opacity: 0, maxWidth: "500px", margin: "1.5rem auto 0" }}
          >
            Когда лисий дух приходит за невестой,<br />
            ни одна из них не возвращается прежней...
          </p>

          <button
            onClick={() => scrollTo("#book")}
            className="mt-10 inline-block font-golos text-sm tracking-[0.3em] uppercase transition-all duration-300 animate-fade-up"
            style={{
              color: "#0A0608",
              background: "linear-gradient(135deg, #C9943A, #D4521A)",
              padding: "14px 40px",
              border: "none",
              cursor: "pointer",
              animationDelay: "0.7s",
              opacity: 0,
              boxShadow: "0 0 30px rgba(201,148,58,0.25)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 50px rgba(201,148,58,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(201,148,58,0.25)")}
          >
            Узнать больше
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <Icon name="ChevronDown" size={24} style={{ color: "#C9943A44" }} />
        </div>
      </section>

      {/* BOOK */}
      <section id="book" className="relative z-10 py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-golos text-xs tracking-[0.4em] uppercase text-center mb-3" style={{ color: "#C9943A" }}>
            О книге
          </p>
          <h2 className="font-cormorant text-5xl font-light text-center mb-16" style={{ color: "#F0E6D3" }}>
            История, написанная туманом
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div
                className="absolute -inset-4 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"
                style={{ background: "radial-gradient(ellipse, #C9943A30, transparent 70%)" }}
              />
              <img
                src={BOOK_IMG}
                alt="Обложка книги Невеста Лиса"
                className="w-full max-w-sm mx-auto relative z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(201,148,58,0.15)",
                }}
              />
            </div>

            <div className="flex flex-col gap-6">
              <div
                className="p-6 border-l-2"
                style={{ borderColor: "#C9943A", background: "rgba(201,148,58,0.05)" }}
              >
                <p className="font-cormorant italic text-lg leading-relaxed" style={{ color: "#C8BFB5" }}>
                  «В мире, где духи лисиц собирают невест для своих господ, 
                  молодая девушка оказывается вовлечена в древний обряд — 
                  и обнаруживает, что её похититель не тот, кем кажется...»
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Жанр", value: "Тёмное романтическое фэнтези" },
                  { label: "Сеттинг", value: "Древняя Япония, мир духов" },
                  { label: "Объём", value: "Роман" },
                  { label: "Язык", value: "Русский" },
                ].map((item) => (
                  <div key={item.label} className="p-4" style={{ background: "rgba(26,15,24,0.8)", border: "1px solid rgba(201,148,58,0.15)" }}>
                    <p className="font-golos text-xs tracking-wider uppercase mb-1" style={{ color: "#C9943A" }}>{item.label}</p>
                    <p className="font-cormorant text-lg" style={{ color: "#F0E6D3" }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {["🦊 Кицунэ", "🌸 Восточная мифология", "💀 Тёмный роман", "✨ Мистика"].map((tag) => (
                  <span
                    key={tag}
                    className="font-golos text-xs tracking-wider px-3 py-1"
                    style={{
                      background: "rgba(139,26,42,0.3)",
                      border: "1px solid rgba(139,26,42,0.5)",
                      color: "#C8BFB5",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section
        id="author"
        className="relative z-10 py-28 px-6"
        style={{ background: "rgba(18,8,13,0.8)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-golos text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#C9943A" }}>
            Об авторе
          </p>
          <h2 className="font-cormorant text-5xl font-light mb-16" style={{ color: "#F0E6D3" }}>
            Голос из тумана
          </h2>

          <div className="flex flex-col items-center gap-8">
            <div
              className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, #8B1A2A40, #0A0608)",
                border: "2px solid rgba(201,148,58,0.3)",
                boxShadow: "0 0 40px rgba(201,148,58,0.1)",
              }}
            >
              <span className="text-5xl">🦊</span>
            </div>

            <div className="max-w-2xl">
              <p
                className="font-cormorant text-2xl font-light mb-2"
                style={{ color: "#C9943A" }}
              >
                Имя Автора
              </p>
              <p className="font-golos text-sm tracking-widest uppercase mb-6" style={{ color: "#C8BFB5" }}>
                Писатель · Мечтатель · Исследователь мифов
              </p>

              <FoxDivider />

              <p className="font-golos leading-relaxed mt-6" style={{ color: "#C8BFB5" }}>
                Здесь будет ваша биография. Расскажите читателям о себе — 
                откуда появилось увлечение восточной мифологией, как родилась идея книги, 
                что вдохновляет вас на создание мистических историй о лисах-оборотнях 
                и тёмных духах древней Японии.
              </p>
            </div>

            <div className="flex gap-6 mt-4">
              {[
                { icon: "Instagram", label: "Instagram" },
                { icon: "Send", label: "Telegram" },
                { icon: "BookOpen", label: "Блог" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="flex flex-col items-center gap-2 group transition-all duration-300"
                  style={{ color: "#C8BFB5" }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      border: "1px solid rgba(201,148,58,0.3)",
                      background: "rgba(201,148,58,0.05)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9943A"; e.currentTarget.style.background = "rgba(201,148,58,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,148,58,0.3)"; e.currentTarget.style.background = "rgba(201,148,58,0.05)"; }}
                  >
                    <Icon name={s.icon} fallback="Link" size={16} />
                  </div>
                  <span className="text-xs tracking-wider">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" className="relative z-10 py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-golos text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#C9943A" }}>
            Купить книгу
          </p>
          <h2 className="font-cormorant text-5xl font-light mb-4" style={{ color: "#F0E6D3" }}>
            Выберите платформу
          </h2>
          <p className="font-golos mb-16" style={{ color: "#C8BFB5" }}>
            Книга доступна в электронном и печатном форматах
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BUY_LINKS.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                className="group flex flex-col items-center gap-4 p-6 transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(26,15,24,0.8)",
                  border: "1px solid rgba(201,148,58,0.15)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#C9943A";
                  e.currentTarget.style.background = "rgba(201,148,58,0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(201,148,58,0.15)";
                  e.currentTarget.style.background = "rgba(26,15,24,0.8)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ background: `${platform.color}22`, border: `1px solid ${platform.color}44` }}
                >
                  <Icon name={platform.icon} fallback="ShoppingBag" size={20} style={{ color: platform.color }} />
                </div>
                <span className="font-cormorant text-xl" style={{ color: "#F0E6D3" }}>{platform.name}</span>
                <span className="font-golos text-xs tracking-wider uppercase" style={{ color: "#C9943A" }}>
                  Купить →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="reviews"
        className="relative z-10 py-28 px-6"
        style={{ background: "rgba(18,8,13,0.8)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-golos text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#C9943A" }}>
            Отзывы
          </p>
          <h2 className="font-cormorant text-5xl font-light mb-16" style={{ color: "#F0E6D3" }}>
            Голоса читателей
          </h2>

          <div
            className="flex flex-col items-center gap-8 py-16"
            style={{
              border: "1px solid rgba(201,148,58,0.15)",
              background: "rgba(201,148,58,0.03)",
            }}
          >
            <div className="text-6xl opacity-30">🦊</div>
            <div>
              <p
                className="font-cormorant italic text-2xl mb-3"
                style={{ color: "#C8BFB5" }}
              >
                Пока отзывов нет
              </p>
              <p className="font-golos text-sm" style={{ color: "#C8BFB5", opacity: 0.6 }}>
                Станьте первым читателем — ваш отзыв появится здесь
              </p>
            </div>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-2xl" style={{ color: "rgba(201,148,58,0.25)" }}>★</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative z-10 py-12 px-6 text-center"
        style={{ borderTop: "1px solid rgba(201,148,58,0.15)" }}
      >
        <p className="font-cormorant text-2xl mb-2" style={{ color: "#C9943A" }}>
          狐の花嫁
        </p>
        <p className="font-golos text-xs tracking-widest uppercase" style={{ color: "#C8BFB5", opacity: 0.5 }}>
          © 2026 · Невеста Лиса · Все права защищены
        </p>
      </footer>
    </div>
  );
}