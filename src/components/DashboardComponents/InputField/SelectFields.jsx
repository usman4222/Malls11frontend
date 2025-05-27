import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../SiteComponents/ui/form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../SiteComponents/ui/select";

const SelectField = ({ control, name, label, options, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full px-4 py-2 border rounded-md shadow-sm bg-white text-gray-700">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white border rounded-md shadow-lg">
                  {options.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option}
                      className="cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-100"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
