export type Role = "daemons" | "andrei" | "network-admins";

export function getActiveRole(roles: string[]): Role {
  if (roles.includes("andrei")) return "andrei";
  if (roles.includes("daemons")) return "daemons";
  return "network-admins";
}

export function hasAccess(roles: string[], allowed: Role[]): boolean {
  return allowed.some(r => roles.includes(r));
}
