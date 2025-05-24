import { Input } from "@/components/SiteComponents/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/SiteComponents/ui/select";
import { Search } from "lucide-react";

function ClientServices() {
  return (
    <div className="bg-[#F0EFEC] ">
      <div className=" min-h-screen  ">
        <div className="px-10 py-14">
          <h2 className="text-3xl py-5 font-semibold">My Services</h2>

          <div className=" flex justify-between bg-white rounded-md shadow-sm p-8">
            <div className="relative w-1/3 mb-6">
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              <Input placeholder="Search ..." className="pl-8" />
              <div className="pt-5">
                <div className="text-gray-500 text-sm">
                  No service order found.
                </div>
              </div>
            </div>

            <div className=" justify-between items-center mb-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientServices;
