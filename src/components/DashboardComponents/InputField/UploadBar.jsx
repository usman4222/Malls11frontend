import { useController } from "react-hook-form";
import { Input } from "../../SiteComponents/ui/input";

export default function UploadBar({ control, name, label }) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-4">
        <Input type="file" className="w-72 border p-2 rounded-md" {...field} />
        <span className="text-sm text-muted-foreground">
          {field.value ? "Image selected" : "No image selected"}
        </span>
      </div>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}
