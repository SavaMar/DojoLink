export type EventCategory =
  | "womens"
  | "openMat"
  | "competitions"
  | "seminar"
  | "kids"
  | "camps";
export type EventType = "gi" | "grappling";
export type PricingType = "free" | "paid";

export interface Event {
  id: string;
  name: string;
  category: EventCategory;
  types: EventType[];
  pricing: PricingType;
  price?: number;
  date: string;
  timeFrom: string;
  timeTo: string;
  address: string;
  canton: string;
  organizer: string;
  organizerLink?: string;
  image: string;
  description: string;
  earlyBirdDate?: string;
  competitionDate?: string;
  registerTillDate?: string;
  instagramLink?: string;
  isBookmarked?: boolean;
}

export interface EventFilters {
  category?: EventCategory;
  canton?: string;
  type?: EventType;
  pricing?: PricingType;
}

export const categoryColors: Record<EventCategory, string> = {
  womens: "bg-pink-500",
  openMat: "bg-green-500",
  competitions: "bg-red-500",
  seminar: "bg-blue-500",
  kids: "bg-orange-500",
  camps: "bg-violet-500",
};

export const swissCantons = [
  "Zurich",
  "Bern",
  "Lucerne",
  "Uri",
  "Schwyz",
  "Obwalden",
  "Nidwalden",
  "Glarus",
  "Zug",
  "Fribourg",
  "Solothurn",
  "Basel-Stadt",
  "Basel-Landschaft",
  "Schaffhausen",
  "Appenzell Ausserrhoden",
  "Appenzell Innerrhoden",
  "St. Gallen",
  "Graubünden",
  "Aargau",
  "Thurgau",
  "Ticino",
  "Vaud",
  "Valais",
  "Neuchâtel",
  "Geneva",
  "Jura",
];
