import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/SiteComponents/accordion";
import {
  Check,
  CircleDollarSign,
  IdCard,
  LaptopMinimalCheck,
  Medal,
  Minus,
  MoveUpRight,
  Plus,
  ShieldCheck,
} from "lucide-react";
import React, { useState } from "react";
import SectionWrapper from "../../components/SiteComponents/SectionWrapper";
import { Button } from "../../components/SiteComponents/ui/button";
import about_hero from "../../assets/images/about_us/about-bg-1.webp"
import about1 from "../../assets/images/about_us/about5-1.webp"
import about2 from "../../assets/images/about_us/slider62.webp"
import about3 from "../../assets/images/about_us/h15-3-1.webp" 
import about4 from "../../assets/images/about_us/about5-1.webp"
import about5 from "../../assets/images/about_us/i.webp"
import about6 from "../../assets/images/about_us/b1-1.webp"
import about7 from "../../assets/images/about_us/b2-1.webp"
import about8 from "../../assets/images/about_us/b3-1.webp"
import about9 from "../../assets/images/about_us/b4-1.webp"
import about10 from "../../assets/images/about_us/b5-1.webp"
import about11 from "../../assets/images/about_us/b6-1.webp"


function AboutUs() {
  const [activeDiv, setActiveDiv] = useState(null);

  const MarketPlace = [
    {
      heading: "Our Journey",
      discription:
        "Founded with a vision to streamline the hiring process and empower freelancers to showcase their talents, Uptiers Limited has emerged as a leading platform in the freelance industry.",
    },
    {
      heading: "Our Purpose",
      discription:
        "We believe that everyone should have the opportunity to thrive in the gig economy. By offering a platform that fosters collaboration and growth, we strive to empower freelancers and businesses alike.",
    },
    {
      heading: "Our Goals",
      discription:
        "Our main goal is to revolutionize the way freelancers and businesses connect and work together. By providing a user-friendly platform with a wide range of services, we aim to create meaningful and successful partnerships.",
    },
    {
      heading: "Our Team",
      discription:
        "Backed by a team of dedicated professionals, Uptiers Limited ensures that every user receives top-notch support and assistance throughout their journey on our platform.",
    },
    {
      heading: "Our Offerings",
      discription:
        "From graphic design to web development, and everything in between, Uptiers Limited offers a comprehensive range of freelance services to cater to the diverse needs of our clients.",
    },
    {
      heading: "Customer Opinions",
      discription:
        "“Uptiers Limited has made it incredibly easy for me to find talented freelancers for my projects. The platform is intuitive and the support team is always ready to help.” – Sarah S., satisfied client",
      list_1: "Connect to freelancers with proven business experience",
      list_2:
        "Get matched with the perfect talent by a customer success manager",
      list_3: "Unmatched quality of remote, hybrid, and flexible jobs",
      tick: <Check />,
    },
    {
      heading: "Achievements",
      discription:
        "We are proud to have facilitated numerous successful collaborations between freelancers and businesses, resulting in excellent outcomes for both parties.",
    },
    {
      heading: "Call to Action",
      discription:
        "Join Uptiers Limited today and experience the effortless way to connect with freelancers or find your next project opportunity. Let’s work together to achieve greatness!",
    },
  ];
  return (
    <SectionWrapper className=" font-proxima px-20">
      <div className="">
        <div className="relative">
          <div className="hidden sm:block">
            <img
              className="mt-4 sm:mt-6 md:mt-10 "
              src={about_hero}
              alt=""
            />
          </div>
          <div className="absolute left-1 sm:left-6 md:left-12 lg:left-20  top-0 sm:top-4 md:top-12 lg:top-20 text-white ">
            <h1 className=" text-lg md:text-2xl lg:text-3xl font-bold">
              About Us
            </h1>
            <p className="text-sm md:text-24 md:mt-3 ">
              Find the world best freelance Platform.
            </p>
          </div>
        </div>

        <div className="gap-20 lg:flex mt-20 ">
          <div>
            <img
              className="w-full px-4 "
              src={about1}
              alt=""
            />
            <img
              className="w-full px-4 mt-10"
              src={about2}
              alt=""
            />
            <img
              className="w-full px-4 mt-10"
              src={about3}
              alt=""
            />
            <img
              className="w-full px-4 mt-10"
              src={about4}
              alt=""
            />
          </div>
          <div className="max-w-lg">
            <h1 className="text-3xl font-semibold mt-40">
              Join World's Best Marketplace for Workers
            </h1>
            <p className="text-md mt-10">
              At Uptiers Limited, we are a talent marketplace platform dedicated
              to bridging the gap between freelancers and business clients. Our
              mission is to provide a seamless and efficient way for businesses
              to connect with skilled freelancers from various industries
            </p>

            {MarketPlace.map((item) => {
              return (
                <div className="">
                  <h1 className="font-semibold">{item.heading}</h1>
                  <p className="my-8 text-wrap">{item.discription}</p>
                  <p className="flex gap-4">
                    {item.tick}
                    {item.list_1}
                  </p>
                  <p className="flex gap-4 py-3">
                    {item.tick}
                    {item.list_2}
                  </p>
                  <p className="flex gap-4">
                    {item.tick}
                    {item.list_3}
                  </p>
                </div>
              );
            })}
            <Button
              color="green"
              variant="outline"
              style={{
                padding: " 30px 40px",
                borderRadius: "5px 5px 5px 5px",
                fontSize: "18px",
                outline: "solid 1px black",
                color: "green",
                fontWeight: "semibold",
              }}
            >
              Get Started
              <MoveUpRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-wrap flex justify-around py-20 border-b-2">
        <div className="px-10">
          <h3 className="text-4xl font-bold ">890M</h3>
          <p className="py-2">Total Freelancer</p>
        </div>
        <div className="px-10">
          <h3 className="text-4xl font-bold">750M</h3>
          <p className="py-2">Positive Review</p>
        </div>
        <div className="px-10">
          <h3 className="text-4xl font-bold">98M</h3>
          <p className="py-2">Order Received</p>
        </div>
        <div className="px-10">
          <h3 className="text-4xl font-bold ">336M</h3>
          <p className="py-2">Projects Completed</p>
        </div>
      </div>
      <div className=" mx-4 md:flex justify-between pt-20 gap-48">
        <div className="pt-20">
          <h3 className="text-3xl  font-bold">
            A whole world of freelance talent at your fingertips
          </h3>

          <div className="flex gap-4 py-14 items-start">
            <Medal size={30} />
            <div>
              <h4 className="text-xl">Proof of quality</h4>
              <p>
                Check any pro’s work samples, client reviews, and identity
                verification.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CircleDollarSign size={30} />
            <div>
              <h4 className="text-xl">No cost until you hire</h4>
              <p>Start with zero upfront cost and a job guarantee..</p>
            </div>
          </div>

          <div className="flex gap-4 py-14">
            <ShieldCheck size={30} />
            <div>
              <h4 className="text-xl">Safe and secure</h4>
              <p>Our team verify all our users on the platform</p>
            </div>
          </div>
        </div>

        <div>
          <img className="" src={about5} alt="" />
        </div>
      </div>
      <div className="bg-[url(/assets/images/about_us/h7-bg2-1.jpg)] px-5 py-5 bg-cover mt-20 flex  justify-between ">
        <div className="pt-4 sm:pt-16 md:pt-36 lg:pt-56 ">
          <h3 className="text-3xl font-semibold ">
            Find the talent needed to get your business growing.
          </h3>
          <p className="text-sm py-6 mb-6">
            Experience the effortless way to connect with freelancers
          </p>
          <Button
            color="green"
            variant="outline"
            style={{
              padding: "30px 40px",

              borderRadius: "5px 5px 5px 5px",
              fontSize: "18px",
              outline: "solid 1px black",
              color: "green",
              fontWeight: "semibold",
            }}
          >
            Get Started
            <MoveUpRight />
          </Button>
        </div>
        <div className="flex flex-wrap  gap-6">
          <div>
            <div className="border w-64 px-20 py-14 rounded-2xl bg-white ">
              <p className="text-4xl font-bold">4.9/5</p>
              <p className="pt-6">Clients rate professionals on Freeio</p>
            </div>
            <div className="border w-64 px-10 py-14 mt-6 rounded-2xl bg-white h-64">
              <p className="text-4xl font-bold text-center">98%</p>
              <p className="pt-6 text-center">
                98% of customers are satisfied through to see their freelancers
              </p>
            </div>
          </div>
          <div className="border w-64 py-14  rounded-2xl bg-white h-56 mt-3 md:mt-36">
            <p className="text-4xl font-bold text-center">Award</p>
            <p className="pt-6 text-center px-14">
              G2’s 2022 Best Software Awards
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-[url(/assets/images/about_us/h3-bg3-1.png)] mx-4 mt-32 bg-cover">
          <h3 className="text-4xl font-semibold pt-52 px-6">
            Need something done?
          </h3>
          <p className="p-6">Most viewed and all-time top-selling services</p>
          <div className="flex flex-wrap gap-6 pt-10 pb-40 px-6">
            <div className="border w-[300px] h-[250px] bg-white p-8 rounded-xl">
              <IdCard size={40} />
              <h4 className="text-xl pt-4">Post a Project</h4>
              <p className="text-gray-700 pt-4">
                It’s free and easy to post a Project. Simply fill in a title,
                description and set your budget.
              </p>
            </div>
            <div className="border w-[300px] h-[250px] bg-white p-8 rounded-xl">
              <LaptopMinimalCheck size={40} />
              <h4 className="text-xl pt-4">Choose freelancers</h4>
              <p className="text-gray-700 pt-4">
                Our freelancers are customer-centric, dedicated to their jobs.
              </p>
            </div>
            <div className="border w-[300px] h-[250px] bg-white p-8 rounded-xl">
              <ShieldCheck size={40} />
              <h4 className="text-xl pt-4">Pay safely</h4>
              <p className="text-gray-700 pt-4">
                Pay securely with our 3-D enabled payment system.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-32">
        <div className=" text-center">
          <p className="text-center text-4xl font-semibold">
            {" "}
            Frequently Asked Questions
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur.</p>
        </div>

        <Accordion
          type="single"
          onValueChange={(val) => setActiveDiv(val)}
          collapsible
          className="mt-20"
        >
          <AccordionItem
            value="item-1"
            className={`p-4 border-none ${
              activeDiv === "item-1" ? "bg-herobackground " : "bg-transparent"
            }`}
          >
            <AccordionTrigger>
              What methods of payments are supported?
            </AccordionTrigger>
            <AccordionContent className="bg-herobackground">
              Offering some of the top payment methods credit/debit cards, our
              3-D secured payment way can help improve customer satisfaction,
              safety and loyalty.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className={`p-4 border-none ${
              activeDiv === "item-2" ? "bg-herobackground " : "bg-transparent"
            }`}
          >
            <AccordionTrigger>
              How do I get a receipt for my purchase?
            </AccordionTrigger>
            <AccordionContent className="bg-herobackground">
              <p>
                Receipts are automatically sent to buyer’s email stating the
                details of the transaction.
              </p>
              <p className="mt-4">
                This is primarily about notifying buyer after a purchase was
                made, our receipts are used as
                <span className="font-bold">
                  handy reminders or a way to strengthen a relationship with our
                  customer
                </span>
                with our promotion thanking you for your purchase and offering a
                discount on their next purchase.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className={`p-4 border-none ${
              activeDiv === "item-3" ? "bg-herobackground " : "bg-transparent"
            }`}
          >
            <AccordionTrigger>
              How do I get access to a service I purchased?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Sign in to your account with uptiers account used for the
                purchase.
              </p>
              <p className="mt-4">
                After signing in, click on the bought services. You will see the
                list of services you purchased.{" "}
              </p>
              <p className="mt-4">
                Click on the view history and the details will be displayed.
              </p>
              <p className="mt-4">
                When you are satisfied with a freelancer’s services, you can
                update his/her status from Hired to Completed.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-20">
        <h1 className="text-center">Trusted by the world’s best</h1>
        <div className="flex items-center max-w-6xl justify-between mx-auto mt-10">
          <img className="hiden" src={about6} alt="" />
          <img  src={about7} alt="" />
          <img src={about8} alt="" />
          <img className="hidden sm:block" src={about9} alt="" />
          <img className="hidden xl:block" src={about10} alt="" />
          <img className="hidden 2xl:block" src={about11} alt="" />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default AboutUs;
