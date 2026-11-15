import { createFileRoute, Link } from "@tanstack/react-router";
import { BookUser, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Field, inputClass } from "@/components/site/FormField";
import { Crest } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { photos, school } from "@/lib/site";
import { cn } from "@/lib/utils";

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
  component: Login,
});

const roles = [
  { id: "parent", label: "Parent", icon: Users },
  { id: "learner", label: "Learner", icon: GraduationCap },
  { id: "teacher", label: "Teacher", icon: BookUser },
  { id: "admin", label: "Admin", icon: ShieldCheck },
];

function Login() {
  const [role, setRole] = useState("parent");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.info("The school portal is opening soon.", {
      description: "Dashboards for parents, learners, teachers and admin are being set up.",
    });
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
            <h1 className="mt-4 text-3xl font-black text-primary">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to the Kilifi Angels portal</p>
          </div>
          <form onSubmit={onSubmit} className="mt-8 grid gap-5 rounded-[2rem] border border-border bg-card p-7 shadow-lift">
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-primary">I am a…</legend>
              <div className="grid grid-cols-4 gap-2">
                {roles.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    aria-pressed={role === r.id}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-2xl border px-1 py-3 text-xs font-semibold transition-colors",
                      role === r.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary hover:bg-accent",
                    )}
                  >
                    <r.icon className="h-5 w-5" />
                    {r.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <Field label={role === "learner" ? "Admission number or email" : "Email or phone"} htmlFor="id">
              <Input id="id" required className={inputClass} autoComplete="username" />
            </Field>
            <Field label="Password" htmlFor="pw">
              <Input id="pw" type="password" required className={inputClass} autoComplete="current-password" />
            </Field>
            <Button type="submit" size="lg">Sign in</Button>
            <p className="text-center text-xs text-muted-foreground">
              Forgot your details? <Link to="/contact" className="font-semibold text-primary hover:underline">Contact the school office</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
