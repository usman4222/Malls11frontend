import { useState } from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../SiteComponents/ui/form";
import { Label } from "../../SiteComponents/ui/label";
import { Input } from "../../SiteComponents/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../SiteComponents/ui/select";
import { Button } from "../../SiteComponents/ui/button";
import { PlusCircle, X } from "lucide-react";

const FIELD_TYPES = {
  awards: null,
};

const DynamicFieldsInput = ({ form }) => {
  const [fields, setFields] = useState({
    awards: [""],
  });

  const handleChange = (index, type, value) => {
    setFields((prev) => {
      const updated = [...prev[type]];
      updated[index] = value;
      return { ...prev, [type]: updated };
    });
  };

  const addField = (type) => {
    setFields((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
  };

  const removeField = (index, type) => {
    if (fields[type].length > 1) {
      setFields((prev) => {
        const updated = prev[type].filter((_, i) => i !== index);
        return { ...prev, [type]: updated };
      });
    }
  };

  return (
    <div className="space-y-6">
      {Object.keys(fields).map((type) => (
        <div key={type}>
          <Label>{type.charAt(0).toUpperCase() + type.slice(1)}</Label>
          {fields[type].map((value, index) => (
            <FormField
              key={`${type}-${index}`}
              control={form.control}
              name={`${type}.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 mt-2">
                    {FIELD_TYPES[type] ? (
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                          handleChange(index, type, val);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${type}`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FIELD_TYPES[type].map((item) => (
                            <SelectItem key={item} value={item.toLowerCase()}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <FormControl>
                        <Input
                          {...field}
                          value={value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleChange(index, type, e.target.value);
                          }}
                          placeholder={`Enter ${type}`}
                        />
                      </FormControl>
                    )}
                    {fields[type].length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeField(index, type)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => addField(type)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Another {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DynamicFieldsInput;
