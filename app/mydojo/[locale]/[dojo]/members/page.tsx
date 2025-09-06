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
} from "lucide-react";
import {
  getBeltDisplayName,
  getBeltColorClass,
  calculateAge,
  ageCategories,
} from "@/lib/belt-system";
import { DojoMember, AgeCategory, BeltColor } from "@/types/dojo";
import { useState, useEffect } from "react";

interface MembersPageProps {
  params: {
    locale: string;
    dojo: string;
  };
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-yellow-100 text-yellow-800",
  suspended: "bg-red-100 text-red-800",
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
  const [members, setMembers] = useState<DojoMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<DojoMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState<AgeCategory | "all">("all");
  const [beltFilter, setBeltFilter] = useState<BeltColor | "all">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "suspended"
  >("all");

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getDojoMembers(params.dojo);
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error("Failed to load members:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, [params.dojo]);

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

    setFilteredMembers(filtered);
  }, [members, searchTerm, ageFilter, beltFilter, statusFilter]);

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
    return { total, active, byAge };
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  value as "all" | "active" | "inactive" | "suspended"
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
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <Badge className={statusColors[member.status]}>
                  {member.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Belt and Age */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${getBeltColorClass(
                      member.belt
                    )}`}
                  ></div>
                  <span className="text-sm font-medium">
                    {getBeltDisplayName(member.belt)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">
                    Age: {calculateAge(member.birthday)}
                  </span>
                  <p className="text-xs text-gray-400">
                    {ageCategories[member.ageCategory].label}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                {member.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {member.phone}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined: {new Date(member.joinedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 mr-2" />
                  Birthday: {new Date(member.birthday).toLocaleDateString()}
                </div>
              </div>

              {/* Emergency Contact */}
              {member.emergencyContact && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Emergency Contact
                  </p>
                  <p className="text-sm text-gray-700">
                    {member.emergencyContact.name} (
                    {member.emergencyContact.relationship})
                  </p>
                  <p className="text-xs text-gray-500">
                    {member.emergencyContact.phone}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
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
