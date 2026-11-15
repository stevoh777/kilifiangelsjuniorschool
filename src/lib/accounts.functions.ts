import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ROLES } from "./roles";

export const newAccountSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the full name").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[0-9+ ]*$/, "Phone can only contain numbers, spaces and +")
    .optional()
    .default(""),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
  role: z.enum(ROLES),
});

export type NewAccount = z.input<typeof newAccountSchema>;

/** Admin-only: create a ready-to-use school account with a role. */
export const createSchoolAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: NewAccount) => newAccountSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Only the school admin can create accounts.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.fullName, phone: data.phone || null },
    });
    if (error || !created.user) {
      const msg = error?.message ?? "Could not create the account.";
      throw new Error(/already/i.test(msg) ? "An account with this email already exists." : msg);
    }

    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: data.role });
    if (insertError) throw new Error("Account created, but the role could not be saved. Try again.");

    return { id: created.user.id };
  });
