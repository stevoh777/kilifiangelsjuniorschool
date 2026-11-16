import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Field, inputClass } from "@/components/site/FormField";
import { Crest } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { photos, school } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import { safeRedirect } from "@/lib/roles";
import { createFirstAdmin, getSetupStatus } from "@/lib/setup.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Portal Login — Kilifi Angels Junior School" },
      { name: "description", content: "Sign in to the Kilifi Angels portal as a teacher, learner, parent or administrator." },
      { property: "og:title", content: "Kilifi Angels Portal Login" },
      { property: "og:description", content: "Teachers, learners, parents and admin sign in here." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): { redirect?: string } =>
    typeof s["redirect"] === "string" ? { redirect: s["redirect"] } : {},
  component: Login,
});

function Login() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const setupStatus = useServerFn(getSetupStatus);
  const firstAdmin = useServerFn(createFirstAdmin);
  const { data: status } = useQuery({ queryKey: ["setup-status"], queryFn: () => setupStatus() });
  const [mode, setMode] = useState<"signin" | "forgot" | "setup">("signin");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password") ?? "");
    setBusy(true);
    try {
      if (mode === "forgot") {
        await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        toast.success("If that email has an account, a reset link is on its way.");
        setMode("signin");
        return;
      }
      if (mode === "setup") {
        await firstAdmin({ data: { fullName: String(f.get("fullName")), email, password } });
        qc.invalidateQueries({ queryKey: ["setup-status"] });
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error("Wrong email or password.");
      await qc.invalidateQueries();
      navigate({ to: safeRedirect(redirect), replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="grid min-h-[calc(100vh-8rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-primary-deep lg:block">
        <img src={photos.friendsOnLawn} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" style={{ objectPosition: "center 30%" }} />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative flex h-full flex-col justify-end p-12 text-primary-foreground">
          <p className="font-serif text-2xl italic leading-snug">"{school.verse.text}"</p>
          <p className="mt-3 text-sm font-semibold text-gold">— {school.verse.ref}</p>
        </div>
      </div>
      <div className="paper-texture flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center text-center">
            <Crest className="h-16 w-14" />
            <h1 className="mt-4 text-3xl font-black text-primary">{mode === "setup" ? "Set up the portal" : "Welcome back"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to the Kilifi Angels portal</p>
          </div>
          <form onSubmit={onSubmit} className="mt-8 grid gap-5 rounded-[2rem] border border-border bg-card p-7 shadow-lift">
            {mode === "setup" && (
              <Field label="Your full name" htmlFor="fullName">
                <Input id="fullName" name="fullName" required minLength={2} className={inputClass} />
              </Field>
            )}
            <Field label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" required className={inputClass} autoComplete="username" />
            </Field>
            {mode !== "forgot" && (
              <Field label={mode === "setup" ? "Choose a password (8+ characters)" : "Password"} htmlFor="password">
                <Input id="password" name="password" type="password" required minLength={mode === "setup" ? 8 : undefined} className={inputClass} autoComplete={mode === "setup" ? "new-password" : "current-password"} />
              </Field>
            )}
            <Button type="submit" size="lg" disabled={busy}>
              {busy ? "Please wait…" : mode === "forgot" ? "Send reset link" : mode === "setup" ? "Create admin account" : "Sign in"}
            </Button>
            <div className="grid gap-2 text-center text-xs text-muted-foreground">
              {mode === "signin" ? (
                <button type="button" onClick={() => setMode("forgot")} className="font-semibold text-primary hover:underline">Forgot your password?</button>
              ) : (
                <button type="button" onClick={() => setMode("signin")} className="font-semibold text-primary hover:underline">Back to sign in</button>
              )}
              {status?.needsSetup && mode !== "setup" && (
                <button type="button" onClick={() => setMode("setup")} className="font-semibold text-primary hover:underline">School director: create the first admin account</button>
              )}
              <p>Accounts are created by the school. <Link to="/contact" className="font-semibold text-primary hover:underline">Contact the office</Link></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
