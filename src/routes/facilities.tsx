import { createFileRoute } from "@tanstack/react-router";
import { Bus, ChefHat, Library, Monitor, School, TreePine } from "lucide-react";

import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { photos } from "@/lib/site";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — Kilifi Angels Junior School" },
      { name: "description", content: "Classrooms, library, ICT, playground, gardens, kitchen and transport at Kilifi Angels." },
      { property: "og:title", content: "Our Campus & Facilities" },
      { property: "og:description", content: "A green, safe and well-equipped campus in Kilifi." },
    ],
  }),
  component: Facilities,
});

const facilities = [
  { icon: School, title: "Bright classrooms", text: "Spacious, airy rooms set up for group and practical CBC work.", image: photos.learnersSmiling, pos: "center 30%" },
  { icon: TreePine, title: "Playground & gardens", text: "Shaded lawns, swings and play equipment for safe outdoor fun.", image: photos.swingGarden, pos: "center 45%" },
  { icon: ChefHat, title: "Home science area", text: "A practical space for cooking, nutrition and life-skills lessons.", image: photos.cookingClass, pos: "center 35%" },
];
const extras = [
  { icon: Library, title: "Library", text: "Story books, readers and reference books for every level." },
  { icon: Monitor, title: "ICT", text: "Digital devices supporting the CBC digital literacy competency." },
  { icon: Bus, title: "Transport", text: "Safe school transport covering routes around Kilifi." },
];

function Facilities() {
  return (
    <>
      <PageHero eyebrow="Our campus" title="A green, safe place to grow." image={photos.swingGarden} imagePosition="center 40%" />
      <Section>
        <SectionHeading eyebrow="Facilities" title="Spaces made for learning" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {facilities.map((f) => (
            <article key={f.title} className="card-lift overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <img src={f.image} alt={f.title} className="aspect-[4/3] w-full object-cover" style={{ objectPosition: f.pos }} loading="lazy" />
              <div className="p-6">
                <f.icon className="h-6 w-6 text-leaf" />
                <h3 className="mt-3 text-xl font-black text-primary">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {extras.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-3xl border border-border bg-secondary p-6">
              <f.icon className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-black text-primary">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
