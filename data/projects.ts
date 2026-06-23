export type ProjectStatus = "perfunduar" | "ne-vazhdim";

export type Project = {
  slug: string;
  title: string;
  /** Short descriptor under the title. */
  subtitle?: string;
  status: ProjectStatus;
  /** Cover photo under /public/projektet/<slug>/cover.jpg */
  image: string;
};

const img = (slug: string) => `/projektet/${slug}/cover.jpg`;

// Real installations by Ntsh Beli, by client.
// status: "perfunduar" = finished, "ne-vazhdim" = ongoing.
export const projects: Project[] = [
  {
    slug: "niti-construction",
    title: "Niti Construction",
    subtitle: "Instalim elektrik",
    status: "ne-vazhdim",
    image: img("niti-construction"),
  },
  {
    slug: "cima-construction",
    title: "Cima Construction",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("cima-construction"),
  },
  {
    slug: "ink",
    title: "Ink",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("ink"),
  },
  {
    slug: "lirimi-residence",
    title: "Lirimi Residence",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("lirimi-residence"),
  },
  {
    slug: "rexos-group",
    title: "Rexos Group",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("rexos-group"),
  },
  {
    slug: "kastrati-comerc",
    title: "Kastrati Comerc",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("kastrati-comerc"),
  },
  {
    slug: "miri-arkos",
    title: "Miri Arkos",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("miri-arkos"),
  },
  {
    slug: "miri-fanaj",
    title: "Miri & Fanaj",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("miri-fanaj"),
  },
  {
    slug: "agullimi",
    title: "Agullimi",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("agullimi"),
  },
  {
    slug: "lanti",
    title: "Lanti",
    subtitle: "Instalim elektrik",
    status: "perfunduar",
    image: img("lanti"),
  },
];
