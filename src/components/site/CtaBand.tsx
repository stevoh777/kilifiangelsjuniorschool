import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="px-6 py-16">
      <div className="paper-texture mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-[2rem] border border-border bg-secondary p-10 shadow-soft md:flex-row md:items-center md:justify-between md:p-14">
        <div className="max-w-xl">
          <p className="eyebrow">Admissions open</p>
          <h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">Give your child a firm foundation.</h2>
          <p className="mt-3 text-muted-foreground">
            We welcome learners from Grade 1 to Grade 9. Visit us, meet our teachers and see the joy of learning at Kilifi Angels.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/admissions" hash="apply">Apply Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Book a visit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
