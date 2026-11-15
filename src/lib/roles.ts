/** School roles. Keep in sync with the app_role list in the database. */
export const ROLES = ["admin", "headteacher", "teacher", "parent", "learner"] as const;
export type AppRole = (typeof ROLES)[number];

export const roleLabels: Record<AppRole, string> = {
  admin: "Director / Admin",
  headteacher: "Headteacher",
  teacher: "Teacher",
  parent: "Parent",
  learner: "Learner",
};

/** Only the school admin may create accounts and assign roles. */
export function canManageAccounts(roles: readonly string[]): boolean {
  return roles.includes("admin");
}

/** Admin and headteacher can see every account in the school. */
export function canViewAllAccounts(roles: readonly string[]): boolean {
  return roles.includes("admin") || roles.includes("headteacher");
}

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/** Only allow redirects back to a path on this site. */
export function safeRedirect(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return "/dashboard";
  return value;
}
