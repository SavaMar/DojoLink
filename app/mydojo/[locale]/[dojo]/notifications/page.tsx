import { getDojoData } from "@/data/dojos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react";

interface NotificationsPageProps {
  params: Promise<{
    locale: string;
    dojo: string;
  }>;
}

const mockNotifications = [
  {
    id: "1",
    type: "success",
    title: "New member joined",
    message: "Sarah Johnson has joined your dojo",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Event capacity warning",
    message: "Weekly training session is 80% full",
    timestamp: "4 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Payment received",
    message: "Monthly membership fee received from Michael Chen",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "Event created",
    message: "New Year Seminar has been published",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Member inactive",
    message: "Emma Rodriguez hasn't attended in 2 weeks",
    timestamp: "3 days ago",
    read: true,
  },
];

const notificationIcons = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
};

const notificationColors = {
  success: "text-green-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
};

export default async function NotificationsPage({
  params,
}: NotificationsPageProps) {
  const resolvedParams = await params;
  const dojo = await getDojoData(resolvedParams.dojo);

  if (!dojo) {
    return <div>Dojo not found</div>;
  }

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your dojo activities
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-sm">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New member notifications</p>
              <p className="text-sm text-gray-500">
                Get notified when someone joins your dojo
              </p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Event capacity warnings</p>
              <p className="text-sm text-gray-500">
                Alert when events are nearly full
              </p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment notifications</p>
              <p className="text-sm text-gray-500">
                Notify about membership payments
              </p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Member activity alerts</p>
              <p className="text-sm text-gray-500">
                Warn about inactive members
              </p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {mockNotifications.map((notification) => {
          const Icon =
            notificationIcons[
              notification.type as keyof typeof notificationIcons
            ];
          return (
            <Card
              key={notification.id}
              className={notification.read ? "opacity-60" : ""}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Icon
                    className={`w-5 h-5 mt-0.5 ${
                      notificationColors[
                        notification.type as keyof typeof notificationColors
                      ]
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {notification.timestamp}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
