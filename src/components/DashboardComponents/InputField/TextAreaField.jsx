import { useController } from "react-hook-form";
import { Textarea } from "../../SiteComponents/ui/textarea";

export default function TextareaField({ control, name, label, placeholder, rows = 4 }) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Textarea
        {...field}
        placeholder={placeholder}
        rows={rows}
        className={`block w-full border rounded-md p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}
