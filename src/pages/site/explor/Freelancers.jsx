import React, { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import BreadCrumb2 from "./BreadCrumb2";
import { Input } from "@/components/ui/input";
import { HeartIcon, MoveUpRight, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Combo_Box2 from "./Combo_Box2";
import Combo_Box3 from "./Como_Box3";
import Combo_Box4 from "./Como_Box4";
import Pagination1 from "./Pagination1";
import { Separator } from "@/components/ui/separator";
import ExploreCard from "@/components/exploreCard";

const frameworks = [
  {
    value: "next.js",
    label: "Agency Freelancer",
  },
  {
    value: "sveltekit",
    label: "Independent Freelancer",
  },
  {
    value: "New Rising Talent",
    label: "Nuxt.js",
  },
];

const dummyData = [
  {
    id: 1,
    profileImage:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
    name: "Misbah Akbar",
    role: "SEO",
    location: "Pakistan",
    rate: "$5.00 / hr",
    featured: true,
    verified: true,
  },
  {
    id: 2,
    profileImage:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",

    name: "Ahmed Raza",
    role: "Web Developer",
    location: "India",
    rate: "$10.00 / hr",
    featured: false,
    verified: true,
  },
  {
    id: 3,
    profileImage:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
    name: "Fatima Khan",
    role: "Content Writer",
    location: "Bangladesh",
    rate: "$8.00 / hr",
    featured: true,
    verified: false,
  },
  {
    id: 3,
    profileImage:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
    name: "Fatima Khan",
    role: "Content Writer",
    location: "Bangladesh",
    rate: "$8.00 / hr",
    featured: true,
    verified: false,
  },
  {
    id: 3,
    profileImage:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
    name: "Fatima Khan",
    role: "Content Writer",
    location: "Bangladesh",
    rate: "$8.00 / hr",
    featured: true,
    verified: false,
  },
  {
    id: 3,
    profileImage:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
    name: "Fatima Khan",
    role: "Content Writer",
    location: "Bangladesh",
    rate: "$8.00 / hr",
    featured: true,
    verified: false,
  },
  {
    id: 4,
    profileImage:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
    name: "Fatima Khan",
    role: "Content Writer",
    location: "Bangladesh",
    rate: "$8.00 / hr",
    featured: true,
    verified: false,
  },
  {
    id: 5,
    profileImage:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
    name: "Fatima Khan",
    role: "Content Writer",
    location: "Bangladesh",
    rate: "$8.00 / hr",
    featured: true,
    verified: false,
  },
];

const Freelancers = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [favorites, setFavorites] = useState([]);

  const Datalength = `Showing 1 – 12 of ${dummyData.length} results`;

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };
  return (
    <div className="mt-16 flex gap-5 flex-col">
      <div className=" py-6 bg-[#F1FCFA] ">
        <SectionWrapper className="sm:px-20 px-10">
          <BreadCrumb2
            startRoute={"/"}
            startRoutesName={"Home"}
            page={"Freelancers"}
          />
        </SectionWrapper>
      </div>
      <ExploreCard />
      <div className=" bg-[#F1FCFA] w-full font-proxima">
        <SectionWrapper className='flex sm:px-20 px-6'>
          <div className="flex justify-between py-10 items-start w-full">
            <SectionWrapper className=" flex-col lg:flex hidden">
              <div className=" flex-col w-full hidden sm:block">
                <h1 className="text-xl font-bold pb-5 ">Categories</h1>
                <span className="flex py-6 gap-3">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Admin & Customer Support
                    </label>
                  </div>
                </span>

                <span className="flex pb-6 gap-3">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      AI Services
                    </label>
                  </div>
                </span>

                <span className="flex pb-6 gap-3">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Business
                    </label>
                  </div>
                </span>

                <span className="flex pb-6 gap-3">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Consulting
                    </label>
                  </div>
                </span>

                <span className="flex pb-6 gap-3 ">
                  <Checkbox id="terms1" />
                  <div className="grid leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Design & Creative
                    </label>
                  </div>
                </span>
                <Separator />
                <div>
                  <span className="flex py-7 gap-3">
                    <Checkbox id="terms1" />
                    <div className="grid leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Afghanistan
                      </label>
                    </div>
                  </span>

                  <span className="flex pb-7 gap-3">
                    <Checkbox id="terms1" />
                    <div className="grid leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Albania
                      </label>
                    </div>
                  </span>

                  <span className="flex pb-7 gap-3">
                    <Checkbox id="terms1" />
                    <div className="grid leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Algiria
                      </label>
                    </div>
                  </span>

                  <span className="flex pb-7 gap-3">
                    <Checkbox id="terms1" />
                    <div className="grid leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Andora
                      </label>
                    </div>
                  </span>

                  <span className="flex pb-7 gap-3 border-b-2 ">
                    <Checkbox id="terms1" />
                    <div className="grid leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Algora
                      </label>
                    </div>
                  </span>
                </div>

                <div className="pt-10  pb-7 w-full">
                  <h1 className="font-semibold text-2xl pb-7">Types</h1>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Types"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[245px] p-0">
                      <Command>
                        {/* <CommandInput placeholder="Search Types..." /> */}
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {framework.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <Separator />
                <div className="pb-7">
                  <Combo_Box2 />
                </div>

                <Separator />
                <div>
                  <Combo_Box3 />
                </div>
              </div>

              <div className="mt-10 w-full hidden sm:block">
                <Button
                  className="px-20 mb-10 bg-[#35ba62] text-white hover:border-[#35ba62]"
                  variant="outline"
                >
                  Find Listining
                </Button>
              </div>
            </SectionWrapper>

            <div className="max-w-[1100px] mx-auto sm:pl-10 w-full h-auto ">
              <div className="flex justify-between items-center pb-10">
                <h1>{Datalength}</h1>
                <Combo_Box4 />
              </div>
              <div className=" grid w-full sm:grid-cols-2  gap-6  mx-auto">
                {dummyData.map((item) => (
                  <div
                    key={item.id}
                    className="w-full group border rounded-lg shadow-md px-8 py-8 bg-white overflow-hidden relative transition-transform "
                  >
                    {item.featured && (
                      <span className="absolute top-4 -rotate-45 -left-8 bg-primary-custom text-white px-8 py-1 text-md rounded">
                        Featured
                      </span>
                    )}

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className=""
                    >
                      <span
                        className={` rounded-full p-[6px] absolute top-5 right-5 ${
                          favorites.includes(item.id)
                            ? "bg-primary-custom text-white"
                            : "bg-transparent border text-black"
                        }`}
                      >
                        <HeartIcon size={18} />
                      </span>
                    </button>

                    <div className="flex justify-center">
                      <img
                        src={item.profileImage}
                        alt={`${item.name} profile`}
                        className="w-20 h-20 rounded-full border-2 border-gray-200"
                      />
                    </div>

                    {/* Profile Details */}
                    <div className="text-center mt-4">
                      <h2 className="text-lg font-bold">{item.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {item.role}
                      </p>
                    </div>

                    <Separator className="mt-4" />

                    {/* Location and Rate */}
                    <div className="max-w-xs flex justify-between mt-4 items-start">
                      <div className="text-sm text-gray-700 flex flex-col gap-1 items-start">
                        <p className="font-semibold">Location:</p>{" "}
                        <p> {item.location}</p>
                      </div>
                      <div className="text-sm text-gray-700 flex flex-col gap-1 items-start">
                        <p className="font-semibold">Rate:</p>{" "}
                        <p> {item.rate}</p>
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <Button className="mt-4 py-6 w-full bg-green-100 duration-500 text-primary-custom  rounded group-hover:bg-primary-custom group-hover:text-white transition-all">
                      View Profile
                      <MoveUpRight />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="py-10">
                <Pagination1 />
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>

      {/* login page */}
    </div>
  );
};

export default Freelancers;
