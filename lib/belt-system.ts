import { Belt, BeltColor, AgeCategory } from "@/types/dojo";

export const beltColors: Record<BeltColor, string> = {
  white: "#FFFFFF",
  yellow: "#FFD700",
  orange: "#FF8C00",
  green: "#32CD32",
  blue: "#1E90FF",
  purple: "#8A2BE2",
  brown: "#8B4513",
  black: "#000000",
  red: "#DC143C",
};

export const beltNames: Record<BeltColor, { adult: string; children: string }> =
  {
    white: { adult: "White Belt", children: "White Belt" },
    yellow: { adult: "Yellow Belt", children: "Yellow Belt" },
    orange: { adult: "Orange Belt", children: "Orange Belt" },
    green: { adult: "Green Belt", children: "Green Belt" },
    blue: { adult: "Blue Belt", children: "Blue Belt" },
    purple: { adult: "Purple Belt", children: "Purple Belt" },
    brown: { adult: "Brown Belt", children: "Brown Belt" },
    black: { adult: "Black Belt", children: "Black Belt" },
    red: { adult: "Red Belt", children: "Red Belt" },
  };

export const ageCategories: Record<
  AgeCategory,
  { label: string; ageRange: string }
> = {
  children: { label: "Children", ageRange: "3-7 years" },
  "adult-children": { label: "Adult Children", ageRange: "7-12 years" },
  youth: { label: "Youth", ageRange: "12-18 years" },
  adult: { label: "Adult", ageRange: "18+ years" },
};

export function getBeltDisplayName(belt: Belt): string {
  const baseName = beltNames[belt.color][belt.type];
  return belt.stripes > 0
    ? `${baseName} (${belt.stripes} stripe${belt.stripes > 1 ? "s" : ""})`
    : baseName;
}

export function getBeltColorClass(belt: Belt): string {
  const colorMap: Record<BeltColor, string> = {
    white: "bg-white border-gray-300 text-gray-900",
    yellow: "bg-yellow-400 text-yellow-900",
    orange: "bg-orange-500 text-orange-900",
    green: "bg-green-500 text-green-900",
    blue: "bg-blue-500 text-blue-900",
    purple: "bg-purple-500 text-purple-900",
    brown: "bg-amber-800 text-amber-100",
    black: "bg-black text-white",
    red: "bg-red-600 text-red-100",
  };
  return colorMap[belt.color];
}

export function calculateAge(birthday: string): number {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function getAgeCategory(birthday: string): AgeCategory {
  const age = calculateAge(birthday);

  if (age >= 3 && age <= 7) return "children";
  if (age >= 8 && age <= 12) return "adult-children";
  if (age >= 13 && age <= 18) return "youth";
  return "adult";
}
