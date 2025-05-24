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

const BreadCrumb2 = ({startRoute, startRoutesName, page}) => {
  return (
    <div>
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={startRoute}>{startRoutesName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    </div>
  )
}

export default BreadCrumb2
