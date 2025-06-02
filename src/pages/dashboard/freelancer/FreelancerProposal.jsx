import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  MapPin,
  Calendar,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
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
import { getMyProposals, withdrawFreelancerProposal } from "../../../actions/freelancers/freelancerAction";
import { useDispatch, useSelector } from "react-redux";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import { useAuth } from "../../../hooks/useAuth"
import DashboaordLoading from "../../../components/DashboardComponents/DashboaordLoading";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FreelancerProposal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const dispatch = useDispatch();
  const { freelancerProposals, loading } = useSelector(
    (state) => state.freelancerProposals
  );

  useEffect(() => {
    dispatch(getMyProposals());
  }, [dispatch]);

  const withDrawProposal = async (proposalId) => {
    const confirmed = window.confirm("Are you sure you want to withdraw this proposal?");
    if (!confirmed) return;

    try {
      await dispatch(withdrawFreelancerProposal(proposalId));
      toast.success("Proposal withdrawn successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to withdraw proposal");
    }
  };


  const filteredProposals = useMemo(() => {
    let filtered = [...(freelancerProposals || [])];

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.project_id?.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "newest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortBy === "cost-high") {
      filtered.sort((a, b) => {
        const costA = a.hourly_rate ?? a.fixed_price ?? 0;
        const costB = b.hourly_rate ?? b.fixed_price ?? 0;
        return costB - costA;
      });
    } else if (sortBy === "cost-low") {
      filtered.sort((a, b) => {
        const costA = a.hourly_rate ?? a.fixed_price ?? 0;
        const costB = b.hourly_rate ?? b.fixed_price ?? 0;
        return costA - costB;
      });
    }

    return filtered;
  }, [freelancerProposals, searchQuery, sortBy]);

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

        {loading ? (
          <div className="text-center py-10 text-muted-foreground"> <DashboaordLoading /></div>
        ) : filteredProposals.length > 0 ? (
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
              {filteredProposals.map((proposal) => (
                <TableRow key={proposal._id}>
                  <TableCell>
                    <div className="space-y-1 w-[27rem]">
                      <p className="text-xl font-[500]">{proposal.project_id?.title || "No Title"}</p>
                      <div className="flex gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {proposal.project_id?.location || "Unknown location"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {proposal.createdAt
                            ? formatRelativeTime(proposal.createdAt)
                            : "Unknown date"}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {proposal.hourly_rate != null
                          ? "Hourly Rate"
                          : proposal.fixed_price != null
                            ? "Fixed Rate"
                            : "Cost not available"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {proposal.hourly_rate != null
                          ? `$${proposal.hourly_rate}`
                          : proposal.fixed_price != null
                            ? `$${proposal.fixed_price}`
                            : "N/A"}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        proposal.status?.toLowerCase() === "pending" ? "warning" : "success"
                      }
                      className="rounded-full"
                    >
                      {proposal.status || "Unknown"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Link to={`/freelancer-dashboard/freelancer-proposal/editproposal/${proposal._id}`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button onClick={() => withDrawProposal(proposal._id)} variant="outline" size="icon">
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
