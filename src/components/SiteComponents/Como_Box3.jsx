
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "../SiteComponents/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../SiteComponents/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../SiteComponents/ui/popover"
 
const frameworks = [
  {
    value: "next.js",
    label: "Basic",
  },
  {
    value: "sveltekit",
    label: "Converstaional",
  },
  {
    value: "nuxt.js",
    label: "Fluent",
  },
  {
    value: "remix",
    label: "Native Or Billingual",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
 

const Combo_Box = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
    <div>
      <h1 className="font-semibold text-2xl py-7">Englist Level</h1>
        <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Englist Level..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[245px] p-0">
        <Command>
          <CommandInput placeholder="Search Englist Level..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
  )
}

export default Combo_Box
