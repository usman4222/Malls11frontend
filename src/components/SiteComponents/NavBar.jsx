import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BellRing,
  ChevronDown,
  LayoutGrid,
  Menu,
  Search,
  X,
} from "lucide-react";
import { House } from 'lucide-react';
import { Contact } from 'lucide-react';
import { BadgeCheck } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
import {
  Palette,
  TrendingUp,
  Code,
  Headphones,
  DollarSign,
  Terminal,
  Film,
  BookOpen,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "../../components/SiteComponents/ui/sheet";
import SectionWrapper from "./SectionWrapper";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import logo from "../../assets/images/Landingpage/logo-edited.png"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleLogout } from "../../utils/logoutHelper";

function NavBar() {
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    categories: false,
    explore: false,
    pages: false,
  });
  const [activeTab, setActiveTab] = useState("/");
  const dropdownRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user || null);
  const token = user?.token
  const currentUser = user.currentUser

  const onLogoutClick = () => {
    handleLogout(dispatch, token);
  }

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = [
    {
      name: "Design & Creative",
      to: "/design-creative",
      icon: <Palette size={20} />,
    },
    {
      name: "Digital Marketing",
      to: "/digital-marketing",
      icon: <TrendingUp size={20} />,
    },
    {
      name: "Development & IT",
      to: "/development-it",
      icon: <Code size={20} />,
    },
    {
      name: "Music & Audio",
      to: "/music-audio",
      icon: <Headphones size={20} />,
    },
    {
      name: "Finance & Accounting",
      to: "/finance-accounting",
      icon: <DollarSign size={20} />,
    },
    {
      name: "Programming & Tech",
      to: "/programming-tech",
      icon: <Terminal size={20} />,
    },
    {
      name: "Video & Animation",
      to: "/video-animation",
      icon: <Film size={20} />,
    },
    {
      name: "Writing & Translation",
      to: "/writing-translation",
      icon: <BookOpen size={20} />,
    },
  ];

  const exploreDropdown = [
    { name: "Freelancers", to: "/frelancers" },
    { name: "Projects ", to: "/projects" },
    // { name: "Services", to: URLS.SERVICES },
  ];

  const Pages_Dropdown = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "faq", label: "FAQ" },
    { to: "/terms", label: "Terms And Conditions" },
  ];

  const handleTabClick = (to) => {
    setActiveTab(to);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#cfd3de] font-proxima">
      <ToastContainer />
      <SectionWrapper className="px-4 lg:py-7 py-4 flex justify-between items-center">
        <div className="pr-5">
          <Link to={"/"}>
            <img
              className="w-[70px] cursor-pointer"
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="hidden lg:flex flex-1 justify-between">
          <ul className="flex gap-5 justify-center items-center font-semibold text-md">
            <li className="relative">
              <div
                className="flex gap-2 items-center pr-5 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <LayoutGrid size={20} />
                <div className="group relative cursor-pointer">
                  <span className="flex items-center gap-1">
                    <p>Categories</p>
                    <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="mt-1 z-20 absolute left-0 bg-white shadow-lg w-[300px] top-full transition-all duration-300 ease-in-out"
                >
                  <ul className="py-2">
                    {categories.map((category) => (
                      <Link key={category.name} to={category.to}>
                        <li className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 cursor-pointer border-l-2 border-transparent hover:border-gray-400 transition-colors duration-300">
                          {category.icon}
                          <span>{category.name}</span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <div className="group relative cursor-pointer">
              <span className="flex items-center gap-1">
                <Link to="/blogs">Blogs</Link>
                <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </div>
            <div
              className="relative group z-20"
              onMouseEnter={() => setIsExploreDropdownOpen(true)}
              onMouseLeave={() => setIsExploreDropdownOpen(false)}
            >
              <div className="cursor-pointer">
                <span className="flex items-center gap-1">
                  Explore <ChevronDown size={15} />
                  <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </div>
              {isExploreDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="mt-1 absolute left-0 w-[200px] bg-white shadow-lg border border-gray-200"
                >
                  <ul>
                    {exploreDropdown.map((link) => (
                      <Link key={link.to} to={link.to}>
                        <li className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer border-l-2 border-transparent hover:border-blue-500 transition-colors duration-300">
                          {link.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div
              className="relative group z-20"
              onMouseEnter={() => setIsPagesDropdownOpen(true)}
              onMouseLeave={() => setIsPagesDropdownOpen(false)}
            >
              <div className="cursor-pointer">
                <span className="flex items-center gap-1">
                  Pages <ChevronDown size={15} />
                  <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </div>
              {isPagesDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="mt-1 absolute left-0 w-[200px] bg-white shadow-lg border border-gray-200"
                >
                  <ul>
                    {Pages_Dropdown.map((link) => (
                      <Link key={link.to} to={link.to}>
                        <li className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer border-l-2 border-transparent hover:border-blue-500 transition-colors duration-300">
                          {link.label}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ul>
          <div className="flex gap-8 justify-between items-center">
            <Search size={20} />

            {currentUser ? (

              <div>
                <Button onClick={onLogoutClick} size={"lg"} variant="link" className="px-3">
                  Logout
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Button className="outline-none bg-slate-300 text-black hover:bg-slate-300 hover:text-black">
                      <BellRing size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64  text-center">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="text-lg">
                      <DropdownMenuItem className="py-2 text-lg "><House />Dashboard</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg"> <Contact />Profile</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg"><BadgeCheck />Verify</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">    <SquarePlus />Project Submission</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="py-2 text-lg">My Project</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Bought Services</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Masseges</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Meeting</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">My Jobs</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Job Applicants</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Artificial Acount</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Favourite</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Job Submission</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Delete Profile</DropdownMenuItem>
                      <DropdownMenuItem className="py-2 text-lg">Change Password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="py-2 text-lg"
                        onClick={handleLogout}
                      >
                        Log out
                      </DropdownMenuItem>
                      <DropdownMenuItem></DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button size={"lg"} variant="link" className="p-0">
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  size={"lg"}
                  className="rounded-md bg-primary-custom hover:bg-primary-custom"
                >
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center lg:hidden">
          <Button size={"sm"} variant="link" className="p-0">
            <Link to="/">Login</Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-1">
                <Menu size={30} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">
                  <nav className="flex flex-col space-y-4">
                    <div>
                      <button
                        onClick={() => toggleMobileDropdown("categories")}
                        className="flex items-center justify-between w-full p-2 font-semibold"
                      >
                        Categories
                        <ChevronDown
                          size={20}
                          className={`transform transition-transform ${mobileDropdowns.categories ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {mobileDropdowns.categories && (
                        <div className="pl-4 space-y-2">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              to={category.to}
                              className={`flex items-center space-x-2 p-2  rounded-md  ${activeTab === category.to
                                ? "text-white bg-primary-custom  font-semibold"
                                : ""
                                }`}
                              onClick={() => handleTabClick(category.to)}
                            >
                              {category.icon}
                              <span>{category.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <Link
                      to="/"
                      className={`p-2 rounded-md  ${activeTab === "/blogs"
                        ? "text-white bg-primary-custom font-semibold"
                        : ""
                        }`}
                      onClick={() => handleTabClick("/blogs")}
                    >
                      Blogs
                    </Link>
                    <div>
                      <button
                        onClick={() => toggleMobileDropdown("explore")}
                        className="flex items-center justify-between w-full p-2 font-semibold"
                      >
                        Explore
                        <ChevronDown
                          size={20}
                          className={`transform transition-transform ${mobileDropdowns.explore ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {mobileDropdowns.explore && (
                        <div className="pl-4 space-y-2">
                          {exploreDropdown.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              className={`block p-2 rounded-md  ${activeTab === link.to
                                ? "text-white bg-primary-custom font-semibold"
                                : ""
                                }`}
                              onClick={() => handleTabClick(link.to)}
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => toggleMobileDropdown("pages")}
                        className="flex items-center justify-between w-full p-2 font-semibold"
                      >
                        Pages
                        <ChevronDown
                          size={20}
                          className={`transform transition-transform ${mobileDropdowns.pages ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {mobileDropdowns.pages && (
                        <div className="pl-4 space-y-2">
                          {Pages_Dropdown.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              className={`block p-2 rounded-md  ${activeTab === link.to
                                ? "text-white bg-primary-custom font-semibold"
                                : ""
                                }`}
                              onClick={() => handleTabClick(link.to)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </nav>
                </div>
                <div className="pt-4 border-t">
                  <Button
                    size={"lg"}
                    className="w-full bg-primary-custom/90 hover:bg-primary-custom"
                  >
                    <Link to="/">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default NavBar;
