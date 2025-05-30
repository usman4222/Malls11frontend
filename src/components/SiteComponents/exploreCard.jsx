import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SectionWrapper from "./SectionWrapper";
import img from "../../assets/images/explorer/bg-freelancer-1.webp"

function ExploreCard() {
  return (
    <div class=" ">
      <SectionWrapper className="relative">
        <img
          className="w-full h-[300px] object-cover sm:object-none"
          src={img}
          alt=""
        />
        <div className="absolute top-5 sm:left-20 left-6 mt-10">
          <h1 className="md:text-4xl text-2xl font-bold text-white px-4 sm:px-0">
            Experts Matter. Find Yours.
          </h1>
          <p className="text-white pt-5 px-4 sm:px-0 text-sm md:text-[16px]">
            Global experts with a broad range of areas of expertise.
          </p>
          <div className="mt-10 bg-white border mx-4 sm:mx-0 p-2 flex justify-between items-center shadow-xl rounded-xl">
            <div className="pl-2 flex justify-between  text-center items-center  sm:w-full">
              <Search size={20} />
              <Input
                className="py-2 border-none active:outline-none focus-visible:outline-none text-sm"
                type="text"
                placeholder="What are you looking for"
              />
            </div>
            <div>
              <Button
                class="bg-primary-custom text-white"
                style={{
                  padding: "10px 28px",
                  borderRadius: "10px",
                  fontSize: "16px",
                }}
                size={"xl"}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default ExploreCard;
