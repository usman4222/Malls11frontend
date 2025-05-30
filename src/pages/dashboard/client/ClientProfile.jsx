import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/SiteComponents/ui/button";
import { Input } from "@/components/SiteComponents/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/SiteComponents/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/SiteComponents/ui/select";
import { Textarea } from "@/components/SiteComponents/ui/textarea";
import { Calendar } from '@/components/SiteComponents/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/SiteComponents/ui/popover";
import { CalendarIcon, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/SiteComponents/ui/card";
import { Separator } from "@/components/SiteComponents/ui/separator";
import { useEffect, useState } from "react";
import { createUserProfile } from "@/actions/profile/profileAction";
import { useDispatch } from "react-redux";
import clientProfileSchema from "../../../schemas/clientProfileSchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import { uploadImageToCloudinary } from "../../../utils/uploadImage";
import { CategoriesSelectContent } from "../../../components/DashboardComponents/ClientDashboardCompoents/JobsCategories";
import { getAllCountries, getStatesOfCountry } from "../../../utils/geoData";
import ImageUploader from "../../../components/DashboardComponents/ImageUploader";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

function EditProfileForm() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const { token } = useAuth();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    setCountries(getAllCountries());
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const stateList = getStatesOfCountry(selectedCountry);
    setStates(stateList);
  };

  const form = useForm({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      categories: "",
      gender: "",
      website: "",
      whatsapp_no: "",
      country: "",
      state: "",
      description: "",
      instagramUrl: "",
      facebookUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      profile_image: null,
    },
  });


  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      let imageUrl = formData.profile_image || "";

      if (file) {
        setImageUploading(true);
        imageUrl = await uploadImageToCloudinary(file);
        setImageUploading(false);
      } else if (formData.profile_image && typeof formData.profile_image !== "string") {
        setImageUploading(true);
        imageUrl = await uploadImageToCloudinary(formData.profile_image);
        setImageUploading(false);
      } else {
        imageUrl = formData.profile_image || "";
      }

      const payload = {
        ...formData,
        profile_image: imageUrl,
      };

      await dispatch(createUserProfile(payload, token)).unwrap();

      toast.success("Profile updated successfully!");
      setFile(null);
      // reset();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Profile update failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="bg-[#F0EFEC] p-6">
      <ToastContainer />
      <p className="text-3xl font-semibold mb-6">Edit Profile</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4">
              <ImageUploader
                file={file}
                fileName={fileName}
                imagePreview={imagePreview}
                imageUploading={imageUploading}
                setFile={setFile}
                setFileName={setFileName}
                setImagePreview={setImagePreview}
                onFileChange={(file) => form.setValue("profile_image", file)}
              />
              {/* Website & Category */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField name="website" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourwebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="categories" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <CategoriesSelectContent />
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Country & State */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField name="country" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCountryChange({ target: { value } });
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="state" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={states.length === 0}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={states.length ? "Select state" : "Select country first"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

              </div>

              {/* Gender */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField name="gender" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="whatsapp_no" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+923451234567"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Description */}
              <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>About You *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write something about yourself..." {...field} className="min-h-[120px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Social Links */}
              {["instagramUrl", "facebookUrl", "linkedinUrl", "twitterUrl"].map((social) => (
                <FormField key={social} name={social} control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{social.replace("Url", "")}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter ${social.replace("Url", "")} URL`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              ))}

              <Button
                type="submit"
                className="mt-4 w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default EditProfileForm;