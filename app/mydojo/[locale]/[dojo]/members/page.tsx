"use client";

import { getDojoMembers } from "@/data/dojos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Plus,
  Search,
  Calendar,
  Award,
  Phone,
  Mail,
  User,
  CreditCard,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { calculateAge, ageCategories } from "@/lib/belt-system";
import { DojoMember, AgeCategory, BeltColor } from "@/types/dojo";
import { useState, useEffect, use } from "react";

interface MembersPageProps {
  params: Promise<{
    locale: string;
    dojo: string;
  }>;
}

// Date formatting utility
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}.${month}.${year}`;
};

const beltColors: BeltColor[] = [
  "white",
  "yellow",
  "orange",
  "green",
  "blue",
  "purple",
  "brown",
  "black",
  "red",
];

const getBeltColor = (belt: string) => {
  const colors = {
    white: "rgb(255, 255, 255)",
    yellow: "rgb(255, 255, 0)",
    orange: "rgb(255, 165, 0)",
    green: "rgb(0, 128, 0)",
    blue: "rgb(0, 0, 255)",
    purple: "rgb(128, 0, 128)",
    brown: "rgb(139, 69, 19)",
    black: "rgb(0, 0, 0)",
    red: "rgb(255, 0, 0)",
  };
  return colors[belt as keyof typeof colors] || "rgb(255, 255, 255)";
};

const getAttendanceColor = (percentage: number) => {
  if (percentage >= 90) return "rgb(34, 197, 94)"; // Green - excellent
  if (percentage >= 75) return "rgb(59, 130, 246)"; // Blue - good
  if (percentage >= 60) return "rgb(251, 191, 36)"; // Yellow - moderate
  if (percentage >= 40) return "rgb(245, 158, 11)"; // Orange - low
  return "rgb(239, 68, 68)"; // Red - very low
};

const isBirthdayToday = (member: DojoMember) => {
  // Use prototype flag if available, otherwise fall back to date calculation
  if (member.isBirthdayToday !== undefined) {
    return member.isBirthdayToday;
  }

  const today = new Date();
  const birthDate = new Date(member.birthday);
  return (
    today.getMonth() === birthDate.getMonth() &&
    today.getDate() === birthDate.getDate()
  );
};

const getBirthdaysThisMonth = (members: DojoMember[]) => {
  const today = new Date();
  return members.filter((member) => {
    const birthDate = new Date(member.birthday);
    return birthDate.getMonth() === today.getMonth();
  }).length;
};

const getSubscriptionDisplay = (subscriptionType: string) => {
  const typeMap = {
    year: "1 Year",
    month: "1 Month",
    quarter: "3 Months",
    one_time: "One Time",
  };
  return typeMap[subscriptionType as keyof typeof typeMap] || subscriptionType;
};

const getSubscriptionScope = () => {
  // This would come from member data in a real app
  // For now, we'll simulate based on member data
  const scopes = ["Full Access", "BJJ Only", "Kickboxing Only", "MMA Only"];
  return scopes[Math.floor(Math.random() * scopes.length)];
};

export default function MembersPage({ params }: MembersPageProps) {
  const resolvedParams = use(params);
  const [members, setMembers] = useState<DojoMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<DojoMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState<AgeCategory | "all">("all");
  const [beltFilter, setBeltFilter] = useState<BeltColor | "all">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "frozen" | "suspended" | "on_vacation" | "injured"
  >("all");
  const [birthdayFilter, setBirthdayFilter] = useState<
    "all" | "today" | "this_month"
  >("all");
  const [attendanceFilter, setAttendanceFilter] = useState<
    "all" | "excellent" | "good" | "moderate" | "low"
  >("all");

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getDojoMembers(resolvedParams.dojo);
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error("Failed to load members:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, [resolvedParams.dojo]);

  useEffect(() => {
    let filtered = members;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Age category filter
    if (ageFilter !== "all") {
      filtered = filtered.filter((member) => member.ageCategory === ageFilter);
    }

    // Belt filter
    if (beltFilter !== "all") {
      filtered = filtered.filter((member) => member.belt.color === beltFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((member) => {
        if (statusFilter === "frozen") {
          return member.status === "inactive";
        }
        return member.status === statusFilter;
      });
    }

    // Birthday filter
    if (birthdayFilter === "today") {
      filtered = filtered.filter((member) => isBirthdayToday(member));
    } else if (birthdayFilter === "this_month") {
      const today = new Date();
      filtered = filtered.filter((member) => {
        const birthDate = new Date(member.birthday);
        return birthDate.getMonth() === today.getMonth();
      });
    }

    // Attendance filter
    if (attendanceFilter !== "all") {
      filtered = filtered.filter((member) => {
        const percentage = member.attendancePercentage || 0;
        switch (attendanceFilter) {
          case "excellent":
            return percentage >= 90;
          case "good":
            return percentage >= 75 && percentage < 90;
          case "moderate":
            return percentage >= 60 && percentage < 75;
          case "low":
            return percentage < 60;
          default:
            return true;
        }
      });
    }

    setFilteredMembers(filtered);
  }, [
    members,
    searchTerm,
    ageFilter,
    beltFilter,
    statusFilter,
    birthdayFilter,
    attendanceFilter,
  ]);

  const getMemberStats = () => {
    const total = members.length;
    const active = members.filter((m) => m.status === "active").length;
    const byAge = {
      children: members.filter((m) => m.ageCategory === "children").length,
      "adult-children": members.filter(
        (m) => m.ageCategory === "adult-children"
      ).length,
      youth: members.filter((m) => m.ageCategory === "youth").length,
      adult: members.filter((m) => m.ageCategory === "adult").length,
    };
    const byPayment = {
      overdue: members.filter((m) => m.paymentStatus.status === "overdue")
        .length,
      dueSoon: members.filter((m) => m.paymentStatus.status === "due_soon")
        .length,
      upToDate: members.filter((m) => m.paymentStatus.status === "up_to_date")
        .length,
    };
    const byStatus = {
      onVacation: members.filter((m) => m.status === "on_vacation").length,
      injured: members.filter((m) => m.status === "injured").length,
    };
    return { total, active, byAge, byPayment, byStatus };
  };

  const stats = getMemberStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
            style={{ borderColor: "rgb(3, 126, 168)" }}
          ></div>
          <p style={{ color: "rgb(180, 180, 180)" }}>Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            Dojo Members
          </h1>
          <p className="mt-1" style={{ color: "rgb(180, 180, 180)" }}>
            Manage your dojo members and their training progress
          </p>
        </div>
        <Button style={{ backgroundColor: "rgb(3, 126, 168)" }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Stats Overview - Simplified */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5" style={{ color: "rgb(3, 126, 168)" }} />
          <span
            className="text-lg font-semibold"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            {stats.total} Total
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgb(34, 197, 94)" }}
          ></div>
          <span className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
            {stats.active} Active
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgb(239, 68, 68)" }}
          ></div>
          <span className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
            {stats.byPayment.overdue} Overdue
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgb(251, 191, 36)" }}
          ></div>
          <span className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
            {stats.byPayment.dueSoon} Due Soon
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar
            className="w-4 h-4"
            style={{ color: "rgb(251, 191, 36)" }}
          />
          <span className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
            {getBirthdaysThisMonth(members)} Birthdays this month
          </span>
        </div>
      </div>

      {/* Filters - Simplified */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            style={{ color: "rgb(180, 180, 180)" }}
          />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg"
            style={{
              backgroundColor: "rgb(63, 67, 70)",
              border: "1px solid rgb(63, 67, 70)",
              color: "rgb(255, 255, 255)",
            }}
          />
        </div>

        <Select
          value={ageFilter}
          onValueChange={(value) => setAgeFilter(value as AgeCategory | "all")}
        >
          <SelectTrigger
            className="w-40"
            style={{
              backgroundColor: "rgb(63, 67, 70)",
              borderColor: "rgb(63, 67, 70)",
            }}
          >
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            {Object.entries(ageCategories).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={beltFilter}
          onValueChange={(value) => setBeltFilter(value as BeltColor | "all")}
        >
          <SelectTrigger
            className="w-32"
            style={{
              backgroundColor: "rgb(63, 67, 70)",
              borderColor: "rgb(63, 67, 70)",
            }}
          >
            <SelectValue placeholder="Belt" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Belts</SelectItem>
            {beltColors.map((color) => (
              <SelectItem key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            if (value === "inactive") {
              setStatusFilter("frozen");
            } else {
              setStatusFilter(
                value as
                  | "all"
                  | "active"
                  | "suspended"
                  | "on_vacation"
                  | "injured"
              );
            }
          }}
        >
          <SelectTrigger
            className="w-32"
            style={{
              backgroundColor: "rgb(63, 67, 70)",
              borderColor: "rgb(63, 67, 70)",
            }}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="frozen">Frozen</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="on_vacation">On Vacation</SelectItem>
            <SelectItem value="injured">Injured</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={birthdayFilter === "this_month" ? "default" : "outline"}
          size="sm"
          onClick={() =>
            setBirthdayFilter(
              birthdayFilter === "this_month" ? "all" : "this_month"
            )
          }
          style={{
            backgroundColor:
              birthdayFilter === "this_month"
                ? "rgb(3, 126, 168)"
                : "transparent",
            borderColor: "rgb(63, 67, 70)",
            color:
              birthdayFilter === "this_month" ? "white" : "rgb(180, 180, 180)",
          }}
        >
          <Calendar className="w-4 h-4 mr-1" />
          Birthdays this month
        </Button>

        <Button
          variant={attendanceFilter === "excellent" ? "default" : "outline"}
          size="sm"
          onClick={() =>
            setAttendanceFilter(
              attendanceFilter === "excellent" ? "all" : "excellent"
            )
          }
          style={{
            backgroundColor:
              attendanceFilter === "excellent"
                ? "rgb(3, 126, 168)"
                : "transparent",
            borderColor: "rgb(63, 67, 70)",
            color:
              attendanceFilter === "excellent" ? "white" : "rgb(180, 180, 180)",
          }}
        >
          Excellent (90%+)
        </Button>

        <Button
          variant={attendanceFilter === "good" ? "default" : "outline"}
          size="sm"
          onClick={() =>
            setAttendanceFilter(attendanceFilter === "good" ? "all" : "good")
          }
          style={{
            backgroundColor:
              attendanceFilter === "good" ? "rgb(3, 126, 168)" : "transparent",
            borderColor: "rgb(63, 67, 70)",
            color: attendanceFilter === "good" ? "white" : "rgb(180, 180, 180)",
          }}
        >
          Good (75-89%)
        </Button>

        <Button
          variant={attendanceFilter === "moderate" ? "default" : "outline"}
          size="sm"
          onClick={() =>
            setAttendanceFilter(
              attendanceFilter === "moderate" ? "all" : "moderate"
            )
          }
          style={{
            backgroundColor:
              attendanceFilter === "moderate"
                ? "rgb(3, 126, 168)"
                : "transparent",
            borderColor: "rgb(63, 67, 70)",
            color:
              attendanceFilter === "moderate" ? "white" : "rgb(180, 180, 180)",
          }}
        >
          Moderate (60-74%)
        </Button>

        <Button
          variant={attendanceFilter === "low" ? "default" : "outline"}
          size="sm"
          onClick={() =>
            setAttendanceFilter(attendanceFilter === "low" ? "all" : "low")
          }
          style={{
            backgroundColor:
              attendanceFilter === "low" ? "rgb(3, 126, 168)" : "transparent",
            borderColor: "rgb(63, 67, 70)",
            color: attendanceFilter === "low" ? "white" : "rgb(180, 180, 180)",
          }}
        >
          Low (&lt;60%)
        </Button>
      </div>

      {/* Members List */}
      <div className="space-y-2">
        {filteredMembers
          .sort((a, b) => {
            // Sort by birthday today first, then by name
            const aIsBirthday = isBirthdayToday(a);
            const bIsBirthday = isBirthdayToday(b);
            if (aIsBirthday && !bIsBirthday) return -1;
            if (!aIsBirthday && bIsBirthday) return 1;
            return a.name.localeCompare(b.name);
          })
          .map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-opacity-50 transition-colors"
              style={{ backgroundColor: "rgb(42, 46, 49)" }}
            >
              {/* Left: Member Info */}
              <div className="flex items-center space-x-4 flex-1">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ backgroundColor: "rgb(63, 67, 70)" }}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Basic Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-semibold text-white truncate">
                      {member.name}
                    </h3>

                    {/* Status Display */}
                    {member.status === "active" ||
                    member.status === "on_vacation" ||
                    member.status === "injured" ||
                    member.status === "inactive" ? (
                      <span
                        className="text-sm font-medium"
                        style={{
                          color:
                            member.status === "active"
                              ? "rgb(34, 197, 94)"
                              : member.status === "on_vacation"
                              ? "rgb(59, 130, 246)"
                              : member.status === "injured"
                              ? "rgb(185, 28, 28)"
                              : member.status === "inactive"
                              ? "rgb(59, 130, 246)"
                              : "rgb(180, 180, 180)",
                        }}
                      >
                        {member.status === "on_vacation"
                          ? "On Vacation"
                          : member.status === "inactive"
                          ? "Frozen"
                          : member.status.charAt(0).toUpperCase() +
                            member.status.slice(1)}
                      </span>
                    ) : (
                      <Badge
                        style={{
                          backgroundColor: "rgba(239, 68, 68, 0.6)",
                          color: "white",
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        {member.status.charAt(0).toUpperCase() +
                          member.status.slice(1)}
                      </Badge>
                    )}

                    {isBirthdayToday(member) && (
                      <Badge
                        style={{
                          backgroundColor: "rgba(251, 191, 36, 0.7)",
                          color: "white",
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        Birthday Today!
                      </Badge>
                    )}
                  </div>

                  <div
                    className="flex items-center space-x-4 text-sm"
                    style={{ color: "rgb(180, 180, 180)" }}
                  >
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {member.email}
                    </div>
                    {member.phone && (
                      <div className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {member.phone}
                      </div>
                    )}
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span
                        style={{
                          color: isBirthdayToday(member)
                            ? "rgb(251, 191, 36)"
                            : "rgb(180, 180, 180)",
                          fontWeight: isBirthdayToday(member)
                            ? "bold"
                            : "normal",
                        }}
                      >
                        {calculateAge(member.birthday)} years
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full border mr-1"
                        style={{
                          backgroundColor: getBeltColor(member.belt.color),
                        }}
                      ></div>
                      {member.belt.color.charAt(0).toUpperCase() +
                        member.belt.color.slice(1)}
                      {member.belt.stripes > 0 && ` (${member.belt.stripes})`}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span
                        style={{
                          color: isBirthdayToday(member)
                            ? "rgb(251, 191, 36)"
                            : "rgb(180, 180, 180)",
                        }}
                      >
                        {formatDate(member.birthday)}
                      </span>
                    </div>
                    {member.attendancePercentage !== undefined && (
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 mr-1 rounded-full"
                          style={{
                            backgroundColor: getAttendanceColor(
                              member.attendancePercentage
                            ),
                          }}
                        ></div>
                        <span style={{ color: "rgb(180, 180, 180)" }}>
                          {member.attendancePercentage}% attendance
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Subscription and Payment Info */}
                  <div
                    className="flex items-center space-x-4 text-sm mt-1"
                    style={{ color: "rgb(150, 150, 150)" }}
                  >
                    <div className="flex items-center">
                      <CreditCard className="w-3 h-3 mr-1" />
                      {getSubscriptionDisplay(
                        member.paymentStatus.subscriptionType
                      )}{" "}
                      - {getSubscriptionScope()}
                    </div>
                    {member.paymentStatus.status === "overdue" && (
                      <div
                        className="flex items-center"
                        style={{ color: "rgb(239, 68, 68)" }}
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Due: {formatDate(member.paymentStatus.nextPaymentDue)}
                      </div>
                    )}
                    {member.paymentStatus.status === "due_soon" && (
                      <div
                        className="flex items-center"
                        style={{ color: "rgb(251, 191, 36)" }}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        Due: {formatDate(member.paymentStatus.nextPaymentDue)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  style={{
                    borderColor: "rgb(107, 114, 128)",
                    color: "rgb(107, 114, 128)",
                    padding: "0.5rem 1rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(107, 114, 128, 0.1)";
                    e.currentTarget.style.borderColor = "rgb(75, 85, 99)";
                    e.currentTarget.style.color = "rgb(75, 85, 99)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "rgb(107, 114, 128)";
                    e.currentTarget.style.color = "rgb(107, 114, 128)";
                  }}
                >
                  <User className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  style={{
                    borderColor: "rgb(3, 126, 168)",
                    color: "rgb(3, 126, 168)",
                    padding: "0.5rem 1rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(3, 126, 168, 0.1)";
                    e.currentTarget.style.borderColor = "rgb(2, 100, 140)";
                    e.currentTarget.style.color = "rgb(2, 100, 140)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "rgb(3, 126, 168)";
                    e.currentTarget.style.color = "rgb(3, 126, 168)";
                  }}
                >
                  <Award className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users
            className="h-12 w-12 mx-auto mb-4"
            style={{ color: "rgb(180, 180, 180)" }}
          />
          <h3
            className="text-lg font-medium mb-2"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            No members found
          </h3>
          <p style={{ color: "rgb(180, 180, 180)" }}>
            {searchTerm ||
            ageFilter !== "all" ||
            beltFilter !== "all" ||
            statusFilter !== "all"
              ? "Try adjusting your filters to see more results."
              : "Get started by adding your first member."}
          </p>
        </div>
      )}
    </div>
  );
}
