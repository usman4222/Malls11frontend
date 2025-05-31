import { useEffect } from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../SiteComponents/ui/form";
import { Label } from "../../SiteComponents/ui/label";
import { Input } from "../../SiteComponents/ui/input";
import { Button } from "../../SiteComponents/ui/button";
import { PlusCircle, X } from "lucide-react";

const FIELD_TYPES = {
  awards: null,
};

const DynamicFieldsInput = ({ form }) => {
  const awards = form.watch("awards");

  useEffect(() => {
    // Ensure there's at least one award field
    if (!awards || awards.length === 0) {
      form.setValue("awards", [""]);
    }
  }, []);

  const handleChange = (index, value) => {
    const updated = [...(awards || [])];
    updated[index] = value;
    form.setValue("awards", updated);
  };

  const addField = () => {
    form.setValue("awards", [...(awards || []), ""]);
  };

  const removeField = (index) => {
    const updated = [...(awards || [])];
    if (updated.length > 1) {
      updated.splice(index, 1);
      form.setValue("awards", updated);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Awards</Label>
      {(awards || []).map((value, index) => (
        <FormField
          key={`award-${index}`}
          control={form.control}
          name={`awards.${index}`}
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 mt-2">
                <FormControl>
                  <Input
                    {...field}
                    value={value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleChange(index, e.target.value);
                    }}
                    placeholder="Enter award"
                  />
                </FormControl>
                {awards.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(index)}
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
      <Button type="button" variant="outline" onClick={addField}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Another Award
      </Button>
    </div>
  );
};

export default DynamicFieldsInput;
