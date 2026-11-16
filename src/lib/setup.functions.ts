import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Public: has the school admin account been created yet? Reveals nothing else. */
export const getSetupStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count } = await supabaseAdmin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  return { needsSetup: (count ?? 0) === 0 };
});

const firstAdminSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(8).max(72),
});

/** Public, one-time: creates the first admin only while no admin exists. */
export const createFirstAdmin = createServerFn({ method: "POST" })
  .validator((input: z.input<typeof firstAdminSchema>) => firstAdminSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) throw new Error("The school admin account already exists. Please sign in.");
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.fullName },
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
