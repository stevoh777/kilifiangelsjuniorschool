import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { PageHero, Section } from "@/components/site/PageHero";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { photos } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Kilifi Angels Junior School" },
      { name: "description", content: "Photos of learners, activities, grounds and trips at Kilifi Angels Junior School." },
      { property: "og:title", content: "Photo Gallery — Kilifi Angels" },
      { property: "og:description", content: "Moments of joy, learning and friendship." },
    ],
  }),
  component: Gallery,
});

const items = [
  { src: photos.learnersSmiling, caption: "Friends forever", cat: "Learners", tall: true },
  { src: photos.cookingClass, caption: "Home science practical", cat: "Activities", tall: true },
  { src: photos.friendsOnLawn, caption: "Games afternoon on the lawn", cat: "Learners", tall: false },
  { src: photos.swingGarden, caption: "Our garden swings", cat: "Grounds", tall: false },
  { src: photos.swingFriends, caption: "Break time in the shade", cat: "Grounds", tall: false },
  { src: photos.schoolTrip, caption: "Nature reserve field trip", cat: "Trips", tall: true },
];
const cats = ["All", "Learners", "Activities", "Grounds", "Trips"];

function Gallery() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = items.filter((i) => cat === "All" || i.cat === cat);
  const current = open === null ? null : shown[open];

  return (
    <>
      <PageHero eyebrow="Gallery" title="Moments of joy and learning." image={photos.friendsOnLawn} imagePosition="center 30%" />
      <Section>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter photos">
          {cats.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {shown.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setOpen(i)}
              className="group relative mb-5 block w-full overflow-hidden rounded-3xl shadow-soft"
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className={cn("w-full object-cover transition-transform duration-500 group-hover:scale-105", p.tall ? "aspect-[3/4]" : "aspect-[4/3]")}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-deep/85 to-transparent p-4 text-left text-sm font-semibold text-primary-foreground">
                {p.caption}
                <span className="block text-xs font-medium text-gold">{p.cat}</span>
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Dialog open={current !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl border-none bg-primary-deep p-2 sm:rounded-3xl">
          <DialogTitle className="sr-only">{current?.caption}</DialogTitle>
          {current && (
            <div className="relative">
              <img src={current.src} alt={current.caption} className="max-h-[80vh] w-full rounded-2xl object-contain" />
              <p className="p-3 text-center text-sm font-semibold text-primary-foreground">{current.caption}</p>
              {(["prev", "next"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setOpen((o) => o === null ? o : (o + (dir === "next" ? 1 : -1) + shown.length) % shown.length)}
                  className={cn(
                    "absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-primary-foreground/20 text-primary-foreground backdrop-blur hover:bg-primary-foreground/30",
                    dir === "prev" ? "left-3" : "right-3",
                  )}
                  aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
                >
                  {dir === "prev" ? <ChevronLeft /> : <ChevronRight />}
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
