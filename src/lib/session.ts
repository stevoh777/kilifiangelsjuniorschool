import { queryOptions } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { isAppRole, type AppRole } from "./roles";

export type Me = {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  roles: AppRole[];
};

export const meQueryKey = ["me"] as const;

/** The signed-in person, their profile and roles — or null when signed out. */
export const meQuery = queryOptions({
  queryKey: meQueryKey,
  staleTime: 60_000,
  queryFn: async (): Promise<Me | null> => {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return null;
    const [{ data: profile }, { data: roleRows }] = await Promise.all([
      supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", user.id),
    ]);
    return {
      id: user.id,
      email: user.email ?? "",
      fullName: profile?.full_name || user.email || "",
      phone: profile?.phone ?? null,
      roles: (roleRows ?? []).map((r) => r.role).filter(isAppRole),
    };
  },
});
