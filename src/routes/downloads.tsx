import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { toast } from "sonner";

import { PageHero, Section, SectionHeading } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/site";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — Kilifi Angels Junior School" },
      { name: "description", content: "Newsletters, fee structures, admission forms, term dates, uniform and book lists." },
      { property: "og:title", content: "Downloads — Kilifi Angels" },
      { property: "og:description", content: "Forms, fee structures, newsletters and lists for parents." },
    ],
  }),
  component: Downloads,
});

const docs = [
  { title: "Admission form", type: "PDF", group: "Admissions" },
  { title: "Medical form", type: "PDF", group: "Admissions" },
  { title: "Fee structure 2027", type: "PDF", group: "Fees" },
  { title: "Term dates 2027", type: "PDF", group: "Calendar" },
  { title: "Uniform list", type: "PDF", group: "Lists" },
  { title: "Book list — Grade 1 to 9", type: "PDF", group: "Lists" },
  { title: "Term 3 newsletter", type: "PDF", group: "Newsletters" },
];

function Downloads() {
  return (
    <>
      <PageHero eyebrow="Downloads" title="Documents for parents." image={photos.learnersSmiling} imagePosition="center 30%" />
      <Section>
        <SectionHeading eyebrow="Resources" title="Forms, lists & newsletters" />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {docs.map((d) => (
            <li key={d.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display font-extrabold text-primary">{d.title}</p>
                <p className="text-xs text-muted-foreground">{d.group} · {d.type}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.info("This document will be available soon.", { description: "Please contact the school office in the meantime." })}
              >
                Download
              </Button>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
