import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, UserRound } from "lucide-react";

import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { leaders, photos, telHref, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership & Staff — Kilifi Angels Junior School" },
      { name: "description", content: "Meet Esther Macharia, School Director, Eunice Macharia, Headteacher, and our teaching staff." },
      { property: "og:title", content: "Leadership at Kilifi Angels Junior School" },
      { property: "og:description", content: "Meet our School Director, Headteacher and teaching team." },
    ],
  }),
  component: Leadership,
});

const staff = [
  { name: "Lower Primary team", role: "Grades 1 – 3" },
  { name: "Upper Primary team", role: "Grades 4 – 6" },
  { name: "Junior School team", role: "Grades 7 – 9" },
  { name: "Chaplaincy & guidance", role: "Spiritual nurture" },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("");
}

function Leadership() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Servant leaders, caring for every child."
        image={photos.swingGarden}
        imagePosition="center 40%"
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          {leaders.map((l) => (
            <article key={l.name} className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
              <div className="grid gap-6 p-8 sm:grid-cols-[10rem_1fr]">
                {/* Photo slot: replace with the leader's portrait */}
                <div className="arch paper-texture grid aspect-[4/5] w-40 place-items-center bg-accent">
                  <span className="font-display text-4xl font-black text-primary">{initials(l.name)}</span>
                </div>
                <div className="min-w-0">
                  <p className="eyebrow">{l.role}</p>
                  <h2 className="mt-1 text-2xl font-black text-primary">{l.name}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">"{l.message}"</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <a href={telHref(l.phone)}>
                        <Phone /> {l.phone}
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a href={whatsappHref(l.phone)} target="_blank" rel="noreferrer">
                        <MessageCircle /> WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our teachers"
            title="A dedicated teaching staff"
            intro="Trained, TSC-registered teachers who love children and love the Lord."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((s) => (
              <div key={s.name} className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-accent text-primary">
                  <UserRound className="h-10 w-10" />
                </div>
                <h3 className="mt-4 font-black text-primary">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
