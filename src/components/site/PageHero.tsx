import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imagePosition = "center",
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  image?: string;
  imagePosition?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary-deep text-primary-foreground">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          style={{ objectPosition: imagePosition }}
        />
      )}
      <div className="hero-scrim absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="eyebrow animate-fade-up text-gold">{eyebrow}</p>
        <h1 className="animate-fade-up mt-3 max-w-2xl text-4xl font-black leading-tight md:text-5xl">{title}</h1>
        {intro && (
          <p className="animate-fade-up mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">{title}</h2>
      <div className={`gold-rule mt-4 ${center ? "mx-auto" : ""}`} />
      {intro && <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`px-6 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
