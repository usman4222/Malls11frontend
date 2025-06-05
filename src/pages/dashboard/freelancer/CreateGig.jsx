import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/SiteComponents/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/SiteComponents/ui/card";
import { Input } from "@/components/SiteComponents/ui/input";
import { Textarea } from "@/components/SiteComponents/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/SiteComponents/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/SiteComponents/ui/form";
import { X, Plus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGig } from '@/actions/gig/gigAction';
import { useAuth } from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';


const packageSchema = z.object({
  title: z.string().min(1, "Package title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  delivery_time: z.string().min(1, "Delivery time is required"),
  revisions: z.string().min(1, "Number of revisions is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  features: z.array(z.string()).min(1, "At least one feature is required")
});

const serviceFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  response_time: z.string().min(1, "Response time is required"),
  english_level: z.string().min(1, "English level is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  basicPackage: packageSchema,
  standardPackage: packageSchema,
  premiumPackage: packageSchema,
  // location: z.string().min(1, "Location is required"),
  // serviceArea: z.string().min(1, "Service area is required"),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  })
});

function PackageTier({
  title,
  type,
  control,
  defaultFeatures = [""]
}) {
  const [features, setFeatures] = useState(defaultFeatures);

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name={`${type}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Basic Website Design" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${type}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Describe what's included in this package" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name={`${type}.delivery_time`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Time</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="2">2 Days</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`${type}.revisions`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revisions</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Revision</SelectItem>
                      <SelectItem value="2">2 Revisions</SelectItem>
                      <SelectItem value="3">3 Revisions</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name={`${type}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Features</FormLabel>
          {features.map((_, index) => (
            <FormField
              key={index}
              control={control}
              name={`${type}.features.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input {...field} placeholder="e.g. Source Code Included" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addFeature}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CreateGig() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { token } = useAuth();

  const form = useForm({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      category: "",
      response_time: "",
      english_level: "",
      description: "",
      basicPackage: {
        title: "",
        description: "",
        delivery_time: "",
        revisions: "",
        price: 0,
        features: [""]
      },
      standardPackage: {
        title: "",
        description: "",
        delivery_time: "",
        revisions: "",
        price: 0,
        features: [""]
      },
      premiumPackage: {
        title: "",
        description: "",
        delivery_time: "",
        revisions: "",
        price: 0,
        features: [""]
      },
      // location: "",
      // serviceArea: "",
      coordinates: { lat: 0, lng: 0 }
    }
  });


  useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      const payload = {
        ...formData,
        packages: [
          formData.basicPackage,
          formData.standardPackage,
          formData.premiumPackage,
        ],
      };

      await dispatch(createGig(payload, token))
      toast.success("Gig created successfully!");

      form.reset({
        title: "",
        category: "",
        response_time: "",
        english_level: "",
        description: "",
        basicPackage: {
          title: "",
          description: "",
          delivery_time: "",
          revisions: "",
          price: 0,
          features: [""],
        },
        standardPackage: {
          title: "",
          description: "",
          delivery_time: "",
          revisions: "",
          price: 0,
          features: [""],
        },
        premiumPackage: {
          title: "",
          description: "",
          delivery_time: "",
          revisions: "",
          price: 0,
          features: [""],
        },
        coordinates: { lat: 0, lng: 0 },
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Gig creation failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F0EFEC] h-full p-10">
      <ToastContainer />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="response_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Response Time*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select response time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1h">1 Hour</SelectItem>
                            <SelectItem value="4h">4 Hours</SelectItem>
                            <SelectItem value="24h">24 Hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="english_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Level*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select English level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="conversational">Conversational</SelectItem>
                            <SelectItem value="fluent">Fluent</SelectItem>
                            <SelectItem value="native">Native</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Packages Section */}
          <Card>
            <CardHeader>
              <CardTitle>Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PackageTier
                  title="Basic Package"
                  type="basicPackage"
                  control={form.control}
                  defaultFeatures={["Source Code", "Basic Support"]}
                />
                <PackageTier
                  title="Standard Package"
                  type="standardPackage"
                  control={form.control}
                  defaultFeatures={["Source Code", "Premium Support", "Installation Guide"]}
                />
                <PackageTier
                  title="Premium Package"
                  type="premiumPackage"
                  control={form.control}
                  defaultFeatures={["Source Code", "Premium Support", "Installation Guide", "1 Month Support"]}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || imageUploading}>
              {isLoading ? "Creating..." : "Post Service"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}