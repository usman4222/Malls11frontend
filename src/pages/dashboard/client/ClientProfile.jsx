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

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-blue-500");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("border-blue-500");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
      setImagePreview(URL.createObjectURL(files[0]));
    }
    event.currentTarget.classList.remove("border-blue-500");
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


              <div className="flex flex-col justify-between w-full px-10 ">
                <div className="flex flex-col">
                  <div className="flex justify-between w-full">
                    <div>
                      {/* <label
                        htmlFor="addClass"
                        className="font-montserrat text-sm font-medium leading-5 text-[#344054]"
                      >
                        Profile Picture
                      </label> */}
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center p-[16px_24px] w-full h-[188px] border-2 border-[#CBC5FF] border-dashed rounded-[12px] cursor-pointer bg-[rgba(238,236,255,0.40)] hover:bg-gray-100"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload profile image</span>{" "}
                            or drag and drop
                          </p>
                          {fileName ? (
                            <p className="mt-2 text-gray-700">
                              Selected file: {fileName}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          )}
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile) {
                              setFile(selectedFile);
                              setFileName(selectedFile.name);
                              setImagePreview(URL.createObjectURL(selectedFile));
                              form.setValue("profile_image", selectedFile);
                            }
                          }}
                        />
                      </label>
                    </div>
                    {imageUploading ? (
                      <p className="mt-4 text-sm text-gray-600">Uploading...</p>
                    ) : (
                      imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mt-4 rounded-full shadow-md object-cover"
                          style={{ width: "150px", height: "150px" }}
                        />
                      )
                    )}

                  </div>
                  {/* <button
                  onClick={handleUploadImage}
                  className="mt-4"
                >
                  Upload Image
                </button> */}
                </div>
              </div>

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