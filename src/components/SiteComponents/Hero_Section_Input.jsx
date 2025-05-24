import { Search } from "lucide-react";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

export default function SearchInterface() {
    return (
        <div className="flex gap-2 bg-white py-2 px-2 rounded-md items-center shadow-xl">
            <div className="flex items-center gap-2 px-3 rounded-md">
                <Search className=" text-gray-500" />
                <Input
                    className="px-2 bg-transparent border-none outline-none lg:text-md rounded-md text-sm  placeholder:text-muted-foreground"
                    placeholder="What are you looking for?"
                />
            </div>
            <Select>
                <SelectTrigger className="lg:w-[200px] md:w-[150px] w-[110px] border-none focus:ring-transparent lg:text-md md:text-medium text-sm">
                    <SelectValue placeholder="Choose Category" />
                </SelectTrigger>
                <SelectContent className="rounded-none lg:w-[200px] md:w-[190px] w-[180px]">
                    <SelectGroup>
                        <SelectItem value="admin">Admin & Customer Support</SelectItem>
                        <SelectItem value="ai">AI Services</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="consulting">
                            Business Formation & Consulting
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button
                size="lg"
                className=" lg:text-lg rounded-md text-sm bg-primary-custom/90 hover:bg-primary-custom"
            >
                Search
            </Button>
        </div>
    );
}
