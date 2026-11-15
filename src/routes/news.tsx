import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";

import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { events, formatDate, news, photos, termDates } from "@/lib/site";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Kilifi Angels Junior School" },
      { name: "description", content: "School news, upcoming events and term dates at Kilifi Angels Junior School." },
      { property: "og:title", content: "News & Events at Kilifi Angels" },
      { property: "og:description", content: "Stories from school, upcoming events and the term calendar." },
    ],
  }),
  component: News,
});

function News() {
  const lead = news[0]!;
  const rest = news.slice(1);
  return (
    <>
      <PageHero eyebrow="News & events" title="What's happening at Kilifi Angels." image={photos.schoolTrip} imagePosition="center 30%" />

      <Section>
        <SectionHeading eyebrow="Latest stories" title="School news" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="card-lift overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
            <img src={photos[lead.image]} alt="" className="aspect-[16/10] w-full object-cover" />
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-leaf">{formatDate(lead.date)}</p>
              <h3 className="mt-2 text-2xl font-black text-primary">{lead.title}</h3>
              <p className="mt-3 text-muted-foreground">{lead.excerpt}</p>
            </div>
          </article>
          <div className="grid gap-6">
            {rest.map((n) => (
              <article key={n.slug} className="card-lift grid grid-cols-[8rem_1fr] overflow-hidden rounded-3xl border border-border bg-card shadow-soft sm:grid-cols-[11rem_1fr]">
                <img src={photos[n.image]} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="min-w-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-leaf">{formatDate(n.date)}</p>
                  <h3 className="mt-1 font-black leading-snug text-primary">{n.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Upcoming" title="Events" />
            <ul className="mt-8 space-y-3">
              {events.map((e) => (
                <li key={e.title} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <CalendarDays className="h-6 w-6 shrink-0 text-leaf" />
                  <div className="min-w-0">
                    <p className="font-display font-extrabold text-primary">{e.title}</p>
                    <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                      <span>{formatDate(e.date, { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {e.place}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="School calendar" title="Term dates 2027" />
            <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Term</th>
                    <th className="px-5 py-3 font-semibold">Opens</th>
                    <th className="px-5 py-3 font-semibold">Half term</th>
                    <th className="px-5 py-3 font-semibold">Closes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {termDates.map((t) => (
                    <tr key={t.term}>
                      <td className="px-5 py-3 font-semibold text-primary">{t.term}</td>
                      <td className="px-5 py-3">{t.opens}</td>
                      <td className="px-5 py-3">{t.halfTerm}</td>
                      <td className="px-5 py-3">{t.closes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Dates follow the Ministry of Education calendar and may change.</p>
          </div>
        </div>
      </section>
    </>
  );
}
