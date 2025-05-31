import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/DashboardComponents/InputField/Input";
import SelectField from "@/components/DashboardComponents/InputField/SelectFields";
import SocialInputField from "@/components/DashboardComponents/InputField/SocialInputFields";
import { Button } from "@/components/SiteComponents/ui/button";
import { Card, CardContent } from "@/components/SiteComponents/ui/card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import freelancerProfileSchema from "@/schemas/freelancerProfileSchema";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import TextareaField from "@/components/DashboardComponents/InputField/TextAreaField";
import DynamicFieldsInput from "@/components/DashboardComponents/InputField/DynamicFieldsInput";
import UploadBar from "@/components/DashboardComponents/InputField/UploadBar";
import UploadBox from "@/components/DashboardComponents/InputField/UploadBox";
import { useEffect, useState } from "react";
import ImageUploader from "../../../components/DashboardComponents/ImageUploader";
import { getAllCountries, getStatesOfCountry } from "../../../utils/geoData";
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
import { CategoriesSelectContent } from "../../../components/DashboardComponents/ClientDashboardCompoents/JobsCategories";
import { SkillsSearch } from "../../../components/DashboardComponents/ClientDashboardCompoents/SkillSearch";
import FaqInput from "../../../components/DashboardComponents/InputField/FaqInput";
import { useDispatch } from "react-redux";
import { createUserProfile } from "../../../actions/profile/profileAction";
import { uploadImageToCloudinary } from "../../../utils/uploadImage";
import { useAuth } from "@/hooks/useAuth";
import { uploadFileToCloudinary } from "@/utils/uploadFileToCloudinary";
import { Input } from "../../../components/SiteComponents/ui/input";


export default function FreelancerProfile() {
  const form = useForm({
    resolver: zodResolver(freelancerProfileSchema),
    defaultValues: {
      featuredImage: "",
      whatsapp_no: "",
      gender: "",
      country: "",
      state: "",
      hourly_rate: {
        min: 0,
        max: 0,
      },
      role: "",
      website: "",
      categories: "",
      profile_des: "",
      doc_pic: null,
      awards: [],
      skills: [],
      faqs: [{ question: "", answer: "" }],
      instagramUrl: "",
      facebookUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      profile_image: null,
    },
  });

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();


  useEffect(() => {
    setCountries(getAllCountries());
  }, []);


  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const stateList = getStatesOfCountry(selectedCountry);
    setStates(stateList);
  };


  useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      console.log("FAQs:", formData.faqs);
      let imageUrl = formData.profile_image || "";
      let documentUrl = "";

      if (formData.doc_pic) {
        documentUrl = await uploadFileToCloudinary(formData.doc_pic);
      }

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
        profile_image: imageUrl
      };

      await dispatch(createUserProfile(payload, token))

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
    <div className="bg-[#F0EFEC] px-10 py-10 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ToastContainer />
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">My Profile</h2>

              <div className="space-y-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    control={form.control}
                    name="whatsapp_no"
                    label="WhatsApp Number*"
                    placeholder="Enter your WhatsApp number"
                    type="tel"
                  />
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <InputField
                    control={form.control}
                    name="hourly_rate.min"
                    label="Minimum per hour rate*"
                    type="number"
                    placeholder="Enter hourly rate"
                    min={0}
                  />
                  <InputField
                    control={form.control}
                    name="hourly_rate.max"
                    label="Maximum per hour rate*"
                    type="number"
                    placeholder="Enter maximum hourly rate"
                    min={0}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    control={form.control}
                    name="role"
                    label="Role*"
                    placeholder="Select role"
                    options={["developer", "designer", "writer"]}
                  />
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
                <TextareaField
                  control={form.control}
                  name="profile_des"
                  label="Brief Description"
                  rows={6}
                />
                <div className="space-y-4">
                  <SocialInputField
                    control={form.control}
                    name="instagramUrl"
                    label="Instagram (Optional)"
                    placeholder="Your Instagram URL (optional)"
                    icon={<Instagram className="h-5 w-5" />}
                  />
                  <SocialInputField
                    control={form.control}
                    name="facebookUrl"
                    label="Facebook (Optional)"
                    placeholder="Your Facebook URL (optional)"
                    icon={<Facebook className="h-5 w-5" />}
                  />
                  <SocialInputField
                    control={form.control}
                    name="linkedinUrl"
                    label="LinkedIn (Optional)"
                    placeholder="Your LinkedIn URL (optional)"
                    icon={<Linkedin className="h-5 w-5" />}
                  />
                  <SocialInputField
                    control={form.control}
                    name="twitterUrl"
                    label="Twitter (Optional)"
                    placeholder="Your Twitter URL (optional)"
                    icon={<Twitter className="h-5 w-5" />}
                  />
                </div>
                <UploadBox
                  control={form.control}
                  name="doc_pic"
                  label="Upload CV*"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) =>
                    field.onChange(e.target.files?.[0] || null)
                  }
                />
                <FormField
                  name="skills"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills *</FormLabel>
                      <FormControl>
                        <SkillsSearch
                          selectedSkills={field.value || []}
                          onSkillsChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="faqs"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FAQs</FormLabel>
                      <FormControl>
                        <FaqInput
                          faqs={Array.isArray(field.value) ? field.value : []}
                          onFaqsChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DynamicFieldsInput form={form} />
                <Button
                  type="submit"
                  className="mt-4 w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
