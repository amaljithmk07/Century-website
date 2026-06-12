import {
  Building2,
  Users,
  Snowflake,
  Car,
  UtensilsCrossed,
  Mic2,
  Speaker,
  Zap,
  Sparkles,
  Heart,
  Briefcase,
  Presentation,
  GraduationCap,
  LayoutGrid,
  PartyPopper,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export interface Facility {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: "events" | "venue" | "facilities";
  width: number;
  height: number;
}

export const services: Service[] = [
  {
    slug: "weddings",
    title: "Weddings",
    description:
      "Create the wedding of your dreams in our elegantly appointed halls with bespoke décor and impeccable service.",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    slug: "receptions",
    title: "Receptions",
    description:
      "Celebrate your special day with grand receptions featuring spacious layouts and premium dining arrangements.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    description:
      "Host impactful corporate gatherings with professional ambiance and state-of-the-art facilities.",
    icon: Briefcase,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    slug: "conferences",
    title: "Conferences",
    description:
      "Conduct seamless conferences with advanced AV systems, comfortable seating, and dedicated support staff.",
    icon: Presentation,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
  },
  {
    slug: "seminars",
    title: "Seminars",
    description:
      "Ideal venue for educational seminars and workshops with flexible seating and presentation capabilities.",
    icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f39d4666?w=800&q=80",
  },
  {
    slug: "exhibitions",
    title: "Exhibitions",
    description:
      "Showcase products and innovations in our expansive halls with excellent visibility and foot traffic flow.",
    icon: LayoutGrid,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f39d4666?w=800&q=80",
  },
  {
    slug: "social-gatherings",
    title: "Social Gatherings",
    description:
      "From birthday celebrations to anniversaries, create memorable moments in a luxurious setting.",
    icon: PartyPopper,
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  },
  {
    slug: "community-events",
    title: "Community Events",
    description:
      "Bring communities together for cultural programs, fundraisers, and local celebrations.",
    icon: Handshake,
    image:
      "https://images.unsplash.com/photo-1523580495183-7a0f5a4c1acf?w=800&q=80",
  },
];

export const facilities: Facility[] = [
  {
    title: "Grand Convention Hall",
    description:
      "A magnificent hall with soaring ceilings, elegant interiors, and versatile layouts designed for weddings, receptions, and large-scale events.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
  },
  {
    title: "Seating Capacity",
    description:
      "Flexible seating arrangements accommodating up to 1,500 guests with banquet, theater, and conference-style configurations.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
  },
  {
    title: "Air-Conditioned Venue",
    description:
      "Fully climate-controlled halls ensuring exceptional comfort for guests throughout the year.",
    icon: Snowflake,
    image:
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  },
  {
    title: "Spacious Parking",
    description:
      "Ample parking facilities with easy vehicle access and dedicated areas for guests and event organizers.",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&q=80",
  },
  {
    title: "Dining Facilities",
    description:
      "Premium catering support with elegant buffet setups, live counters, and multi-cuisine dining experiences.",
    icon: UtensilsCrossed,
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80",
  },
  {
    title: "Stage Setup",
    description:
      "Professionally designed stages with customizable décor, lighting arrangements, and backstage facilities.",
    icon: Mic2,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80",
  },
  {
    title: "Audio & Visual Systems",
    description:
      "Modern sound systems, LED displays, projectors, and wireless presentation equipment for flawless events.",
    icon: Speaker,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
  },
  {
    title: "Power Backup",
    description:
      "Reliable generator backup and uninterrupted power supply to ensure seamless event execution.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
  },
  {
    title: "Guest Amenities",
    description:
      "Premium guest facilities including bridal suites, lounge areas, restrooms, and dedicated event assistance.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    alt: "Grand convention hall interior",
    category: "venue",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    alt: "Elegant wedding ceremony setup",
    category: "events",
    width: 600,
    height: 900,
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    alt: "Wedding reception dining hall",
    category: "events",
    width: 800,
    height: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    alt: "Corporate conference event",
    category: "events",
    width: 600,
    height: 700,
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    alt: "Conference auditorium seating",
    category: "facilities",
    width: 800,
    height: 550,
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Premium dining setup",
    category: "facilities",
    width: 600,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    alt: "Stage with lighting and AV",
    category: "facilities",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1505236858219-8359eb2e4c0b?w=800&q=80",
    alt: "Banquet seating arrangement",
    category: "venue",
    width: 800,
    height: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    alt: "Social gathering celebration",
    category: "events",
    width: 600,
    height: 750,
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099f26?w=800&q=80",
    alt: "Luxury venue lobby",
    category: "venue",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    alt: "Concert stage setup",
    category: "facilities",
    width: 600,
    height: 700,
  },
  {
    src: "https://images.unsplash.com/photo-1523580495183-7a0f5a4c1acf?w=800&q=80",
    alt: "Community event gathering",
    category: "events",
    width: 800,
    height: 550,
  },
];

export const testimonials = [
  {
    quote:
      "Century Convention Center made our wedding absolutely magical. The venue was stunning and the team went above and beyond.",
    author: "Priya & Arjun",
    event: "Wedding Reception",
  },
  {
    quote:
      "We hosted our annual corporate conference here and the facilities exceeded our expectations. Professional service throughout.",
    author: "Rajesh Kumar",
    event: "Corporate Conference",
  },
  {
    quote:
      "The perfect venue for our daughter's reception. Elegant ambiance, delicious catering, and seamless coordination.",
    author: "The Sharma Family",
    event: "Reception",
  },
];

export const stats = [
  { value: "500+", label: "Events Hosted" },
  { value: "1,500", label: "Guest Capacity" },
  { value: "15+", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];
