export enum Roles {
  Admin = "Admin",
  Doctor = "Doctor",
  Patient = "Patient",
  Pharmacy = "Pharmacy",
  Finance = "Finance",
  Room_mgmt = "Room_mgmt",
}

export const UserRoleMap: Record<string, Roles> = {
  admin: Roles.Admin,
  doctor: Roles.Doctor,
  patient: Roles.Patient,
  pharmacy: Roles.Pharmacy,
  finance: Roles.Finance,
  room_mgmt: Roles.Room_mgmt,
};

export const Permissions: Record<Roles, string[]> = {
  [Roles.Admin]: ["view_dashboard", "manage_users", "view_reports"],
  [Roles.Doctor]: ["view_dashboard", "view_patients", "manage_appointments"],
  [Roles.Patient]: ["view_dashboard", "view_appointments"],
  [Roles.Pharmacy]: ["view_dashboard", "view_appointments"],
  [Roles.Finance]: ["view_dashboard", "view_appointments"],
  [Roles.Room_mgmt]: ["view_dashboard", "view_appointments"],
};
