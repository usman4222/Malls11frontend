import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/SiteComponents/accordion";
import React, { useState } from "react";

function Faq() {
  const [activeDiv, setActiveDiv] = useState(null);

  // Function to handle click event

  return (
    <div className="mt-4 md:mt-20 lg:mt-40">
      <div className="flex justify-center ">
        <h className="text-[35px] font-semibold mx-4 ">Frequently Asked Questions</h>
      </div>
      <Accordion
        type="single"
        onValueChange={(val) => setActiveDiv(val)}
        collapsible
        className="mx-4 md:mx-56 lg:px-24 mt-14"
      >
        <AccordionItem
          value="item-1"
          className={`p-4 border-none ${
            activeDiv === "item-1" ? "bg-[#F1FCFA]" : "bg-transparent"
          }`}
        >
          <AccordionTrigger>
            What methods of payments are supported?
          </AccordionTrigger>
          <AccordionContent className="bg-[#F1FCFA]">
            Offering some of the top payment methods credit/debit cards, our 3-D
            secured payment way can help improve customer satisfaction, safety
            and loyalty.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className={`p-4 border-none ${
            activeDiv === "item-2" ? "bg-[#F1FCFA]" : "bg-transparent"
          }`}
        >
          <AccordionTrigger>
            How do I get a receipt for my purchase?
          </AccordionTrigger>
          <AccordionContent className="bg-[#F1FCFA]">
            <p>
              Receipts are automatically sent to buyer’s email stating the
              details of the transaction.
            </p>
            <p className="mt-4">
              This is primarily about notifying buyer after a purchase was made,
              our receipts are used as{" "}
              <span className="font-bold">
                {" "}
                handy reminders or a way to strengthen a relationship with our
                customer{" "}
              </span>{" "}
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
  );
}

export default Faq;
