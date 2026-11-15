import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { photos, school } from "@/lib/site";
import { cn } from "@/lib/utils";

const slides = [
  { src: photos.swingGarden, position: "center 40%", caption: "Joyful learners in a safe, green campus" },
  { src: photos.friendsOnLawn, position: "center 30%", caption: "Friendships that grow every day" },
  { src: photos.cookingClass, position: "center 35%", caption: "Hands-on, competency-based learning" },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [index]);

  const go = (d: number) => setIndex((i) => (i + d + slides.length) % slides.length);

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-primary-deep text-primary-foreground">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <img
            src={s.src}
            alt={s.caption}
            className={cn("h-full w-full object-cover", i === index && "animate-kenburns")}
            style={{ objectPosition: s.position }}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        </div>
      ))}
      <div className="hero-scrim absolute inset-0" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:justify-center md:pb-24">
        <p className="eyebrow animate-fade-up text-gold">Karibu · Welcome to Kilifi Angels</p>
        <h1 className="animate-fade-up mt-4 max-w-2xl text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
          Nurturing hearts, minds and hands for Christ.
        </h1>
        <p className="animate-fade-up mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/85">
          A Christian-centred junior school in Kilifi, raising confident, curious and kind learners through Kenya's
          Competency-Based Curriculum.
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="gold">
            <Link to="/admissions" hash="apply">Apply Now</Link>
          </Button>
          <Button asChild size="lg" variant="cream">
            <Link to="/login">Parent / Learner Login</Link>
          </Button>
        </div>
        <p className="mt-10 font-serif text-sm italic text-gold">"{school.motto}"</p>

        <div className="absolute bottom-8 right-6 flex items-center gap-3">
          <span className="hidden text-xs text-primary-foreground/80 sm:inline">{slides[index]?.caption}</span>
          <button
            onClick={() => go(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur hover:bg-primary-foreground/20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur hover:bg-primary-foreground/20"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute bottom-10 left-6 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-gold" : "w-3 bg-primary-foreground/50",
              )}
              aria-label={`Show photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
