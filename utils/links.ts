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
]