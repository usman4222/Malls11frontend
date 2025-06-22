import React, { useEffect, useState } from "react";
import { Button } from "../../components/SiteComponents/ui/button";

import {
  CalendarDays,
  Rocket,
  Search,
  MoveUpRightIcon,
  Plus,
  MoveUpRight,
} from "lucide-react";
import { Checkbox } from "../../components/SiteComponents/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/SiteComponents/ui/select";
import { Slider } from "../../components/SiteComponents/ui/slider";

import BreadCrumb2 from "../site/explor/BreadCrumb2";
import SectionWrapper from "../../components/SiteComponents/SectionWrapper";
import { Link } from "react-router-dom";
import { getAllProjects } from "../../actions/client/projectAction";
import { useDispatch, useSelector } from "react-redux";
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import SpinnerSquare from "../../components/SiteComponents/LoadingComponent/SpinnerSquare";



const terms = [
  {
    id: "terms1",
    label: "Business",
  },
  {
    id: "terms2",
    label: "Design & Creative",
  },
  {
    id: "terms3",
    label: "Development & IT",
  },
  {
    id: "terms4",
    label: "Digital Marketing",
  },
  {
    id: "terms5",
    label: "Lifestyle",
  },
];

const terms2 = [
  {
    id: "terms2_1",
    label: "English",
  },
  {
    id: "terms2_2",
    label: "French",
  },
  {
    id: "terms2_3",
    label: "Italian",
  },
  {
    id: "terms2_4",
    label: "Japanese",
  },
  {
    id: "terms2_5",
    label: "Spanish",
  },
];

