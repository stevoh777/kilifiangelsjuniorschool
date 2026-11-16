import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Field, inputClass } from "@/components/site/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a New Password — Kilifi Angels Junior School" },
      { name: "description", content: "Choose a new password for your Kilifi Angels portal account." },
      { property: "og:title", content: "Reset Portal Password" },
      { property: "og:description", content: "Set a new Kilifi Angels portal password." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) { toast.error("This reset link has expired. Request a new one from the login page."); return; }
    toast.success("Password updated.");
    navigate({ to: "/dashboard", replace: true });
  };
  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-black text-primary">Set a new password</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-5 rounded-[2rem] border border-border bg-card p-7">
        <Field label="New password (8+ characters)" htmlFor="pw">
          <Input id="pw" type="password" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} className={inputClass} autoComplete="new-password" />
        </Field>
        <Button type="submit" disabled={busy}>Save password</Button>
      </form>
    </section>
  );
}
