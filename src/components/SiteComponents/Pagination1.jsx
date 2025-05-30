import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../SiteComponents/ui/pagination"


const Pagination1 = () => {
    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {/* <PaginationPrevious href="#"  /> */}
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className={'bg-primary-custom rounded-full p-1 text-white'} href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className={'bg-primary-custom rounded-full p-1 text-white'} href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className={'bg-primary-custom rounded-full p-1 text-white'} href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className={'bg-primary-custom rounded-full p-1 text-white'} href="#">20</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext  href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    )
}

export default Pagination1
