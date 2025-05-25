// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import InputField from "@/components/InputField/Input";
// import SelectField from "@/components/InputField/SelectFields";
// import SocialInputField from "@/components/InputField/SocialInputFields";
// import { Button } from "@/components/SiteComponents/ui/button";
// import { Card, CardContent } from "@/components/SiteComponents/ui/card";
// import { Form } from "@/components/SiteComponents/ui/form";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import freelancerProfileSchema from "@/schemas/freelancerProfileSchema";
// import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
// import TextareaField from "@/components/InputField/TextAreaField";
// import DynamicFieldsInput from "@/components/InputField/DynamicFieldsInput";
// import UploadBar from "@/components/InputField/UploadBar";
// import UploadBox from "@/components/InputField/UploadBox";

// export default function FreelancerProfile() {
//   const form = useForm({
//     resolver: zodResolver(freelancerProfileSchema),
//     defaultValues: {
//       featuredImage: "",
//       fullName: "",
//       whatsappNumber: "",
//       gender: "",
//       dateOfBirth: "",
//       country: "",
//       state: "",
//       hourlyRate: 0,
//       maxHourlyRate: 0,
//       role: "",
//       categories: "",
//       description: "",
//       cv: "",
//       awards: [""],
//       skills: [""],
//       faqs: [""],
//       instagramUrl: "",
//       facebookUrl: "",
//       linkedinUrl: "",
//       twitterUrl: "",
//     },
//   });

//   async function onSubmit(data) {
//     try {
//       console.log(data);
//       toast({
//         title: "Profile updated",
//         description: "Your profile has been successfully updated.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Something went wrong. Please try again.",
//         variant: "destructive",
//       });
//     }
//   }

//   return (
//     <div className="bg-[#F0EFEC] px-10 py-10 ">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-2xl font-bold mb-6">My Profile</h2>

//               <div className="space-y-6">
//                 <UploadBar
//                   control={form.control}
//                   name="featuredImage"
//                   label="Profile Picture (Compact)"
//                 />
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputField
//                     control={form.control}
//                     name="fullName"
//                     label="Full Name*"
//                     placeholder="Enter your full name"
//                   />
//                   <InputField
//                     control={form.control}
//                     name="whatsappNumber"
//                     label="WhatsApp Number*"
//                     placeholder="Enter your WhatsApp number"
//                     type="tel"
//                   />
//                   <InputField
//                     control={form.control}
//                     name="dateOfBirth"
//                     label="Date of Birth*"
//                     type="date"
//                     placeholder="Enter your date of birth"
//                   />
//                   <SelectField
//                     control={form.control}
//                     name="gender"
//                     label="Gender*"
//                     placeholder="Select your gender"
//                     options={["Male", "Female", "Other"]}
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <SelectField
//                     control={form.control}
//                     name="country"
//                     label="Country*"
//                     placeholder="Select country"
//                     options={["United States", "United Kingdom", "Canada"]}
//                   />
//                   <SelectField
//                     control={form.control}
//                     name="state"
//                     label="State*"
//                     placeholder="Select state"
//                     options={[
//                       "New York",
//                       "California",
//                       "Texas",
//                       "Florida",
//                       "Illinois",
//                     ]}
//                   />
//                   <InputField
//                     control={form.control}
//                     name="hourlyRate"
//                     label="Minimum per hour rate*"
//                     type="number"
//                     placeholder="Enter hourly rate"
//                   />
//                   <InputField
//                     control={form.control}
//                     name="maxHourlyRate"
//                     label="Maximum per hour rate*"
//                     type="number"
//                     placeholder="Enter maximum hourly rate"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <SelectField
//                     control={form.control}
//                     name="role"
//                     label="Role*"
//                     placeholder="Select role"
//                     options={["developer", "designer", "writer"]}
//                   />
//                   <SelectField
//                     control={form.control}
//                     name="categories"
//                     label="Categories*"
//                     placeholder="Select categories"
//                     options={["web", "mobile", "ui"]}
//                   />
//                 </div>
//                 <TextareaField
//                   control={form.control}
//                   name="description"
//                   label="Brief Description"
//                   rows={6}
//                 />
//                 <div className="space-y-4">
//                   <SocialInputField
//                     control={form.control}
//                     name="instagramUrl"
//                     label="Instagram (Optional)"
//                     placeholder="Your Instagram URL (optional)"
//                     icon={<Instagram className="h-5 w-5" />}
//                   />
//                   <SocialInputField
//                     control={form.control}
//                     name="facebookUrl"
//                     label="Facebook (Optional)"
//                     placeholder="Your Facebook URL (optional)"
//                     icon={<Facebook className="h-5 w-5" />}
//                   />
//                   <SocialInputField
//                     control={form.control}
//                     name="linkedinUrl"
//                     label="LinkedIn (Optional)"
//                     placeholder="Your LinkedIn URL (optional)"
//                     icon={<Linkedin className="h-5 w-5" />}
//                   />
//                   <SocialInputField
//                     control={form.control}
//                     name="twitterUrl"
//                     label="Twitter (Optional)"
//                     placeholder="Your Twitter URL (optional)"
//                     icon={<Twitter className="h-5 w-5" />}
//                   />
//                 </div>
//                 <UploadBox
//                   control={form.control}
//                   name="cv"
//                   label="Upload CV*"
//                 />
//                 <DynamicFieldsInput form={form} />
//                 <Button type="submit" className="w-full md:w-auto">
//                   Save Profile
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </form>
//       </Form>
//     </div>
//   );
// }
