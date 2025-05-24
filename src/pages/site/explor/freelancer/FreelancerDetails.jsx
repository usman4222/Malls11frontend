import SectionWrapper from "@/components/SectionWrapper";
import React from "react";
import BreadCrumb2 from "../BreadCrumb2";
import {
  ArrowUp,
  ArrowUpRight,
  Bug,
  Calendar,
  Check,
  CircleArrowOutUpRight,
  EllipsisVertical,
  FileCheck2,
  Files,
  Goal,
  Heart,
  Languages,
  MapPin,
  SquareArrowOutUpRight,
  Star,
  Target,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    image: "/assets/images/Freelancer/img1.webp",
    name: "Abdul Qayyum Khan",
    desc: "Graphic Designer and Video Editor",
    location: "Pakistan",
  },
  {
    image: "/assets/images/Freelancer/img2.webp",
    name: "Bhatti Graphic Designer",
    desc: "Graphic Designer",
    location: "Pakistan",
  },
  {
    image: "/assets/images/Freelancer/img3.webp",
    name: "Zain Ali",
    desc: "Video Editor",
    location: "Pakistan",
  },
  {
    image: "/assets/images/Freelancer/img4.webp",
    name: "Oyetunji Oluwafemi Clemet",
    desc: "Graphic Designer | Website Designer",
    location: "Nigeria",
  },
];

