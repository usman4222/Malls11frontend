import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/SiteComponents/ui/card";
import { FileText, CheckCircle, FileCheck, MessageSquare } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

export function FreelancerDashbaord() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {user?.currentUser?.role?.[0] === "freelancer"
            ? "Freelancer Dashboard"
            : user?.currentUser?.role?.[0] === "client"
            ? "Client Dashboard"
            : "Dashboard"}
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Posted"
          value="1"
          icon={<FileText className="h-5 w-5 text-gray-500" />}
        />
        <StatsCard
          title="Completed"
          value="0"
          icon={<CheckCircle className="h-5 w-5 text-gray-500" />}
        />
        <StatsCard
          title="Proposals"
          value="0"
          icon={<FileCheck className="h-5 w-5 text-gray-500" />}
        />
        <StatsCard
          title="Reviews"
          value="0"
          icon={<MessageSquare className="h-5 w-5 text-gray-500" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center text-gray-500">
              No data available
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center text-gray-500">
              No notifications
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Proposals</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex h-[100px] items-center justify-center text-gray-500">
              No proposals available
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
          </div>
          <div>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
