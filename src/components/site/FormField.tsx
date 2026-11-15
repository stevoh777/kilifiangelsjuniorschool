import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor} className="font-semibold text-primary">
        {label}
      </Label>
      {children}
    </div>
  );
}

export const selectClass =
  "h-11 w-full rounded-xl border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const inputClass = "h-11 rounded-xl bg-card";
