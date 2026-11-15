import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Target } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { VerseBanner } from "@/components/site/VerseBanner";
import { photos, school, values } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Kilifi Angels Junior School" },
      { name: "description", content: "Our history, vision, mission, values and Christian ethos at Kilifi Angels Junior School." },
      { property: "og:title", content: "About Kilifi Angels Junior School" },
      { property: "og:description", content: "Our story, vision, mission and Christ-centred ethos." },
    ],
  }),
  component: About,
});

const pillars = [
  { icon: Eye, title: "Our vision", text: "To be a centre of excellence raising God-fearing, competent and responsible citizens." },
  { icon: Target, title: "Our mission", text: "To nurture every learner holistically — spiritually, academically, socially and physically — through quality CBC education in a loving Christian environment." },
  { icon: Compass, title: "Our motto", text: `"${school.motto}"` },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Rooted in faith, growing in Kilifi."
        intro="A warm, God-centred community where every child is known, loved and helped to flourish."
        image={photos.friendsOnLawn}
        imagePosition="center 30%"
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our history" title="Small beginnings, a big calling" />
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Kilifi Angels Junior School began with a simple dream: to give children in Kilifi a school where strong learning and
                Christian values go hand in hand. What started with a handful of learners has grown into a thriving community from
                Grade 1 to Grade 9.
              </p>
              <p>
                Today we follow Kenya's Competency-Based Curriculum, with practical lessons, caring teachers and a green, safe campus
                where children learn, play and grow in faith together.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={photos.swingFriends} alt="Learners on the school swing" className="arch aspect-[3/4] w-full object-cover shadow-soft" loading="lazy" />
            <img src={photos.cookingClass} alt="Learners in a cooking practical" className="mt-10 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" loading="lazy" />
          </div>
        </div>
      </Section>

      <section className="bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-black text-primary">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Core values" title="The heart of Kilifi Angels" center />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
              <h3 className="text-lg font-black text-primary">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="rounded-[2rem] border border-gold/40 bg-gold-soft p-8 md:p-12">
          <p className="eyebrow">Statement of faith</p>
          <h2 className="mt-2 text-3xl font-black text-primary">Our Christian ethos</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-foreground/80">
            We believe in one God — Father, Son and Holy Spirit — and in the Bible as God's Word. We teach children to love God and
            their neighbour, to pray, to serve, and to live with honesty and kindness. Families of every background are warmly welcomed
            and respected in our community.
          </p>
        </div>
      </Section>

      <VerseBanner label="Our guiding verse" />
      <CtaBand />
    </>
  );
}
