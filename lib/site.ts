export const site = {
  name: "Hatem Rabea",
  role: "Senior Full-Stack Developer",
  email: "xavio1115@gmail.com",
  phoneDisplay: "+20 110 198 0053",
  whatsapp: "https://wa.me/201101980053",
  linkedin: "https://www.linkedin.com/in/hatimrabea",
  linkedinHandle: "in/hatimrabea",
  github: "https://github.com/HatemRabeaHamde",
  githubHandle: "HatemRabeaHamde",
  /** Drop the CV file into /public with this name. */
  cv: "/Hatem-Rabea-CV.pdf",
  location: "Cairo, EG",
  year: 2026,
  /** Credit for the portfolio's design, shown in every footer. */
  designer: {
    name: "Senior Hager",
    linkedin: "https://www.linkedin.com/in/hager-tarek-7003b73a6/",
  },
};

export const navLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Projects", href: "/work", id: "projects" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Contact", href: "/contact", id: "contact" },
] as const;

export const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "WhatsApp", href: site.whatsapp },
];