function FreelancerDetails() {
  return (
    <SectionWrapper>
      <div className="sm:flex justify-between sm:mt-28 mt-10 px-4">
        <div>
          <BreadCrumb2
            page="Ali"
            startRoute="/freelancers"
            startRoutesName="Freelancers"
          />
        </div>
        <div className="flex gap-3 items-center pt-4 sm:pt-0">
          <SquareArrowOutUpRight
            size={40}
            className="border p-3 rounded-full hover:bg-green-400 hover:text-white duration-300"
          />
          <p className="font-semibold">Share</p>
          <Heart
            size={40}
            className="border p-3 rounded-full hover:bg-green-400 hover:text-white duration-300"
          />
          <p className="font-semibold">Save</p>
          <TriangleAlert size={20} fill="gold" />
        </div>
      </div>
      <div className="relative">
        <div>
          <img
            className="mt-8 h-[300px] w-full"
            src="/assets/images/Freelancer/freelancer-detail-1.jpg"
            alt=""
          />
        </div>
        <div className="absolute top-20 left-4 sm:flex gap-6 items-center">
          <div>
            <img
              className="rounded-full h-28 w-28"
              src="/assets/images/Freelancer/1_ecdefc6d-16d0-478e-9863-bf3835b786a6-150x150.webp"
              alt=""
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold flex gap-2 items-center">
              Dominic Oigo{" "}
              <Check
                className="border rounded-full p-1 bg-green-500 text-white"
                size={25}
              />
            </h2>
            <p className="py-3 text-sm">Designer/writer</p>
            <div className="flex gap-3">
              <MapPin />
              <p className="font-medium text-sm">Kenya</p>
              <Calendar />
              <p className="font-medium text-sm">12 December 2003</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-14 flex gap-8 flex-wrap">
        <div className="flex gap-3">
        <div className="flex gap-6">
          <Target size={50} />
          <div>
            <p className="">Project Success</p>
            <p>0</p>
          </div>
        </div>

        <div className="flex gap-5">
          <Goal size={50} />
          <div>
            <p>Total Service</p>
            <p>0</p>
          </div>
        </div>
        </div>
        
        <div className="flex gap-3">
        <div className="flex gap-5">
          <Target size={50} />
          <div>
            <p>Completed Service</p>
            <p>0</p>
          </div>
        </div>

        <div className="flex gap-5">
          <FileCheck2 size={50} />
          <div>
            <p>In Queue service</p>
            <p>0</p>
          </div>
        </div>
        </div>
      </div>

      <div className="sm:flex px-4">
        <div className="border-b pb-20">
          <h2 className="text-xl font-semibold">About Freelancer</h2>
          <p className="max-w-[850px] pt-6 text-gray-500">
            Hello, I'm Misbah Akbar, your SEO expert! I can elevate your
            website's visibility to new heights. Whether it's On-page, Off-page,
            technical, or Local SEO, I've got you covered. My goal at Fiver is
            to grow the businesses of my clients. So If you want to increase
            your online presence at Google or another Search Engine then you are
            in the right place. I have been working for many clients in
            different markets, so I have the confidence to complete your task. I
            am offering an increase in DR, DA, on-page SEO, off-page SEO
            Technical SEO, and Local SEO.
          </p>
          {/* <p className="pt-16 text-gray-500">regards,</p>
          <p className="text-gray-500 py-3">Dominic Oigo</p>
          <p className="text-gray-500">https://DominicOfficial.gitgub.io/</p> */}
        </div>
        <div className="sm:absolute right-6 sm:top-[480px] border h-[350px] w-[350px] p-8 bg-white shadow-md mb-20 hidden lg:block">
          <h2 className="text-3xl font-bold">$20.00 - $60.00 / hr</h2>
          <div className="flex gap-2 pt-8 border-b pb-5">
            <MapPin size={20} />
            <p>Location</p>
            <p className="pl-36 text-sm">Kenya</p>
          </div>
          <div className="flex gap-3 py-5 border-b">
            <Files size={20} />
            <p>Type</p>
            <p className="pl-12 text-sm">Independent Freelancers</p>
          </div>
          <div className="flex gap-3 pb-6 pt-5 border-b">
            <Languages size={20} />
            <p>English Level</p>
            <p className="pl-16 text-sm">Professional</p>
          </div>
          <div className="flex pt-5 gap-3">
            <CircleArrowOutUpRight size={20} />
            <p>Gender</p>
            <p className="pl-36 text-sm">Male</p>
          </div>
          <Button className="mt-16 text-center mx-20 bg-green-400">
            SEND MESSAGE
          </Button>
        </div>
      </div>

      <div className="border-b max-w-[800px] mx-4 pb-20 pt-10">
        <h2 className="text-xl py-4 mb-2">Education</h2>
        <div className="flex">
          <div>
            <p className="border rounded-full text-[10px] py-2 px-2 text-center bg-green-100 text-green-600 font-bold">
              D
            </p>
            <div className="p-2">
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
            </div>
            <p className="border rounded-full text-[10px] py-2 px-2 text-center  bg-green-100 text-green-600 font-bold">
              D
            </p>
          </div>
          <div>
            <div className="ml-8">
              <span className="border rounded-full px-5 bg-orange-100">
                2022-2026
              </span>
              <h3 className=" font-semibold pt-4">Degree</h3>
              <p className="text-green-400 py-2">Software engineering </p>
              <p className="text-gray-500 text-sm">
                I AM A SOFTWARE ENGINEERING STUDENT A THE KISII UNIVERSITY IN
                KENYA.
              </p>
            </div>
            <div className="">
              <div className="ml-8 pt-8">
                <span className="border rounded-full px-5 bg-orange-100">
                  2022
                </span>
                <h3 className=" font-semibold pt-4">Diploma</h3>
                <p className="text-green-400 py-2">Graphic Design</p>
                <p className="text-gray-500 text-sm">
                  Graduated as a Decorated gtaphic designer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b max-w-[800px] mx-4 pb-20 pt-10">
        <h2 className="text-xl py-4 mb-2">Work & Experience</h2>
        <div className="flex">
          <div>
            <p className="border rounded-full text-[10px] py-2 px-2 text-center bg-green-100 text-green-600 font-bold">
              G
            </p>
            <div className="p-2">
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
              <p>
                <EllipsisVertical color="green" size={20} />
              </p>
            </div>
            <p className="border rounded-full text-[10px] py-2 px-2 text-center  bg-green-100 text-green-600 font-bold">
              R
            </p>
          </div>
          <div>
            <div className="ml-8">
              <span className="border rounded-full px-5 bg-orange-100">
                2021-2026
              </span>
              <h3 className=" font-semibold pt-4">Graphic Design</h3>
              <p className="text-green-400 py-2">Kissi University</p>
              <p className="text-gray-500 text-sm">
                I work as one of the most decorated graphic designers in the
                cumpus
              </p>
            </div>
            <div className="">
              <div className="ml-8 pt-8">
                <span className="border rounded-full px-5 bg-orange-100">
                  2023-2024
                </span>
                <h3 className=" font-semibold pt-4">Resume Writer</h3>
                <p className="text-green-400 py-2">Upwork</p>
                <p className="text-gray-500 text-sm">
                  Worked as a resume writer with direct clients and layer
                  through upwork as the intermediary between clients and I
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-4 pt-10 border-b pb-16">
        <h2 className="text-2xl py-4 mb-2">Awards</h2>
        <div className="flex">
          <div>
            <p className="border rounded-full text-[10px] py-2 px-3 text-center bg-green-100 text-green-600 font-bold">
              G
            </p>
          </div>
          <div className="ml-8">
            <span className="border rounded-full px-5 bg-orange-100">
              2022-2026
            </span>
            <h3 className=" font-semibold pt-4">Certificate of completion</h3>
            <p className="text-gray-500 text-sm py-2">
              Awarded a certificate of completion after completion my one year
              graphic designer course
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="px-4">
          <h2 className="text-xl pt-14">Services</h2>
          <div className="border sm:w-[280px] mt-6 rounded-sm overflow-hidden">
            <img
              src="/assets/images/Freelancer/INCREASE-DA-30-PLUS-1-495x370.webp"
              alt=""
            />
            <p className="px-6 pt-4 text-gray-500 text-sm">Digital Marketing</p>
            <h1 className="px-6 py-3 text-lg font-medium">
              I will increase domian
            </h1>
            <div className="flex gap-2 items-center px-6 pb-6 border-b">
              <Star className="" size={14} color="gold" fill="gold" />
              <p className="text-sm">0.0</p>
              <p className="text-gray-500 text-sm">(0 Rewiew)</p>
            </div>
            <div className="flex justify-between px-5 py-4">
              <div className="flex gap-3 items-center">
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src="/assets/images/Freelancer/1_ecdefc6d-16d0-478e-9863-bf3835b786a6-150x150.webp"
                  alt=""
                />
                <p>Misbah</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Starting at:</p>
                <p className="text-xl font-semibold">$20.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[120px] left-60">
          <Heart
            className="border p-3 rounded-full bg-white hover:bg-green-500 hover:text-white"
            size={40}
          />
        </div>
      </div>

      <div className="">
        <div className="px-4 rounded-md">
          <h1 className="text-2xl font-semibold mt-24 mb-10">
            Related Freelancers
          </h1>
          <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-8">
            {cards.map((item, index) => {
              return (
                <>
                  <div className="relative">
                    <div className="border p-6">
                      <div key={index}>
                        <div>
                          <img
                            className="w-20 h-20 rounded-full ml-20"
                            src={item.image}
                            alt=""
                          />
                          <h4 className="text-lg font-semibold text-center pt-6">
                            {item.name}
                          </h4>
                          <p className="text-center text-sm text-gray-500 border-b pb-8">
                            {item.desc}
                          </p>
                          <p className="pt-4 text-sm font-medium">Location:</p>
                          <p className="text-sm">{item.location}</p>
                        </div>
                      </div>
                      <Button className="px-16 py-8 mt-4 bg-green-100 text-green-500 hover:text-white hover:bg-green-500 duration-300">
                        View Profile <ArrowUpRight />
                      </Button>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Heart
                        className="border p-3 rounded-full bg-white hover:bg-green-500 hover:text-white"
                        size={40}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default FreelancerDetails;
