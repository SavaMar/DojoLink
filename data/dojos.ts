import { Dojo, DojoMember } from "@/types/dojo";

export const dojos: Dojo[] = [
  {
    id: "naster-nyon",
    name: "Naster Nyon",
    slug: "naster-nyon",
    description:
      "A premier JiuJitsu academy in Nyon, Switzerland, focusing on Brazilian JiuJitsu training for all levels.",
    address: "Rue de la Gare 15, 1260 Nyon, Switzerland",
    canton: "Vaud",
    image: "/api/placeholder/400/300",
    owner: {
      name: "Marco Silva",
      email: "marco@naster-nyon.ch",
      avatar: "/api/placeholder/40/40",
    },
    stats: {
      totalMembers: 156,
      activeMembers: 142,
      totalEvents: 24,
      upcomingEvents: 3,
    },
    settings: {
      timezone: "Europe/Zurich",
      currency: "CHF",
      language: "en",
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-12-19T14:30:00Z",
  },
];

export async function getDojoData(slug: string): Promise<Dojo | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return dojos.find((dojo) => dojo.slug === slug) || null;
}

export const members: DojoMember[] = [
  // Instructors and Managers
  {
    id: "1",
    name: "Marco Silva",
    email: "marco@naster-nyon.ch",
    avatar: "/api/placeholder/40/40",
    role: "owner",
    joinedAt: "2020-01-15",
    lastActive: "2024-12-19",
    birthday: "1985-03-15",
    ageCategory: "adult",
    belt: {
      color: "black",
      type: "adult",
      stripes: 3,
      name: "Black Belt (3 stripes)",
    },
    status: "active",
    phone: "+41 79 123 4567",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 120,
      currency: "CHF",
      status: "up_to_date",
      subscriptionType: "month",
    },
    emergencyContact: {
      name: "Maria Silva",
      phone: "+41 79 123 4568",
      relationship: "Wife",
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    avatar: "/api/placeholder/40/40",
    role: "instructor",
    joinedAt: "2021-08-20",
    lastActive: "2024-12-19",
    birthday: "1990-07-22",
    ageCategory: "adult",
    belt: {
      color: "brown",
      type: "adult",
      stripes: 4,
      name: "Brown Belt (4 stripes)",
    },
    status: "active",
    phone: "+41 79 234 5678",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 120,
      currency: "CHF",
      status: "up_to_date",
      subscriptionType: "month",
    },
  },
  {
    id: "3",
    name: "David Wilson",
    email: "david.wilson@email.com",
    avatar: "/api/placeholder/40/40",
    role: "admin",
    joinedAt: "2022-06-12",
    lastActive: "2024-12-19",
    birthday: "1988-11-08",
    ageCategory: "adult",
    belt: {
      color: "purple",
      type: "adult",
      stripes: 2,
      name: "Purple Belt (2 stripes)",
    },
    status: "active",
    phone: "+41 79 345 6789",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 120,
      currency: "CHF",
      status: "up_to_date",
      subscriptionType: "month",
    },
  },
  // Regular Members - Adults
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-11-15",
    lastActive: "2024-12-18",
    birthday: "1995-04-12",
    ageCategory: "adult",
    belt: {
      color: "blue",
      type: "adult",
      stripes: 1,
      name: "Blue Belt (1 stripe)",
    },
    status: "active",
    phone: "+41 79 456 7890",
    paymentStatus: {
      lastPayment: "2024-11-15",
      nextPaymentDue: "2024-12-15",
      amount: 120,
      currency: "CHF",
      status: "due_soon",
    },
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-10-03",
    lastActive: "2024-12-10",
    birthday: "1992-09-25",
    ageCategory: "adult",
    belt: {
      color: "white",
      type: "adult",
      stripes: 3,
      name: "White Belt (3 stripes)",
    },
    status: "inactive",
    phone: "+41 79 567 8901",
    paymentStatus: {
      lastPayment: "2024-10-01",
      nextPaymentDue: "2024-11-01",
      amount: 120,
      currency: "CHF",
      status: "overdue",
    },
  },
  {
    id: "6",
    name: "James Thompson",
    email: "james.thompson@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-09-20",
    lastActive: "2024-12-19",
    birthday: "1987-12-03",
    ageCategory: "adult",
    belt: { color: "purple", type: "adult", stripes: 0, name: "Purple Belt" },
    status: "active",
    phone: "+41 79 678 9012",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 120,
      currency: "CHF",
      status: "up_to_date",
      subscriptionType: "month",
    },
  },
  // Youth Members
  {
    id: "7",
    name: "Lucas Müller",
    email: "lucas.muller@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-08-15",
    lastActive: "2024-12-19",
    birthday: "2008-06-18",
    ageCategory: "youth",
    belt: {
      color: "green",
      type: "children",
      stripes: 2,
      name: "Green Belt (2 stripes)",
    },
    status: "active",
    phone: "+41 79 789 0123",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 80,
      currency: "CHF",
      status: "up_to_date",
    },
    emergencyContact: {
      name: "Anna Müller",
      phone: "+41 79 789 0124",
      relationship: "Mother",
    },
  },
  {
    id: "8",
    name: "Sophie Dubois",
    email: "sophie.dubois@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-07-10",
    lastActive: "2024-12-17",
    birthday: "2009-02-14",
    ageCategory: "youth",
    belt: {
      color: "orange",
      type: "children",
      stripes: 4,
      name: "Orange Belt (4 stripes)",
    },
    status: "active",
    phone: "+41 79 890 1234",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 80,
      currency: "CHF",
      status: "up_to_date",
    },
    emergencyContact: {
      name: "Pierre Dubois",
      phone: "+41 79 890 1235",
      relationship: "Father",
    },
  },
  // Adult Children
  {
    id: "9",
    name: "Noah Weber",
    email: "noah.weber@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-06-05",
    lastActive: "2024-12-19",
    birthday: "2012-10-30",
    ageCategory: "adult-children",
    belt: {
      color: "yellow",
      type: "children",
      stripes: 3,
      name: "Yellow Belt (3 stripes)",
    },
    status: "active",
    phone: "+41 79 901 2345",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 60,
      currency: "CHF",
      status: "up_to_date",
    },
    emergencyContact: {
      name: "Lisa Weber",
      phone: "+41 79 901 2346",
      relationship: "Mother",
    },
  },
  {
    id: "10",
    name: "Mia Rossi",
    email: "mia.rossi@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-05-22",
    lastActive: "2024-12-18",
    birthday: "2011-08-07",
    ageCategory: "adult-children",
    belt: {
      color: "white",
      type: "children",
      stripes: 2,
      name: "White Belt (2 stripes)",
    },
    status: "active",
    phone: "+41 79 012 3456",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 60,
      currency: "CHF",
      status: "up_to_date",
    },
    emergencyContact: {
      name: "Giuseppe Rossi",
      phone: "+41 79 012 3457",
      relationship: "Father",
    },
  },
  // Children
  {
    id: "11",
    name: "Elena Schmidt",
    email: "elena.schmidt@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-04-18",
    lastActive: "2024-12-19",
    birthday: "2019-03-12",
    ageCategory: "children",
    belt: {
      color: "white",
      type: "children",
      stripes: 1,
      name: "White Belt (1 stripe)",
    },
    status: "active",
    phone: "+41 79 123 4567",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 40,
      currency: "CHF",
      status: "up_to_date",
    },
    emergencyContact: {
      name: "Klaus Schmidt",
      phone: "+41 79 123 4568",
      relationship: "Father",
    },
  },
  {
    id: "12",
    name: "Felix Martin",
    email: "felix.martin@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-03-30",
    lastActive: "2024-12-16",
    birthday: "2018-11-05",
    ageCategory: "children",
    belt: { color: "white", type: "children", stripes: 0, name: "White Belt" },
    status: "active",
    phone: "+41 79 234 5678",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 40,
      currency: "CHF",
      status: "up_to_date",
    },
    emergencyContact: {
      name: "Marie Martin",
      phone: "+41 79 234 5679",
      relationship: "Mother",
    },
  },
  // Members on vacation
  {
    id: "13",
    name: "Anna Müller",
    email: "anna.muller@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-02-15",
    lastActive: "2024-12-10",
    birthday: "1993-05-20",
    ageCategory: "adult",
    belt: {
      color: "blue",
      type: "adult",
      stripes: 2,
      name: "Blue Belt (2 stripes)",
    },
    status: "on_vacation",
    phone: "+41 79 345 6789",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 120,
      currency: "CHF",
      status: "up_to_date",
      subscriptionType: "month",
    },
    absenceInfo: {
      reason: "vacation",
      startDate: "2024-12-15",
      expectedReturnDate: "2025-01-05",
      notes: "Skiing vacation in the Alps",
    },
  },
  {
    id: "14",
    name: "Tom Wilson",
    email: "tom.wilson@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-01-10",
    lastActive: "2024-12-08",
    birthday: "2007-08-12",
    ageCategory: "youth",
    belt: {
      color: "orange",
      type: "children",
      stripes: 1,
      name: "Orange Belt (1 stripe)",
    },
    status: "on_vacation",
    phone: "+41 79 456 7890",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 80,
      currency: "CHF",
      status: "up_to_date",
    },
    emergencyContact: {
      name: "Sarah Wilson",
      phone: "+41 79 456 7891",
      relationship: "Mother",
    },
    absenceInfo: {
      reason: "vacation",
      startDate: "2024-12-20",
      expectedReturnDate: "2025-01-10",
      notes: "Family trip to Thailand",
    },
  },
  // Injured members
  {
    id: "15",
    name: "Lisa Chen",
    email: "lisa.chen@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2023-11-05",
    lastActive: "2024-12-05",
    birthday: "1991-12-03",
    ageCategory: "adult",
    belt: {
      color: "purple",
      type: "adult",
      stripes: 1,
      name: "Purple Belt (1 stripe)",
    },
    status: "injured",
    phone: "+41 79 567 8901",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 120,
      currency: "CHF",
      status: "up_to_date",
      subscriptionType: "month",
    },
    absenceInfo: {
      reason: "injury",
      startDate: "2024-12-05",
      expectedReturnDate: "2025-02-15",
      notes: "Knee injury during training - physiotherapy required",
    },
  },
  {
    id: "16",
    name: "Max Weber",
    email: "max.weber@email.com",
    avatar: "/api/placeholder/40/40",
    role: "member",
    joinedAt: "2024-04-22",
    lastActive: "2024-12-12",
    birthday: "2010-03-18",
    ageCategory: "adult-children",
    belt: {
      color: "yellow",
      type: "children",
      stripes: 1,
      name: "Yellow Belt (1 stripe)",
    },
    status: "injured",
    phone: "+41 79 678 9012",
    paymentStatus: {
      lastPayment: "2024-12-01",
      nextPaymentDue: "2025-01-01",
      amount: 60,
      currency: "CHF",
      status: "up_to_date",
    },
    emergencyContact: {
      name: "Petra Weber",
      phone: "+41 79 678 9013",
      relationship: "Mother",
    },
    absenceInfo: {
      reason: "injury",
      startDate: "2024-12-12",
      expectedReturnDate: "2025-01-20",
      notes: "Broken wrist from fall - cast for 6 weeks",
    },
  },
];

export async function getDojoMembers(dojoId: string): Promise<DojoMember[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return members;
}

export async function getDojoInstructors(
  dojoId: string
): Promise<DojoMember[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return members.filter(
    (member) =>
      member.role === "instructor" ||
      member.role === "admin" ||
      member.role === "owner"
  );
}

export async function getAllDojos(): Promise<Dojo[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return dojos;
}
