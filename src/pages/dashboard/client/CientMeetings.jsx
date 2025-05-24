import SectionWrapper from "@/components/SiteComponents/SectionWrapper";
import { Button } from "@/components/SiteComponents/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/SiteComponents/ui/dialog";
import { Input } from "@/components/SiteComponents/ui/input";
import { Label } from "@/components/SiteComponents/ui/label";

function CientMeetings() {
  return (
    <div className="bg-[#F0EFEC]  py-16 h-screen">
      <SectionWrapper className="max-w-2xl px-10 mt-10 ">
        <div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Meetings</h1>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-green-600 text-white hover:bg-white hover:border-green-600 hover:text-green-600"
                  >
                    Zoom Setting
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Zoom API Setting</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className=" items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Zoom Email
                      </Label>
                      <Input id="Email" value="" className="col-span-3" />
                    </div>
                    <div className="items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Zoom Client ID
                      </Label>
                      <Input id="name" value="" className="col-span-3" />
                    </div>
                    <div className="items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Client Secret
                      </Label>
                      <Input id="name" value="" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Get Authurize with Zoom</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="w-full bg-white mt-5 items-center px-6 py-7 rounded-md">
            <p className="text-gray-700">No Meetings found</p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default CientMeetings;
