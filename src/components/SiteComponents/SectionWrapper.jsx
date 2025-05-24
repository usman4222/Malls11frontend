import clsx from "clsx";
import React from "react";

function SectionWrapper({ children, className }) {
  return (
    <div className={clsx("max-w-[1550px] mx-auto ", className)}>
      {children}
    </div>
  );
}

export default SectionWrapper;
