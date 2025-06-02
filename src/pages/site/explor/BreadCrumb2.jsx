import React from 'react'
import { Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/SiteComponents/ui/breadcrumb"

const BreadCrumb2 = ({ startRoute, startRoutesName, pages = [] }) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={startRoute}>{startRoutesName}</BreadcrumbLink>
          </BreadcrumbItem>

          {pages.map((page, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                {/* Last item is the current page */}
                {index === pages.length - 1 ? (
                  <BreadcrumbPage>{page}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href="#">{page}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb2
