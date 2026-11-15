import { describe, expect, it } from "vitest";

import { newAccountSchema } from "@/lib/accounts.functions";
import { canManageAccounts, canViewAllAccounts, safeRedirect } from "@/lib/roles";

describe("school account rules", () => {
  it("only the admin can create accounts", () => {
    expect(canManageAccounts(["admin"])).toBe(true);
    expect(canManageAccounts(["headteacher"])).toBe(false);
    expect(canManageAccounts(["teacher", "parent"])).toBe(false);
  });

  it("admin and headteacher can see all accounts, teachers cannot", () => {
    expect(canViewAllAccounts(["headteacher"])).toBe(true);
    expect(canViewAllAccounts(["admin"])).toBe(true);
    expect(canViewAllAccounts(["teacher"])).toBe(false);
  });

  it("rejects passwords shorter than 8 characters", () => {
    const base = { fullName: "Jane Doe", email: "jane@example.com", role: "parent" as const };
    expect(newAccountSchema.safeParse({ ...base, password: "short12" }).success).toBe(false);
    expect(newAccountSchema.safeParse({ ...base, password: "longenough" }).success).toBe(true);
  });

  it("rejects unknown roles", () => {
    const r = newAccountSchema.safeParse({
      fullName: "Jane Doe", email: "jane@example.com", password: "longenough", role: "superuser",
    });
    expect(r.success).toBe(false);
  });

  it("never redirects off-site after sign-in", () => {
    expect(safeRedirect("//evil.com")).toBe("/dashboard");
    expect(safeRedirect("https://evil.com")).toBe("/dashboard");
    expect(safeRedirect("/admin/users")).toBe("/admin/users");
  });
});
