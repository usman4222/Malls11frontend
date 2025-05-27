import { Upload } from "lucide-react";
import { Button } from "../../SiteComponents/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../SiteComponents/ui/form";

export default function UploadBox({ control, name, label }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) field.onChange(file); // Store File object
                  }}
                  className="hidden"
                  id={`${name}-upload`}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById(`${name}-upload`)?.click()}
                >
                  Browse
                </Button>
              </div>
              {field.value && (
                <p className="mt-2 text-sm text-gray-600">{field.value.name}</p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
