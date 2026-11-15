import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Church,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Section, SectionHeading } from "@/components/site/PageHero";
import { VerseBanner } from "@/components/site/VerseBanner";
import { Button } from "@/components/ui/button";
import { events, formatDate, leaders, news, photos, values } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kilifi Angels Junior School — Christ-centred CBC school in Kilifi" },
      {
        name: "description",
        content:
          "Kilifi Angels Junior School nurtures learners from Grade 1 to 9 in faith, character and excellence through Kenya's CBC.",
      },
      { property: "og:title", content: "Kilifi Angels Junior School" },
      {
        property: "og:description",
        content: "A Christian-centred CBC junior school in Kilifi, Kenya. Admissions open.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "350+", label: "Happy learners" },
  { value: "28", label: "Dedicated teachers" },
  { value: "15+", label: "Years of service" },
  { value: "G1–G9", label: "CBC grades" },
];

const reasons = [
  { icon: Church, title: "Christ-centred", text: "Daily devotions, chapel and Bible study shape character and faith." },
  { icon: BookOpenCheck, title: "Strong CBC delivery", text: "Practical, competency-based lessons with regular learner feedback." },
  { icon: Users, title: "Small, caring classes", text: "Teachers who know every learner by name and walk with them." },
  { icon: Sprout, title: "Green, safe campus", text: "Shaded grounds, play areas and gardens for outdoor learning." },
  { icon: HeartHandshake, title: "Parent partnership", text: "Open communication, open days and a portal to follow progress." },
  { icon: ShieldCheck, title: "Whole-child growth", text: "Clubs, sports, music and life skills beyond the classroom." },
];

const testimonials = [
  {
    quote: "My daughter has grown so much in confidence. The teachers truly care and pray with the children.",
    name: "Mama Wanjiru",
    role: "Parent, Grade 5",
  },
  {
    quote: "I love the cooking and science practicals. We learn by doing, and my friends here are like family.",
    name: "Amina",
    role: "Learner, Grade 8",
  },
  {
    quote: "The CBC reports are clear and the school keeps us informed every step of the way.",
    name: "Mr. Baya",
    role: "Parent, Grade 3",
  },
];

function Index() {
  const director = leaders[0]!;
  return (
    <>
      <HeroSlider />

      {/* Stats */}
      <div className="relative z-10 mx-auto mt-6 max-w-6xl px-6 md:-mt-12">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-lift md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-7 text-center">
              <p className="font-display text-3xl font-black text-primary md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Welcome */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md">
            <img
              src={photos.learnersSmiling}
              alt="Smiling Kilifi Angels learners"
              className="arch aspect-[4/5] w-full object-cover object-top shadow-lift"
            />
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-gold px-5 py-4 text-primary-deep shadow-soft">
              <p className="font-display text-2xl font-black">Faith · Love</p>
              <p className="text-xs font-semibold uppercase tracking-widest">Excellence</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="A word of welcome" title="Every child is a gift from God." />
            <p className="mt-6 leading-relaxed text-muted-foreground">{director.message}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From Lower Primary to Junior School, we combine strong academics with spiritual nurture, creativity and
              practical skills — so learners leave us ready for life and for service.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display font-black text-primary-foreground">
                EM
              </div>
              <div>
                <p className="font-display font-extrabold text-primary">{director.name}</p>
                <p className="text-sm text-muted-foreground">{director.role}</p>
              </div>
            </div>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/about">
                Read our story <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Values */}
      <section className="bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Our values" title="What we stand on" center />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <div key={v.title} className="card-lift rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-sm font-black text-gold">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-black text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <Section>
        <SectionHeading
          eyebrow="Why Kilifi Angels"
          title="A school that feels like family"
          intro="Parents choose us for the warmth of our community and the strength of our teaching."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="card-lift flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                <r.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-black text-primary">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <VerseBanner />

      {/* Events + News */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Mark your calendar" title="Upcoming events" />
            <ul className="mt-8 space-y-3">
              {events.map((e) => (
                <li key={e.title} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-center leading-none text-primary-foreground">
                    <span>
                      <span className="block font-display text-xl font-black">{formatDate(e.date, { day: "numeric" })}</span>
                      <span className="block text-[0.65rem] font-semibold uppercase">{formatDate(e.date, { month: "short" })}</span>
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-extrabold text-primary">{e.title}</p>
                    <p className="text-sm text-muted-foreground">{e.place}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/news">
                <CalendarDays /> Full school calendar
              </Link>
            </Button>
          </div>
          <div>
            <SectionHeading eyebrow="From the school" title="Latest news" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {news.slice(0, 2).map((n) => (
                <article key={n.slug} className="card-lift overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                  <img src={photos[n.image]} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-leaf">{formatDate(n.date)}</p>
                    <h3 className="mt-2 text-lg font-black leading-snug text-primary">{n.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Voices of our family" title="What parents & learners say" center />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <Quote className="h-8 w-8 text-gold" />
                <blockquote className="mt-4 leading-relaxed text-foreground">{t.quote}</blockquote>
                <figcaption className="mt-5">
                  <p className="font-display font-extrabold text-primary">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
