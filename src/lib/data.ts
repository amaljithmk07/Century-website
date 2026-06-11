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
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    slug: "receptions",
    title: "Receptions",
    description:
      "Celebrate your special day with grand receptions featuring spacious layouts and premium dining arrangements.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    description:
      "Host impactful corporate gatherings with professional ambiance and state-of-the-art facilities.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    slug: "conferences",
    title: "Conferences",
    description:
      "Conduct seamless conferences with advanced AV systems, comfortable seating, and dedicated support staff.",
    icon: Presentation,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
  },
  {
    slug: "seminars",
    title: "Seminars",
    description:
      "Ideal venue for educational seminars and workshops with flexible seating and presentation capabilities.",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f39d4666?w=800&q=80",
  },
  {
    slug: "exhibitions",
    title: "Exhibitions",
    description:
      "Showcase products and innovations in our expansive halls with excellent visibility and foot traffic flow.",
    icon: LayoutGrid,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f39d4666?w=800&q=80",
  },
  {
    slug: "social-gatherings",
    title: "Social Gatherings",
    description:
      "From birthday celebrations to anniversaries, create memorable moments in a luxurious setting.",
    icon: PartyPopper,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  },
  {
    slug: "community-events",
    title: "Community Events",
    description:
      "Bring communities together for cultural programs, fundraisers, and local celebrations.",
    icon: Handshake,
    image: "https://images.unsplash.com/photo-1523580495183-7a0f5a4c1acf?w=800&q=80",
  },
];

export const facilities: Facility[] = [
  {
    title: "Grand Convention Hall",
    description:
      "A magnificent hall with soaring ceilings, crystal chandeliers, and elegant interiors designed for grand celebrations.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
  },
  {
    title: "Seating Capacity",
    description:
      "Flexible seating arrangements accommodating up to 1,500 guests with theater, banquet, and classroom configurations.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1505236858219-8359eb2e4c0b?w=800&q=80",
  },
  {
    title: "Air-Conditioned Venue",
    description:
      "Fully climate-controlled environment ensuring guest comfort throughout your event, regardless of season.",
    icon: Snowflake,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099f26?w=800&q=80",
  },
  {
    title: "Spacious Parking",
    description:
      "Ample parking space for 200+ vehicles with dedicated valet service and easy access for all guests.",
    icon: Car,
    image: "https://images.unsplash.com/photo-1590674899480-d3d47dd59bcb?w=800&q=80",
  },
  {
    title: "Dining Facilities",
    description:
      "Premium in-house catering with multi-cuisine options, live counters, and elegant buffet arrangements.",
    icon: UtensilsCrossed,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    title: "Stage Setup",
    description:
      "Professional stage with customizable lighting, backdrop options, and green room facilities for performers.",
    icon: Mic2,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  },
  {
    title: "Audio & Visual Systems",
    description:
      "State-of-the-art sound systems, LED screens, projectors, and wireless microphones for flawless presentations.",
    icon: Speaker,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    title: "Generator Backup",
    description:
      "Uninterrupted power supply with industrial-grade generator backup for seamless event execution.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "Guest Amenities",
    description:
      "Premium restrooms, bridal suites, prayer rooms, and dedicated event coordination team at your service.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
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
