import { BookOpen } from "lucide-react";
import { school } from "@/lib/site";

export function VerseBanner({ label = "Verse of the week" }: { label?: string }) {
  return (
    <section className="bg-forest px-6 py-14 text-primary-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/20 text-gold">
          <BookOpen className="h-6 w-6" />
        </span>
        <p className="eyebrow text-gold">{label}</p>
        <blockquote className="font-serif text-2xl italic leading-snug md:text-3xl">"{school.verse.text}"</blockquote>
        <cite className="text-sm font-semibold not-italic tracking-wide text-primary-foreground/80">
          — {school.verse.ref}
        </cite>
      </div>
    </section>
  );
}
