export interface Client {
  id?: string;
  name: string;
  category: string;
  colorSrc: string;
  monoSrc?: string;
  alt?: string;
  url?: string;
}

export interface Partner {
  id?: string;
  name: string;
  logo: string;
  tag: string;
  type: string;
  url?: string;
}

export const DEFAULT_CLIENTS: Client[] = [
  {
    name: "ECCO",
    category: "Global Footwear",
    monoSrc: "/images/clients/ecco.png",
    colorSrc: "/images/clients/ecco-orig.png",
    alt: "ECCO Armenia IT Partner",
    url: "https://ecco.am/",
  },
  {
    name: "Karas",
    category: "Winery & Export",
    monoSrc: "/images/clients/karas.png",
    colorSrc: "/images/clients/karas-orig.png",
    alt: "Karas IT Infrastructure",
    url: "https://karas.am/",
  },
  {
    name: "Dargett",
    category: "Craft Brewery & Hospitality",
    monoSrc: "/images/clients/dargett.png",
    colorSrc: "/images/clients/dargett-orig.jpg",
    alt: "Dargett Craft Brewery",
    url: "https://dargett.com/",
  },
  {
    name: "Coffee Shop Company",
    category: "Café Chain",
    monoSrc: "/images/clients/coffee-shop.png",
    colorSrc: "/images/clients/coffee-shop-orig.png",
    alt: "Coffee Shop Company Armenia",
    url: "https://coffeeshopcompany.am/",
  },
  {
    name: "Rouge",
    category: "Luxury Cosmetics",
    monoSrc: "/images/clients/rouge.png",
    colorSrc: "/images/clients/rouge-orig.png",
    alt: "Rouge Perfumery & Cosmetics",
    url: "https://rouge.am/",
  },
  {
    name: "Guess",
    category: "Fashion Retail",
    monoSrc: "/images/clients/guess.png",
    colorSrc: "/images/clients/guess-orig.jpg",
    alt: "Guess Armenia Retail IT",
    url: "https://www.guess.eu/",
  },
  {
    name: "Syrovarnya",
    category: "Restaurant Group",
    monoSrc: "/images/clients/sirovarnya.png",
    colorSrc: "/images/clients/sirovarnya-orig.jpeg",
    alt: "Syrovarnya Restaurant Yerevan",
    url: "https://syrovarnya.com/",
  },
  {
    name: "Rare Water",
    category: "Beverage Production",
    monoSrc: "/images/clients/rare-water.png",
    colorSrc: "/images/clients/rare-water-orig.png",
    alt: "Rare Water Armenia",
    url: "https://rare-water.com/",
  },
  {
    name: "Cube Invest",
    category: "Investment & Financial",
    monoSrc: "/images/clients/cub.png",
    colorSrc: "/images/clients/cub-orig.svg",
    alt: "Cube Invest",
    url: "https://cubeinvest.am/",
  },
  {
    name: "Parvanyan Consulting",
    category: "Advisory & Audit",
    monoSrc: "/images/clients/parvanyan.png",
    colorSrc: "/images/clients/parvanyan-orig.png",
    alt: "Parvanyan Consulting",
    url: "https://pconsult.am/",
  },
  {
    name: "Yasaman",
    category: "Hospitality & Cuisine",
    monoSrc: "/images/clients/yasaman.png",
    colorSrc: "/images/clients/yasaman-orig.png",
    alt: "Yasaman Restaurant Yerevan",
    url: "https://yasaman.am/",
  },
  {
    name: "Council of Europe",
    category: "International Organization",
    monoSrc: "/images/clients/coe.png",
    colorSrc: "/images/clients/coe-orig.svg",
    alt: "Council of Europe (COE)",
    url: "https://www.coe.int/",
  },
];

export const DEFAULT_PARTNERS: Partner[] = [
  {
    name: "Microsoft",
    logo: "/images/partners/microsoft-orig.png",
    tag: "Cloud, Azure & Microsoft 365",
    type: "Global Vendor",
    url: "https://www.microsoft.com/",
  },
  {
    name: "Bitdefender",
    logo: "/images/partners/bitdefender-orig.webp",
    tag: "Endpoint & EDR Security",
    type: "Global Vendor",
    url: "https://www.bitdefender.com/",
  },
  {
    name: "Kaspersky",
    logo: "/images/partners/kaspersky-orig.png",
    tag: "Cybersecurity & Antivirus",
    type: "Global Vendor",
    url: "https://www.kaspersky.com/",
  },
  {
    name: "MUK Group",
    logo: "/images/partners/muk-orig.png",
    tag: "Cisco, Dell & Fortinet VAD",
    type: "Premier Distributor",
    url: "https://muk.group/am/country/am/",
  },
  {
    name: "Mont Tech",
    logo: "/images/partners/mont-orig.png",
    tag: "Software & Cloud Solutions",
    type: "VAD Distributor",
    url: "https://monttech.am/hy-am",
  },
  {
    name: "Axoft Global",
    logo: "/images/partners/axoft-orig.png",
    tag: "Security & Infrastructure",
    type: "Global Distributor",
    url: "https://axoftglobal.com/ru-am/",
  },
  {
    name: "DG Comp",
    logo: "/images/partners/dgcomp-orig.png",
    tag: "Enterprise IT Hardware",
    type: "Authorized Distributor",
    url: "https://dgcomp.am/",
  },
  {
    name: "X-Art",
    logo: "/images/partners/xart-orig.png",
    tag: "Apple & IT Hardware",
    type: "Authorized Distributor",
    url: "https://x-art.am/",
  },
  {
    name: "Scan City",
    logo: "/images/partners/scancity-orig.png",
    tag: "Auto-ID & POS Systems",
    type: "Authorized Distributor",
    url: "https://scancity.am/",
  },
  {
    name: "GSC",
    logo: "/images/partners/gsc-orig.png",
    tag: "Security & CCTV Systems",
    type: "Security Partner",
    url: "https://www.gsc.am/",
  },
];