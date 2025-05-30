import { useState } from "react";
import {
  Search,
  ChevronDown,
  Pencil,
  Trash2,
  MapPin,
  Grid,
  Calendar,
  Mail,
} from "lucide-react";
import { Button } from "../../../components/SiteComponents/ui/button";
import { Input } from "../../../components/SiteComponents/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/SiteComponents/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/SiteComponents/ui/table";
import { Badge } from "../../../components/SiteComponents/ui/badge";
import { Card } from "../../../components/SiteComponents/ui/card";

// Dummy data
const projects = [
  {
    id: 1,
    title: "Frontend",
    proposals: 0,
    category: "Design & Creative",
    location: "Pakistan",
    postedAt: new Date(),
    costMin: 1220,
    costMax: 1800,
    rateType: "Hourly rate",
    status: "Pending",
  },
  {
    id: 2,
    title: "Backend Development",
    proposals: 3,
    category: "Web Development",
    location: "United States",
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    costMin: 2500,
    costMax: 5000,
    rateType: "Fixed price",
    status: "Active",
  },
  {
    id: 3,
    title: "PHP development",
    proposals: 3,
    category: "Web Development",
    location: "Canada",
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    costMin: 500,
    costMax: 1000,
    rateType: "Fixed price",
    status: "Active",
  },
];

function FreelancerProposal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-10 bg-[#F0EFEC] h-[100vh]">
      <h1 className="text-3xl font-semibold mb-8">Manage Proposals</h1>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="cost-high">Highest Cost</SelectItem>
                <SelectItem value="cost-low">Lowest Cost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Cost/Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="space-y-1 w-[27rem]">
                      <p className="text-xl font-[500]">Ahad Ali</p>
                      <div className="font-medium">{project.title}</div>
                      <div className="flex gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>
                            <MapPin className="h-4 w-4" />
                          </span>
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>
                            <Calendar className="h-4 w-4" />
                          </span>
                          {formatTimeAgo(project.postedAt)}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        ${project.costMin.toLocaleString()} - $
                        {project.costMax.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project.rateType}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "Pending" ? "warning" : "success"
                      }
                      className="rounded-full"
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            You don't have any Proposals yet.
          </div>
        )}
      </Card>
    </div>
  );
}

export default FreelancerProposal;
