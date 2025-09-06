"use client";

import { getDojoData, getDojoMembers } from "@/data/dojos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Filter,
  Calendar,
  Award,
  Phone,
  Mail,
  User,
  CreditCard,
  AlertTriangle,
  Plane,
  Heart,
  Clock,
} from "lucide-react";
import {
  getBeltDisplayName,
  getBeltColorClass,
  calculateAge,
  ageCategories,
} from "@/lib/belt-system";
import { DojoMember, AgeCategory, BeltColor } from "@/types/dojo";
import { useState, useEffect, use } from "react";

interface MembersPageProps {
  params: Promise<{
    locale: string;
    dojo: string;
  }>;
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-yellow-100 text-yellow-800",
  suspended: "bg-red-100 text-red-800",
  on_vacation: "bg-blue-100 text-blue-800",
  injured: "bg-orange-100 text-orange-800",
};

const paymentStatusColors = {
  paid: "bg-green-100 text-green-800",
  up_to_date: "bg-green-100 text-green-800",
  due_soon: "bg-yellow-100 text-yellow-800",
  overdue: "bg-red-100 text-red-800",
};

const paymentStatusLabels = {
  paid: "Paid",
  up_to_date: "Up to Date",
  due_soon: "Due Soon",
  overdue: "Overdue",
};

const subscriptionTypeLabels = {
  year: "Year",
  month: "Month",
  quarter: "Quarter",
  one_time: "One Time",
};

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

export default function MembersPage({ params }: MembersPageProps) {
  const resolvedParams = use(params);
  const [members, setMembers] = useState<DojoMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<DojoMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState<AgeCategory | "all">("all");
  const [beltFilter, setBeltFilter] = useState<BeltColor | "all">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "suspended" | "on_vacation" | "injured"
  >("all");
  const [paymentFilter, setPaymentFilter] = useState<
    "all" | "paid" | "up_to_date" | "due_soon" | "overdue"
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
      filtered = filtered.filter((member) => member.status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter(
        (member) => member.paymentStatus.status === paymentFilter
      );
    }

    setFilteredMembers(filtered);
  }, [members, searchTerm, ageFilter, beltFilter, statusFilter, paymentFilter]);

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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dojo Members</h1>
          <p className="text-gray-600 mt-1">
            Manage your dojo members and their training progress
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-9 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Members
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Children (3-7)
                </p>
                <p className="text-2xl font-bold">{stats.byAge.children}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Youth (7-18)
                </p>
                <p className="text-2xl font-bold">
                  {stats.byAge["adult-children"] + stats.byAge.youth}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Adults (18+)
                </p>
                <p className="text-2xl font-bold">{stats.byAge.adult}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.byPayment.overdue}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Due Soon</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.byPayment.dueSoon}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Plane className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On Vacation</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.byStatus.onVacation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Injured</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.byStatus.injured}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Age Category Filter */}
            <Select
              value={ageFilter}
              onValueChange={(value) =>
                setAgeFilter(value as AgeCategory | "all")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Age Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                {Object.entries(ageCategories).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label} ({value.ageRange})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Belt Filter */}
            <Select
              value={beltFilter}
              onValueChange={(value) =>
                setBeltFilter(value as BeltColor | "all")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Belt Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Belts</SelectItem>
                {beltColors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)} Belt
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(
                  value as
                    | "all"
                    | "active"
                    | "inactive"
                    | "suspended"
                    | "on_vacation"
                    | "injured"
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="on_vacation">On Vacation</SelectItem>
                <SelectItem value="injured">Injured</SelectItem>
              </SelectContent>
            </Select>

            {/* Payment Status Filter */}
            <Select
              value={paymentFilter}
              onValueChange={(value) =>
                setPaymentFilter(
                  value as
                    | "all"
                    | "paid"
                    | "up_to_date"
                    | "due_soon"
                    | "overdue"
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="up_to_date">Up to Date</SelectItem>
                <SelectItem value="due_soon">Due Soon</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm font-medium truncate">
                      {member.name}
                    </CardTitle>
                    <p className="text-xs text-gray-500 truncate">
                      {member.email}
                    </p>
                  </div>
                </div>
                <Badge className={`${statusColors[member.status]} text-xs`}>
                  {member.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
              <div className="space-y-3 flex-1">
                {/* Belt and Subscription */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full border ${getBeltColorClass(
                        member.belt
                      )}`}
                    ></div>
                    <span className="text-xs font-medium">
                      {member.belt.color.charAt(0).toUpperCase() +
                        member.belt.color.slice(1)}
                      {member.belt.stripes > 0 && ` (${member.belt.stripes})`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {
                        subscriptionTypeLabels[
                          member.paymentStatus.subscriptionType
                        ]
                      }
                    </span>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Age: {calculateAge(member.birthday)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Badge
                      className={`${
                        paymentStatusColors[member.paymentStatus.status]
                      } text-xs px-2 py-0.5`}
                    >
                      {paymentStatusLabels[member.paymentStatus.status]}
                    </Badge>
                    {(member.paymentStatus.status === "overdue" ||
                      member.paymentStatus.status === "due_soon") && (
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                </div>

                {/* Key Information */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Joined:</span>
                    <span>{formatDate(member.joinedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Next payment:</span>
                    <span>
                      {formatDate(member.paymentStatus.nextPaymentDue)}
                    </span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone className="w-3 h-3 mr-1" />
                      {member.phone}
                    </div>
                  )}
                </div>

                {/* Absence Information */}
                {member.absenceInfo && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-1 mb-1">
                      {member.absenceInfo.reason === "vacation" ? (
                        <Plane className="w-3 h-3 text-blue-500" />
                      ) : (
                        <Heart className="w-3 h-3 text-orange-500" />
                      )}
                      <p className="text-xs font-medium text-gray-500 capitalize">
                        {member.absenceInfo.reason === "vacation"
                          ? "Vacation"
                          : "Injured"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>From:</span>
                        <span>{formatDate(member.absenceInfo.startDate)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Return:</span>
                        <span>
                          {formatDate(member.absenceInfo.expectedReturnDate)}
                        </span>
                      </div>
                      {member.absenceInfo.notes && (
                        <p className="text-xs text-gray-400 truncate">
                          {member.absenceInfo.notes}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Emergency Contact */}
                {member.emergencyContact && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Emergency
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {member.emergencyContact.name} (
                      {member.emergencyContact.relationship})
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons - Always at bottom */}
              <div className="flex space-x-1 pt-2 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs px-2 py-1"
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs px-2 py-1"
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No members found
            </h3>
            <p className="text-gray-500">
              {searchTerm ||
              ageFilter !== "all" ||
              beltFilter !== "all" ||
              statusFilter !== "all"
                ? "Try adjusting your filters to see more results."
                : "Get started by adding your first member."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
