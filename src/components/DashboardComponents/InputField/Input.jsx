import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../SiteComponents/ui/form";
import { Input } from "../../SiteComponents/ui/input";

const InputField = ({ control, name, label, placeholder, type = "text" }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
