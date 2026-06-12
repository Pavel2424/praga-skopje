import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Package, Truck, ShieldCheck, Phone, Mail, MapPin, Menu, X, Upload, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroImg from "@/assets/hero-products.jpg";
import logo from "@/assets/logo.png";
import catAluminum from "@/assets/cat-aluminum.jpg";
import catPlastic from "@/assets/cat-plastic.jpg";
import catPaper from "@/assets/cat-paper.jpg";
import catCleaning from "@/assets/cat-cleaning.jpg";
import catBags from "@/assets/cat-bags.jpg";
import catNapkins from "@/assets/cat-napkins.jpg";
import cat0 from "@/assets/catalog/catalog-0.jpg.asset.json";
import cat1 from "@/assets/catalog/catalog-1.jpg.asset.json";
import cat2 from "@/assets/catalog/catalog-2.jpg.asset.json";
import cat3 from "@/assets/catalog/catalog-3.jpg.asset.json";
import cat4 from "@/assets/catalog/catalog-4.jpg.asset.json";
import cat5 from "@/assets/catalog/catalog-5.jpg.asset.json";
import cat6 from "@/assets/catalog/catalog-6.jpg.asset.json";
import cat10 from "@/assets/catalog/catalog-10.jpg.asset.json";
import cat11 from "@/assets/catalog/catalog-11.jpg.asset.json";

const CATEGORIES = ["Алуминиум", "Пластика", "Хартија", "Стиропор", "Хигиена", "Друго"] as const;
type Category = typeof CATEGORIES[number];

const catalogPages: { url: string; title: string; category: Category }[] = [
  { url: cat10.url, title: "Алуминиумски садови и фолија", category: "Алуминиум" },
  { url: cat5.url, title: "Пластична амбалажа", category: "Пластика" },
  { url: cat6.url, title: "Пластични чаши и кутии", category: "Пластика" },
  { url: cat1.url, title: "Хартија и производи од хартија", category: "Хартија" },
  { url: cat2.url, title: "Чаши за кафе, фискални ролни", category: "Хартија" },
  { url: cat3.url, title: "Стиропорна амбалажа", category: "Стиропор" },
  { url: cat4.url, title: "Стиропорни модели MB / XB / PAL", category: "Стиропор" },
  { url: cat11.url, title: "Диспанзери и хемиски средства", category: "Хигиена" },
  { url: cat0.url, title: "ПРАГА — преглед на асортиман", category: "Друго" },
];

type UserItem = { id: string; url: string; title: string; category: Category };

