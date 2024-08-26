type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/models", label: "models" },
  { href: "/favorites", label: "favorites" },
  { href: "/patients", label: "patients" },
]