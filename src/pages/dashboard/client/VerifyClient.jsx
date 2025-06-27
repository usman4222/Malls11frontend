import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload } from "lucide-react";

import { Button } from "@/components/SiteComponents/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/SiteComponents/ui/form";
import { Input } from "@/components/SiteComponents/ui/input";
import { Textarea } from "@/components/SiteComponents/ui/textarea";
import { Card, CardContent } from "@/components/SiteComponents/ui/card";
import { useEffect, useState } from "react";
import { verifyClient } from "../../../actions/profile/profileAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadImageToCloudinary } from "../../../utils/uploadImage";

const formSchema = z.object({
  document_type: z.enum(["cnic", "passport"], {
    required_error: "Please select a document type",
  }),
  address: z.string().min(5, "Address too short"),
  contact_no: z.string().min(7, "Contact number is too short"),
  cnic_no: z.string().optional(),
  passport_no: z.string().optional(),
  verification_document: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Document is required",
    }),
}).superRefine((data, ctx) => {
  if (data.document_type === "cnic" && !data.cnic_no) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "CNIC number is required",
      path: ["cnic_no"],
    });
  }
  if (data.document_type === "passport" && !data.passport_no) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passport number is required",
      path: ["passport_no"],
    });
  }
});




function VerifyClient() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const token = user.token

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document_type: "cnic",
      address: "",
      contact_no: "",
      cnic_no: "",
      passport_no: "",
      verification_document: null,
    }
  });

  useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      let documentUrl = "";
      if (data.verification_document) {
        documentUrl = await uploadImageToCloudinary(data.verification_document);
      }

      const formData = new FormData();
      formData.append("contact_no", data.contact_no);
      formData.append("address", data.address);
      formData.append("verification_document", documentUrl);

      if (data.document_type === "cnic") {
        formData.append("cnic_no", data.cnic_no);
      } else if (data.document_type === "passport") {
        formData.append("passport_no", data.passport_no);
      }

      const response = await dispatch(verifyClient(formData, token));

      if (response?.success === false) {
        toast.error(response?.message || "Profile update failed");
        return;
      }

      toast.success("Profile updated successfully!");
      form.reset();
      verification_document(null);
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
    <div className="container mx-auto py-10 px-4 bg-[#F0EFEC]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          Verification Details{" "}
        </h1>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Contact Number */}
                <FormField
                  control={form.control}
                  name="contact_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your contact number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Document Type</FormLabel>
                      <FormControl>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              value="cnic"
                              checked={field.value === "cnic"}
                              onChange={field.onChange}
                            />
                            CNIC
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              value="passport"
                              checked={field.value === "passport"}
                              onChange={field.onChange}
                            />
                            Passport
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                {/* Identification Number */}
                {form.watch("document_type") === "cnic" && (
                  <FormField
                    control={form.control}
                    name="cnic_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNIC Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter CNIC number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch("document_type") === "passport" && (
                  <FormField
                    control={form.control}
                    name="passport_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter passport number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Document Upload */}
                <FormField
                  control={form.control}
                  name="verification_document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Document</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="secondary"
                            className="w-32"
                            onClick={() =>
                              document.getElementById("file-upload")?.click()
                            }
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose File
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            {field.value?.name || "No file chosen"}
                          </span>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.png,.jpeg"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your address"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Verification"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VerifyClient;
