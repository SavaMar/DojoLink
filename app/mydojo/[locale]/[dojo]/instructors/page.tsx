import { getDojoData, getDojoInstructors } from "@/data/dojos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Plus, Phone, Mail, Calendar, Award } from "lucide-react";
import {
  getBeltDisplayName,
  getBeltColorClass,
  calculateAge,
} from "@/lib/belt-system";
import { CreditCard, AlertTriangle } from "lucide-react";

interface InstructorsPageProps {
  params: Promise<{
    locale: string;
    dojo: string;
  }>;
}

const roleColors = {
  owner: "bg-purple-100 text-purple-800",
  admin: "bg-blue-100 text-blue-800",
  instructor: "bg-green-100 text-green-800",
};

const roleLabels = {
  owner: "Owner",
  admin: "Manager",
  instructor: "Instructor",
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

export default async function InstructorsPage({
  params,
}: InstructorsPageProps) {
  const resolvedParams = await params;
  const dojo = await getDojoData(resolvedParams.dojo);
  const instructors = await getDojoInstructors(resolvedParams.dojo);

  if (!dojo) {
    return <div>Dojo not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Instructors & Managers
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your dojo instructors and administrative staff
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card style={{ backgroundColor: "rgb(42, 46, 49)" }}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold">{instructors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "rgb(42, 46, 49)" }}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Instructors</p>
                <p className="text-2xl font-bold">
                  {instructors.filter((i) => i.role === "instructor").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "rgb(42, 46, 49)" }}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Managers</p>
                <p className="text-2xl font-bold">
                  {instructors.filter((i) => i.role === "admin").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "rgb(42, 46, 49)" }}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Black Belts</p>
                <p className="text-2xl font-bold">
                  {instructors.filter((i) => i.belt.color === "black").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor) => (
          <Card
            key={instructor.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-lg">
                      {instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{instructor.name}</CardTitle>
                    <p className="text-sm text-gray-500">{instructor.email}</p>
                  </div>
                </div>
                <Badge className={roleColors[instructor.role]}>
                  {roleLabels[instructor.role]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Belt Information */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${getBeltColorClass(
                      instructor.belt
                    )}`}
                  ></div>
                  <span className="text-sm font-medium">
                    {getBeltDisplayName(instructor.belt)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Age: {calculateAge(instructor.birthday)}
                </span>
              </div>

              {/* Payment Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {instructor.paymentStatus.amount}{" "}
                    {instructor.paymentStatus.currency}/month
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={
                      paymentStatusColors[instructor.paymentStatus.status]
                    }
                  >
                    {paymentStatusLabels[instructor.paymentStatus.status]}
                  </Badge>
                  {(instructor.paymentStatus.status === "overdue" ||
                    instructor.paymentStatus.status === "due_soon") && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                {instructor.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {instructor.phone}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {instructor.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined: {new Date(instructor.joinedAt).toLocaleDateString()}
                </div>
              </div>

              {/* Emergency Contact */}
              {instructor.emergencyContact && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Emergency Contact
                  </p>
                  <p className="text-sm text-gray-700">
                    {instructor.emergencyContact.name} (
                    {instructor.emergencyContact.relationship})
                  </p>
                  <p className="text-xs text-gray-500">
                    {instructor.emergencyContact.phone}
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
    </div>
  );
}
