export interface Dojo {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  canton: string;
  image: string;
  owner: {
    name: string;
    email: string;
    avatar?: string;
  };
  stats: {
    totalMembers: number;
    activeMembers: number;
    totalEvents: number;
    upcomingEvents: number;
  };
  settings: {
    timezone: string;
    currency: string;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type AgeCategory = "children" | "adult-children" | "youth" | "adult";
export type BeltColor =
  | "white"
  | "yellow"
  | "orange"
  | "green"
  | "blue"
  | "purple"
  | "brown"
  | "black"
  | "red";
export type BeltType = "adult" | "children";

export interface Belt {
  color: BeltColor;
  type: BeltType;
  stripes: number; // 0-4 stripes
  name: string;
}

export interface DojoMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "admin" | "instructor" | "member";
  joinedAt: string;
  lastActive: string;
  birthday: string;
  ageCategory: AgeCategory;
  belt: Belt;
  status: "active" | "inactive" | "suspended" | "on_vacation" | "injured";
  phone?: string;
  paymentStatus: {
    lastPayment: string;
    nextPaymentDue: string;
    amount: number;
    currency: string;
    status: "paid" | "overdue" | "due_soon" | "up_to_date";
    subscriptionType: "year" | "month" | "quarter" | "one_time";
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  absenceInfo?: {
    reason: "vacation" | "injury";
    startDate: string;
    expectedReturnDate: string;
    notes?: string;
  };
}

export interface DojoEvent {
  id: string;
  dojoId: string;
  name: string;
  description: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  isRecurring: boolean;
  recurrencePattern?: "weekly" | "monthly";
  status: "draft" | "published" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}