function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const { allProjects } = useSelector((state) => state.allProjects);

  console.log("allProjects", allProjects);


  useEffect(() => {
    setLoading(true);
    dispatch(getAllProjects()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="font-proxima">
      <div className="mt-16 flex flex-col gap-5">
        <div className="bg-[#F1FCFA] py-5 sm:px-16 px-5">
          <SectionWrapper className="">
            <BreadCrumb2
              startRoute="/"
              startRoutesName="Home"
              page="Projects"
            />
          </SectionWrapper>
        </div>

        <div className=" bg-[#F1FCFA] sm:px-16 px-5">
          <SectionWrapper className='flex w-full justify-between gap-5  py-5'>
            {/* res */}
            <div className=" w-full max-w-[300px] hidden lg:block">
              <div className="w-full">
                <h2 className="text-[28px] font-semibold">Catergory</h2>
                <div className="flex flex-col gap-3 my-5">
                  {terms.map((term) => (
                    <div key={term.id} className="flex gap-3 items-center">
                      <Checkbox id={term.id} />
                      <label htmlFor={term.id} className="ml-2">
                        {term.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                style={{
                  color: "green",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
                variant="none"
              >
                Show More <Plus color="green" />
              </Button>
              <div className="mt-10 w-full  py-5">
                <h2 className="text-[28px] font-semibold">Project type</h2>
                <Select>
                  <SelectTrigger className="w-full mt-5 py-7 border">
                    <SelectValue placeholder="Fixed Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Fixed Project</SelectItem>
                    <SelectItem value="dark">Hourly Based Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full mt-5 border-y py-5">
                <h2 className="text-[28px] font-semibold">Price</h2>
                <Slider
                  className="mt-5 w-full"
                  defaultValue={[33]}
                  max={100}
                  min={0}
                  step={1}
                />
              </div>
              <div className="mt-5">
                <div>
                  <h2 className="text-[28px] font-semibold">Languages</h2>
                  <div className="flex flex-col gap-3 my-5">
                    {terms2.map((items) => {
                      return (
                        <div key={items.id} className="flex gap-3 items-center">
                          <Checkbox id={items.id} />
                          <label htmlFor={items.id} className="ml-2">
                            {items.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Button
                  style={{
                    color: "green",
                    backgroundColor: "transparent",
                    fontSize: "18px",
                  }}
                  variant="none"
                >
                  Show More <Plus color="green" />
                </Button>
              </div>
              <div className="w-full mt-10 border-y py-5">
                <h2 className="text-[28px] font-semibold">English Level</h2>
                <Select>
                  <SelectTrigger className="w-full mt-10 py-7 border">
                    <SelectValue placeholder="English Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Professional</SelectItem>
                    <SelectItem value="dark">Fluent</SelectItem>
                    <SelectItem value="red">Basic</SelectItem>
                    <SelectItem value="brown">Native or Billingual</SelectItem>
                    <SelectItem value="yellow">Convertional</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-5">
                  <Button className="flex gap-3  hover:bg-primary-custom/80  items-center bg-primary-custom p-4 w-full  rounded-md trasnsition-all duration-300 ">
                    Find Exports <MoveUpRight />
                  </Button>
                </div>
              </div>
            </div>
            <div className="max-w-5xl w-full">
              <div className="sm:flex sm:justify-between sm:items-center">
                <span>Show All Result</span>
                <div className="pt-4 sm:pt-0">
                  <Select>
                    <SelectTrigger className="w-[200px] py-3 border">
                      <SelectValue placeholder="Sort by (Default)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brwon">Sort by (Default)</SelectItem>
                      <SelectItem value="light">Newest</SelectItem>
                      <SelectItem value="dark">Oldest</SelectItem>
                      <SelectItem value="red">Random</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {
                loading ? (<SpinnerSquare />) : (
                  <>
                    <div className="grid grid-cols-1 w-full gap-5 mt-5">
                      {
                        allProjects?.length === 0 ? (
                          <div className="text-center py-10">No projects found</div>
                        ) : (
                          allProjects?.map((project) => (
                            <div key={project._id} className="bg-white p-3 shadow-lg border rounded-2xl">
                              <div className="flex flex-col md:flex-row gap-5 p-5">
                                <div className="flex flex-col gap-5 md:flex-row flex-grow">
                                  <div className="flex flex-col gap-2 flex-grow">
                                    <div>
                                      <h2 className="text-xl font-semibold">{project.title}</h2>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-2 py-2 text-gray-500 text-xs">
                                      <div className="bg-blue-700 rounded-full text-white py-1 px-3 w-fit">New</div>
                                      <p className="flex items-center">
                                        <span>
                                          {project.project_type === "fixed"
                                            ? "Fixed"
                                            : project.project_type === "hourly"
                                              ? "Hourly"
                                              : ""}
                                        </span>
                                        <span className="ml-2">
                                          • Posted {project.createdAt ? formatRelativeTime(project.createdAt) : 'some time ago'}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-5 md:mt-0">
                                      <div>
                                        <p className="font-semibold">
                                          {project.project_type === "fixed"
                                            ? project.fixed_price != null
                                              ? `$${Number(project.fixed_price).toFixed(2)}`
                                              : "Price not available"
                                            : project.hourly_rate?.min != null && project.hourly_rate?.max != null
                                              ? `$${project.hourly_rate.min} - $${project.hourly_rate.max}/hr`
                                              : "Rate not available"}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                          {project.project_type === "fixed"
                                            ? "Fixed Price"
                                            : project.project_type === "hourly"
                                              ? "Hourly Rate"
                                              : ""}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="font-semibold capitalize">
                                          {project.experience === "beginner"
                                            ? "Beginner"
                                            : project.experience === "intermediate"
                                              ? "Intermediate"
                                              : project.experience === "expert"
                                                ? "Expert"
                                                : "Experience not specified"}
                                        </p>
                                        <p className="text-gray-500 text-sm">Experience Level</p>
                                      </div>
                                    </div>
                                    <div className="text-gray-900 hidden sm:block mt-5">
                                      <p>{project.project_des}</p>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                      {Array.isArray(project.skills)
                                        ? project.skills.map((skill, idx) => (
                                          <span
                                            key={idx}
                                            className="bg-[#E9E9E9] text-gray-500 cursor-pointer mt-3 transition-all ease-in-out hover:text-black w-fit text-sm hover:scale-120 font-medium px-6 py-2 rounded-full"
                                          >
                                            {skill}
                                          </span>
                                        ))
                                        : project.category && (
                                          <span className="bg-primary-custom text-white cursor-pointer mt-3 transition-all ease-in-out hover:text-white w-fit text-sm hover:scale-120 font-medium px-6 py-2 rounded-full">
                                            {project.category}
                                          </span>
                                        )}
                                    </div>
                                    <Link className="mt-10" to={`/projects/project-details/${project._id}`}>
                                      <span className="bg-green-600 text-white cursor-pointer mt-3 transition-all ease-in-out hover:text-white w-fit text-sm hover:scale-120 font-medium px-6 py-3 rounded-xl">
                                        See More
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                      }
                    </div>
                  </>
                )
              }
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}

export default Projects;