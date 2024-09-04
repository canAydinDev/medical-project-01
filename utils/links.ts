type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "anasayfa" },
  { href: "/about", label: "Hakkimizda" },
  { href: "/models", label: "modeller" },
  { href: "/favorites", label: "favoriler" },
  { href: "/patients", label: "hastalar" },
  { href: "/admin/predictions", label: "dashboard" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/predictions", label: "predictions" },
  { href: "/admin/models", label: "modeller" },
  { href: "/admin/models/create", label: "model oluştur" },
];