function useUserProducts() {
  const [items, setItems] = useState<UserItem[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("praga.userProducts");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  const save = (next: UserItem[]) => {
    setItems(next);
    try { localStorage.setItem("praga.userProducts", JSON.stringify(next)); } catch {}
  };
  return { items, save };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Praga Skopje — Пакување, алуминиум, пластика и хигиена" },
      { name: "description", content: "Praga Skopje — добавувач на производи за пакување: алуминиумска фолија, пластични чаши и кутии, хартија за печење, кеси и хигиенски средства за угостителство и домаќинство." },
      { property: "og:title", content: "Praga Skopje — Пакување и хигиена" },
      { property: "og:description", content: "Производи за пакување и хигиена за угостителство и домаќинство во Македонија." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Home,
});

const categories = [
  { title: "Алуминиумски производи", desc: "Фолија, тацни, кутии за храна", img: catAluminum },
  { title: "Пластични производи", desc: "Чаши, кутии, прибор за еднократна употреба", img: catPlastic },
  { title: "Хартиени производи", desc: "Хартија за печење, пергамент, ролни", img: catPaper },
  { title: "Хигиена и чистење", desc: "Метли, четки, сунѓери, средства", img: catCleaning },
  { title: "Кеси и вреќи", desc: "Кеси за ѓубре, PVC и HDPE вреќи", img: catBags },
  { title: "Салвети и тоалетна", desc: "Салвети, тоалетна хартија, бришачи", img: catNapkins },
];

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <span className="hidden sm:inline">Пон – Саб · 08:00 – 17:00 · Скопје, Северна Македонија</span>
          <div className="flex items-center gap-4">
            <a href="tel:+38970000000" className="flex items-center gap-1.5 hover:text-primary"><Phone className="size-3.5" /> +389 70 000 000</a>
            <a href="mailto:info@praga.mk" className="hidden md:flex items-center gap-1.5 hover:text-primary"><Mail className="size-3.5" /> info@praga.mk</a>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Praga Skopje" className="h-10 w-auto" width={120} height={40} />
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#categories" className="hover:text-primary">Производи</a>
            <a href="#about" className="hover:text-primary">За нас</a>
            <a href="#why" className="hover:text-primary">Зошто Praga</a>
            <a href="#contact" className="hover:text-primary">Контакт</a>
          </nav>
          <a href="#contact" className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-95 md:inline-flex">
            Побарај понуда
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-card md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-medium">
              <a href="#categories" onClick={() => setOpen(false)} className="py-2">Производи</a>
              <a href="#about" onClick={() => setOpen(false)} className="py-2">За нас</a>
              <a href="#why" onClick={() => setOpen(false)} className="py-2">Зошто Praga</a>
              <a href="#contact" onClick={() => setOpen(false)} className="py-2">Контакт</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-muted to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              <span className="size-1.5 rounded-full bg-primary" /> Praga Skopje
            </span>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl">
              Пакување и хигиена <span className="bg-primary px-2 text-primary-foreground">на едно место.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
              Снабдуваме угостителски објекти, маркети и домаќинства со квалитетни производи од
              алуминиум, пластика, хартија и средства за хигиена низ цела Македонија.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#categories" className="inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90">
                Разгледај производи <ArrowRight className="size-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold transition hover:border-primary">
                Контактирај нè
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-6 -top-6 hidden h-full w-full rounded-2xl bg-primary md:block" />
            <img
              src={heroImg}
              alt="Производи за пакување — алуминиум, пластика, хартија"
              width={1600}
              height={1024}
              className="relative rounded-2xl shadow-[var(--shadow-hover)]"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Каталог</p>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">Категории на производи</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Над 500 артикли од проверени производители — секогаш достапни од нашиот склад во Скопје.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <a
              key={c.title}
              href="#contact"
              className="group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-hover)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={c.img}
                  alt={c.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:text-primary">
                  Види повеќе <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section id="why" className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <h2 className="text-4xl font-bold md:text-5xl">Зошто Praga?</h2>
          <p className="mt-3 max-w-2xl text-secondary-foreground/70">
            Со децении искуство во дистрибуција, нудиме комплетно решение за вашите потреби.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Package, title: "Широк асортиман", desc: "Стотици артикли за угостителство, малопродажба и домаќинство, секогаш на залиха." },
              { icon: Truck, title: "Брза достава", desc: "Сопствен возен парк со достава низ цела Македонија во рок од 24–48 часа." },
              { icon: ShieldCheck, title: "Гарантиран квалитет", desc: "Соработуваме само со проверени европски и домашни производители." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-7">
                <div className="inline-flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <f.icon className="size-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-secondary-foreground/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">За нас</p>
          <h2 className="mt-2 text-4xl font-bold md:text-5xl">Партнер на кој можете да сметате.</h2>
          <p className="mt-6 text-muted-foreground">
            Praga Skopje е компанија специјализирана за дистрибуција на производи за пакување и
            хигиена. Опслужуваме ресторани, кафулиња, пекари, маркети и угостителски објекти,
            нудејќи квалитет, доверливост и конкурентни цени.
          </p>
          <p className="mt-4 text-muted-foreground">
            Нашата мисија е да бидеме првиот избор за бизнисите кои бараат сигурен снабдувач со
            едно јавување.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {[
              { n: "500+", l: "Артикли" },
              { n: "300+", l: "Клиенти" },
              { n: "24h", l: "Достава" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl font-extrabold text-secondary">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={catAluminum} alt="Склад на Praga" width={800} height={800} loading="lazy" className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-card)]" />
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-hover)] md:block">
            <div className="font-display text-3xl font-extrabold">Од 2018.</div>
            <div className="text-xs font-semibold uppercase tracking-wider">Во служба на бизнисот</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-muted">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Контакт</p>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">Побарајте понуда.</h2>
            <p className="mt-4 text-muted-foreground">
              Јавете се или пишете ни — нашиот тим ќе ви одговори во најкус можен рок со
              персонализирана понуда за вашиот бизнис.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 text-primary" />
                <div>
                  <div className="font-semibold">Адреса</div>
                  <div className="text-muted-foreground">ул. Илинденска бр. 1, 1000 Скопје</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 text-primary" />
                <div>
                  <div className="font-semibold">Телефон</div>
                  <a href="tel:+38970000000" className="text-muted-foreground hover:text-secondary">+389 70 000 000</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 text-primary" />
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:info@praga.mk" className="text-muted-foreground hover:text-secondary">info@praga.mk</a>
                </div>
              </div>
            </div>
          </div>

          <form className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Име</span>
                <input className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" placeholder="Вашето име" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Телефон</span>
                <input className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" placeholder="+389 …" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
              <input type="email" className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" placeholder="vie@firma.mk" />
            </label>
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Порака</span>
              <textarea rows={4} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" placeholder="Кажете ни што ви треба…" />
            </label>
            <button type="button" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-95">
              Испрати барање <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Praga" className="h-8 w-auto brightness-0 invert" width={80} height={32} />
            <span className="text-sm text-secondary-foreground/60">© {new Date().getFullYear()} Praga Skopje. Сите права задржани.</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#categories" className="hover:text-primary">Производи</a>
            <a href="#about" className="hover:text-primary">За нас</a>
            <a href="#contact" className="hover:text-primary">Контакт</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
