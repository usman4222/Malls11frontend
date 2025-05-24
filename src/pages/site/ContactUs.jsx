import { Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/SiteComponents/accordion";
import React, { useState } from "react";
import SectionWrapper from "../../components/SiteComponents/SectionWrapper";
import contact1 from "../../assets/images/Contact_us/bg-become-1.jpg"

function ContactUs() {
  const [activeDiv, setActiveDiv] = useState(null);
  return (
    <SectionWrapper>
      <div className="mt-4 sm:mt-10 md:mt-32 relative w-full">
        <img src={contact1} alt="" />
      </div>
      <div className="absolute file: top-28 sm:top-40 md:top-52 lg:top-80 px-4 md:px-14">
        <h4 className="text-white xl md:2xl lg:text-3xl font-semibold">
          Contact us
        </h4>
        <p className="text-white text-sm lg:text-lg md:py-4 ">
          We’d love to talk about how we can help you.
        </p>
      </div>
      <div className="flex justify-between">
        <div className="md:mb-48">
          <h5 className="text-xl  mt-4 md:mt8 lg:mt-16 px-16">
            Keep In Touch With Us.
          </h5>
          <div className="flex gap-5 mt-4 md:mt8 lg:mt-12 px-16 items-center">
            <Mail size={40} />
            <div>
              <h4>Email</h4>
              <p className="text-sm">support@uptiers.com</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="hidden lg:block">
          <div className="md:w-[630px] md:h-[400px] border absolute md:top-80 right-10 bg-white mx-6 rounded-xl">
            <h4 className="pt-10 px-10 text-xl font-medium">
              Tell us about yourself
            </h4>
            <p className="px-10 pt-6">
              Whether you have questions or you would just like to say hello,
              contact us.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-[35px] font-semibold text-center mt-10">
          Frequently Asked Questions
        </h4>
        <Accordion
          type="single"
          onValueChange={(val) => setActiveDiv(val)}
          collapsible
          className="sm:px-72 mt-14"
        >
          <AccordionItem
            value="item-1"
            className={`p-4 border-none ${
              activeDiv === "item-1" ? "bg-[#F1FCFA] " : "bg-transparent"
            }`}
          >
            <AccordionTrigger className="text-xl">
              What methods of payments are supported?
            </AccordionTrigger>
            <AccordionContent className="bg-[#F1FCFA]">
              Offering some of the top payment methods credit/debit cards, our
              3-D secured payment way can help improve customer satisfaction,
              safety and loyalty.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className={`p-4 border-none ${
              activeDiv === "item-2" ? "bg-[#F1FCFA] " : "bg-transparent"
            }`}
          >
            <AccordionTrigger className="text-lg">
              How do I get a receipt for my purchase?
            </AccordionTrigger>
            <AccordionContent className="bg-">
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
              activeDiv === "item-3" ? "bg-[#F1FCFA]" : "bg-transparent"
            }`}
          >
            <AccordionTrigger className="font-semibold">
            Which license do I need?
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
    </SectionWrapper>
  );
}

export default ContactUs;
