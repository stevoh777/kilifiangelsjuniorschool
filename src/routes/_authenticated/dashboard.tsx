import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Field, inputClass, selectClass } from "@/components/site/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { createSchoolAccount } from "@/lib/accounts.functions";
import { canManageAccounts, canViewAllAccounts, roleLabels, ROLES, type AppRole } from "@/lib/roles";
import { meQuery } from "@/lib/session";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Portal — Kilifi Angels Junior School" },
      { name: "description", content: "Your Kilifi Angels school portal." },
      { property: "og:title", content: "Kilifi Angels Portal" },
      { property: "og:description", content: "Portal for parents, learners, teachers and staff." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(meQuery),
  component: Dashboard,
});

const welcome: Record<AppRole, string> = {
  admin: "Manage school accounts and keep the portal running.",
  headteacher: "See every account in the school.",
  teacher: "Class tools, homework and notices are coming soon.",
  parent: "Your child's progress, fees and notices will appear here soon.",
  learner: "Homework, timetable and resources will appear here soon.",
};

function Dashboard() {
  const { data: me } = useSuspenseQuery(meQuery);
  if (!me) return null;
  const roles = me.roles;
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <p className="eyebrow">My portal</p>
      <h1 className="mt-2 text-3xl font-black text-primary">Karibu, {me.fullName}</h1>
      <p className="mt-1 text-muted-foreground">
        {roles.length ? roles.map((r) => roleLabels[r]).join(" · ") : "No role assigned yet — please contact the school office."}
      </p>
      <div className="mt-6 grid gap-3">
        {roles.map((r) => (
          <div key={r} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-primary">{roleLabels[r]}</p>
            <p className="text-sm text-muted-foreground">{welcome[r]}</p>
          </div>
        ))}
      </div>
      {canManageAccounts(roles) && <NewAccountForm />}
      {canViewAllAccounts(roles) && <AccountList />}
    </section>
  );
}

function NewAccountForm() {
  const create = useServerFn(createSchoolAccount);
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    try {
      await create({
        data: {
          fullName: String(f.get("fullName")),
          email: String(f.get("email")),
          phone: String(f.get("phone") ?? ""),
          password: String(f.get("password")),
          role: String(f.get("role")) as AppRole,
        },
      });
      toast.success("Account created. Share the email and password with the person.");
      form.reset();
      qc.invalidateQueries({ queryKey: ["accounts"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create the account.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="mt-10 grid gap-4 rounded-[2rem] border border-border bg-card p-7 sm:grid-cols-2">
      <h2 className="text-xl font-black text-primary sm:col-span-2">Add a school account</h2>
      <Field label="Full name" htmlFor="fullName"><Input id="fullName" name="fullName" required className={inputClass} /></Field>
      <Field label="Email" htmlFor="email"><Input id="email" name="email" type="email" required className={inputClass} /></Field>
      <Field label="Phone" htmlFor="phone"><Input id="phone" name="phone" className={inputClass} /></Field>
      <Field label="Role" htmlFor="role">
        <select id="role" name="role" className={selectClass} defaultValue="parent">
          {ROLES.map((r) => <option key={r} value={r}>{roleLabels[r]}</option>)}
        </select>
      </Field>
      <Field label="Starting password (8+ characters)" htmlFor="password">
        <Input id="password" name="password" type="text" minLength={8} required className={inputClass} />
      </Field>
      <div className="flex items-end"><Button type="submit" disabled={busy}>{busy ? "Creating…" : "Create account"}</Button></div>
    </form>
  );
}

function AccountList() {
  const { data } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const [{ data: profiles }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("id, full_name, email, phone").order("created_at"),
        supabase.from("user_roles").select("user_id, role"),
      ]);
      return (profiles ?? []).map((p) => ({
        ...p,
        roles: (roles ?? []).filter((r) => r.user_id === p.id).map((r) => roleLabels[r.role as AppRole]),
      }));
    },
  });
  return (
    <div className="mt-10 rounded-[2rem] border border-border bg-card p-7">
      <h2 className="text-xl font-black text-primary">School accounts</h2>
      <ul className="mt-4 divide-y divide-border">
        {(data ?? []).map((a) => (
          <li key={a.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
            <span><span className="font-semibold">{a.full_name || a.email}</span> <span className="text-muted-foreground">{a.email}</span></span>
            <span className="text-primary">{a.roles.join(", ") || "No role"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
