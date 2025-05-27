import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../SiteComponents/ui/form";
import { Input } from "../../SiteComponents/ui/input";

const SocialInputField = ({ control, name, label, placeholder, icon }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
              <span className="p-3 bg-gray-200 text-gray-500">
                {icon}
              </span>
              <Input
                type="url"
                placeholder={placeholder}
                className="flex-grow bg-transparent border-none focus:ring-0"
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SocialInputField;
