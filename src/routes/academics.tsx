import { createFileRoute } from "@tanstack/react-router";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { photos } from "@/lib/site";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics (CBC) — Kilifi Angels Junior School" },
      { name: "description", content: "Lower Primary, Upper Primary and Junior School learning areas, competencies and CBC assessment at Kilifi Angels." },
      { property: "og:title", content: "CBC Academics at Kilifi Angels" },
      { property: "og:description", content: "Learning areas, core competencies and assessment from Grade 1 to 9." },
    ],
  }),
  component: Academics,
});

const levels = [
  {
    id: "lower",
    label: "Lower Primary",
    grades: "Grade 1 – 3",
    areas: [
      "Literacy Activities", "Kiswahili Language Activities", "English Language Activities", "Mathematical Activities",
      "Environmental Activities", "Hygiene and Nutrition Activities", "Christian Religious Education", "Movement and Creative Activities",
    ],
  },
  {
    id: "upper",
    label: "Upper Primary",
    grades: "Grade 4 – 6",
    areas: [
      "English", "Kiswahili", "Mathematics", "Science and Technology", "Agriculture and Nutrition", "Social Studies",
      "Christian Religious Education", "Creative Arts", "Physical and Health Education",
    ],
  },
  {
    id: "junior",
    label: "Junior School",
    grades: "Grade 7 – 9",
    areas: [
      "English", "Kiswahili", "Mathematics", "Integrated Science", "Health Education", "Pre-Technical and Pre-Career Education",
      "Social Studies", "Christian Religious Education", "Business Studies", "Agriculture", "Life Skills",
      "Sports and Physical Education", "Creative Arts",
    ],
  },
];

const competencies = [
  "Communication & collaboration", "Critical thinking & problem solving", "Creativity & imagination", "Citizenship",
  "Digital literacy", "Learning to learn", "Self-efficacy",
];
const cbcValues = ["Love", "Responsibility", "Respect", "Unity", "Peace", "Patriotism", "Social justice", "Integrity"];
const pcis = ["Life skills", "Health education", "Environmental education", "Citizenship", "Financial literacy", "Safety & security"];

const levelsKey = [
  { code: "EE", name: "Exceeding Expectation", tone: "bg-primary text-primary-foreground" },
  { code: "ME", name: "Meeting Expectation", tone: "bg-leaf text-primary-foreground" },
  { code: "AE", name: "Approaching Expectation", tone: "bg-gold text-primary-deep" },
  { code: "BE", name: "Below Expectation", tone: "bg-cream-deep text-primary-deep" },
];

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span key={i} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
          {i}
        </span>
      ))}
    </div>
  );
}

function Academics() {
  return (
    <>
      <PageHero
        eyebrow="Academics · CBC"
        title="Learning by doing, growing in competence."
        intro="We follow Kenya's Competency-Based Curriculum, helping every learner discover and build their gifts."
        image={photos.cookingClass}
        imagePosition="center 35%"
      />

      <Section>
        <SectionHeading eyebrow="Learning areas" title="From Grade 1 to Grade 9" />
        <Tabs defaultValue="lower" className="mt-10">
          <TabsList className="h-auto flex-wrap rounded-full bg-secondary p-1.5">
            {levels.map((l) => (
              <TabsTrigger key={l.id} value={l.id} className="rounded-full px-5 py-2 font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {l.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {levels.map((l) => (
            <TabsContent key={l.id} value={l.id} className="mt-6">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <p className="eyebrow">{l.grades}</p>
                <h3 className="mt-1 text-2xl font-black text-primary">{l.label}</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {l.areas.map((a) => (
                    <li key={a} className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3 text-sm font-medium">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-gold" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      <section className="bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-black text-primary">Core competencies</h3>
            <div className="gold-rule my-4" />
            <Chips items={competencies} />
          </div>
          <div>
            <h3 className="text-xl font-black text-primary">Values</h3>
            <div className="gold-rule my-4" />
            <Chips items={cbcValues} />
          </div>
          <div>
            <h3 className="text-xl font-black text-primary">Pertinent & contemporary issues</h3>
            <div className="gold-rule my-4" />
            <Chips items={pcis} />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Assessment"
            title="How we measure growth"
            intro="Learners are assessed continuously through class activities, projects and observation (formative), and at mid-term and end-term (summative). Results are reported using the four CBC performance levels."
          />
          <div className="grid gap-3">
            {levelsKey.map((l) => (
              <div key={l.code} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display font-black ${l.tone}`}>{l.code}</span>
                <span className="font-semibold">{l.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
