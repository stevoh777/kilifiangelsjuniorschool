import { createFileRoute } from "@tanstack/react-router";
import { Drama, Footprints, Leaf, Music2, Trophy, Tent } from "lucide-react";

import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { photos } from "@/lib/site";

export const Route = createFileRoute("/co-curricular")({
  head: () => ({
    meta: [
      { title: "Co-curricular Activities — Kilifi Angels Junior School" },
      { name: "description", content: "Clubs, sports, music, drama, scouting and trips that grow talents at Kilifi Angels." },
      { property: "og:title", content: "Clubs & Activities at Kilifi Angels" },
      { property: "og:description", content: "Sports, music, drama, scouting and more." },
    ],
  }),
  component: CoCurricular,
});

const activities = [
  { icon: Trophy, title: "Sports", text: "Football, netball, athletics and ball games every week." },
  { icon: Music2, title: "Music & choir", text: "Singing, instruments and music festivals." },
  { icon: Drama, title: "Drama & poetry", text: "Plays, recitations and drama festivals." },
  { icon: Tent, title: "Scouts & Brownies", text: "Leadership, service and outdoor skills." },
  { icon: Leaf, title: "Environmental club", text: "Tree planting, gardening and caring for creation." },
  { icon: Footprints, title: "Trips & excursions", text: "Field trips that bring learning to life." },
];

function CoCurricular() {
  return (
    <>
      <PageHero
        eyebrow="Beyond the classroom"
        title="Discover your gifts, share your joy."
        image={photos.friendsOnLawn}
        imagePosition="center 30%"
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="Clubs & activities" title="Something for every learner" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {activities.map((a) => (
                <div key={a.title} className="card-lift flex gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-black text-primary">{a.title}</h3>
                    <p className="text-sm text-muted-foreground">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 self-start">
            <img src={photos.schoolTrip} alt="Learners on a school trip" className="arch col-span-1 aspect-[3/5] w-full object-cover shadow-soft" loading="lazy" />
            <img src={photos.cookingClass} alt="Cooking practical" className="mt-12 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" loading="lazy" />
          </div>
        </div>
      </Section>
    </>
  );
}
