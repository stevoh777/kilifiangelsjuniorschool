import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, FileDown } from "lucide-react";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { Field, inputClass, selectClass } from "@/components/site/FormField";
import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { photos } from "@/lib/site";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Kilifi Angels Junior School" },
      { name: "description", content: "How to join Kilifi Angels Junior School: process, requirements, fees overview, FAQs and online application." },
      { property: "og:title", content: "Admissions at Kilifi Angels Junior School" },
      { property: "og:description", content: "Apply online for Grade 1 to Grade 9." },
    ],
  }),
  component: Admissions,
});

const steps = [
  { title: "Enquire or visit", text: "Call the office or book a tour to see our classrooms and grounds." },
  { title: "Apply", text: "Fill in the online application or collect a form from the school office." },
  { title: "Assessment & interview", text: "A friendly placement assessment and a chat with parents." },
  { title: "Admission & reporting", text: "Receive your admission letter, pay fees and report on the opening day." },
];

const requirements = [
  "Copy of the learner's birth certificate",
  "Two recent passport-size photos",
  "Previous school report / assessment record and leaving certificate (if transferring)",
  "Copy of parent / guardian national ID",
  "NEMIS / UPI number (if available)",
  "Immunisation card (for Grade 1)",
];

const fees = [
  { level: "Lower Primary (G1–3)", tuition: "Ksh —", note: "per term" },
  { level: "Upper Primary (G4–6)", tuition: "Ksh —", note: "per term" },
  { level: "Junior School (G7–9)", tuition: "Ksh —", note: "per term" },
];

const faqs = [
  { q: "Which grades do you admit?", a: "We admit learners from Grade 1 to Grade 9, subject to space in each class." },
  { q: "Do you admit learners mid-year?", a: "Yes. Transfers are welcome at any time of the year where space allows." },
  { q: "Do you accept learners of other faiths?", a: "Yes. We are a Christ-centred school and warmly welcome every family, respecting each child." },
  { q: "Is transport and lunch available?", a: "Yes, school transport and a nutritious lunch programme are available at an extra cost." },
  { q: "How can I pay fees?", a: "Fees can be paid by M-Pesa or bank. Online payment through the parent portal is coming soon." },
];

function Admissions() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Thank you! Your application has been received.", {
      description: "Our office will call you within 2 working days.",
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Join the Kilifi Angels family."
        intro="We are glad you are considering us for your child. Here is everything you need to get started."
        image={photos.learnersSmiling}
        imagePosition="center 30%"
      />

      <Section>
        <SectionHeading eyebrow="How to join" title="Admission process" center />
        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold font-display font-black text-primary-deep">{i + 1}</span>
              <h3 className="mt-4 text-lg font-black text-primary">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-2xl font-black text-primary">Requirements</h3>
            <ul className="mt-6 space-y-3">
              {requirements.map((r) => (
                <li key={r} className="flex gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf" /> {r}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/downloads">
                <FileDown /> Download forms
              </Link>
            </Button>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-2xl font-black text-primary">Fee structure overview</h3>
            <p className="mt-2 text-sm text-muted-foreground">Tuition per term. Transport, lunch, uniform and activity fees are charged separately.</p>
            <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border">
              {fees.map((f) => (
                <div key={f.level} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                  <span className="font-semibold">{f.level}</span>
                  <span className="text-muted-foreground">
                    <span className="font-display font-black text-primary">{f.tuition}</span> {f.note}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Contact the office for the full, current fee structure.</p>
          </div>
        </div>
      </section>

      <Section>
        <div id="apply" className="grid scroll-mt-28 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Apply online"
              title="Application form"
              intro="Fill in the details below and our admissions office will get in touch to arrange an assessment."
            />
            <div className="mt-10">
              <h3 className="text-xl font-black text-primary">Frequently asked questions</h3>
              <Accordion type="single" collapsible className="mt-4">
                {faqs.map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <form onSubmit={onSubmit} className="grid gap-5 rounded-[2rem] border border-border bg-card p-8 shadow-lift sm:grid-cols-2">
            <Field label="Learner's full name" htmlFor="learner">
              <Input id="learner" name="learner" required maxLength={100} className={inputClass} />
            </Field>
            <Field label="Date of birth" htmlFor="dob">
              <Input id="dob" name="dob" type="date" required className={inputClass} />
            </Field>
            <Field label="Grade applying for" htmlFor="grade">
              <select id="grade" name="grade" required className={selectClass} defaultValue="">
                <option value="" disabled>Select grade</option>
                {Array.from({ length: 9 }, (_, i) => (
                  <option key={i}>Grade {i + 1}</option>
                ))}
              </select>
            </Field>
            <Field label="Previous school" htmlFor="prev">
              <Input id="prev" name="prev" maxLength={120} className={inputClass} />
            </Field>
            <Field label="Parent / guardian name" htmlFor="parent">
              <Input id="parent" name="parent" required maxLength={100} className={inputClass} />
            </Field>
            <Field label="Phone number" htmlFor="phone">
              <Input id="phone" name="phone" type="tel" required pattern="[0-9+ ]{10,15}" placeholder="07XX XXX XXX" className={inputClass} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email (optional)" htmlFor="email">
                <Input id="email" name="email" type="email" maxLength={255} className={inputClass} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Anything we should know?" htmlFor="notes">
                <Textarea id="notes" name="notes" maxLength={1000} rows={4} className="rounded-xl bg-card" />
              </Field>
            </div>
            <Button type="submit" size="lg" className="sm:col-span-2">
              Submit application
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
}
