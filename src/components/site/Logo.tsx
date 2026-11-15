import { cn } from "@/lib/utils";

/** School crest: shield with an open book, a cross and a dove wing. */
export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={cn("h-11 w-10", className)} aria-hidden="true">
      <path
        d="M24 2 L44 9 V26 C44 40 35 49 24 54 C13 49 4 40 4 26 V9 Z"
        className="fill-primary stroke-gold"
        strokeWidth="2.5"
      />
      <path d="M22 11 h4 v7 h6 v4 h-6 v8 h-4 v-8 h-6 v-4 h6 z" className="fill-gold" />
      <path
        d="M11 34 C16 32 20 33 24 36 C28 33 32 32 37 34 V44 C32 42 28 43 24 46 C20 43 16 42 11 44 Z"
        className="fill-cream"
      />
      <path d="M24 36 V46" className="stroke-primary" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <Crest className="shrink-0" />
      <span className="min-w-0 leading-tight">
        <span
          className={cn(
            "block truncate font-display text-lg font-black",
            light ? "text-primary-foreground" : "text-primary",
          )}
        >
          Kilifi Angels
        </span>
        <span
          className={cn(
            "block truncate text-[0.68rem] font-semibold uppercase tracking-[0.2em]",
            light ? "text-gold" : "text-leaf",
          )}
        >
          Junior School
        </span>
      </span>
    </span>
  );
}
