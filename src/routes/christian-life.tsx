import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Church, HandHeart, Music, Sun, Users } from "lucide-react";

import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { VerseBanner } from "@/components/site/VerseBanner";
import { photos } from "@/lib/site";

export const Route = createFileRoute("/christian-life")({
  head: () => ({
    meta: [
      { title: "Christian Life — Kilifi Angels Junior School" },
      { name: "description", content: "Devotions, chapel, Christian Union, Bible study and character formation at Kilifi Angels." },
      { property: "og:title", content: "Christian Life at Kilifi Angels" },
      { property: "og:description", content: "Spiritual nurturing at the heart of our school day." },
    ],
  }),
  component: ChristianLife,
});

const items = [
  { icon: Sun, title: "Morning devotions", text: "Each day begins with prayer, scripture and worship as a school family." },
  { icon: Church, title: "Weekly chapel", text: "A chapel service with songs, a Bible message and learner-led prayers." },
  { icon: Users, title: "Christian Union", text: "Learners lead fellowship, Bible quizzes and outreach to the community." },
  { icon: BookOpen, title: "Bible study", text: "Age-appropriate study groups that build understanding and memory verses." },
  { icon: Music, title: "Praise & worship", text: "Choir, praise team and special services at Easter and Christmas." },
  { icon: HandHeart, title: "Character formation", text: "Mentorship, guidance and service projects that grow kindness and integrity." },
];

function ChristianLife() {
  return (
    <>
      <PageHero
        eyebrow="Spiritual nurturing"
        title="Growing in grace, every single day."
        intro="Faith is not a subject at Kilifi Angels — it is the heartbeat of our school."
        image={photos.swingFriends}
        imagePosition="center 40%"
      />
      <Section>
        <SectionHeading eyebrow="Christian life" title="How we nurture faith" center />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div key={i.title} className="card-lift rounded-3xl border border-border bg-card p-7 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-soft text-primary">
                <i.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-black text-primary">{i.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <VerseBanner label="Verse of the week" />
    </>
  );
}
