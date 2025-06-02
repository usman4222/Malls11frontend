import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/SiteComponents/ui/card";
import { Separator } from "@/components/SiteComponents/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/SiteComponents/ui/form";
import { Button } from "@/components/SiteComponents/ui/button";
import { Input } from "@/components/SiteComponents/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/SiteComponents/ui/select";
import { Textarea } from "@/components/SiteComponents/ui/textarea";
import { SkillsSearch } from "@/components/DashboardComponents/ClientDashboardCompoents/SkillSearch";
import { createProject } from "../../../actions/client/projectAction";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import { uploadFileToCloudinary } from "@/utils/uploadFileToCloudinary";
import { CategoriesSelectContent } from "../../../components/DashboardComponents/ClientDashboardCompoents/JobsCategories";
import ClientProjectSchema from "../../../schemas/ClientProjectSchema";
import { getAllCountries } from "../../../utils/geoData";
import languages from "../../../data/languages.json";

function ClientProject() {
  const form = useForm({
    resolver: zodResolver(ClientProjectSchema),
    defaultValues: {
      title: "",
      category: "",
      project_type: "",
      management_type: "",
      duration: "",
      experience: "",
      location: "",
      language: "",
      project_doc: null,
      // attachmentImage: null,
      skills: [],
      project_des: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(getAllCountries());
  }, []);

  useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      let documentUrl = "";
      if (formData.project_doc) {
        documentUrl = await uploadFileToCloudinary(formData.project_doc);
      }

      const payload = {
        ...formData,
        fixed_price:
          selectedProjectType === "fixed" ? formData.fixed_price : null,
        hourly_rate:
          selectedProjectType === "hourly"
            ? {
              min: formData.min_hourly_rate,
              max: formData.max_hourly_rate,
            }
            : null,
        userId: user?.currentUser?.id,
        project_doc: documentUrl,
        skills: formData.skills,
      };

      await dispatch(createProject(payload));

      toast.success("Project created successfully!");
    } catch (error) {
      console.log("error", error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-[#F0EFEC]">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Post a New Job</h1>

      <Card className="mt-4">
        <CardHeader>
          <h2 className="text-sm font-semibold">General</h2>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <CategoriesSelectContent />
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedProjectType(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Project</SelectItem>
                          <SelectItem value="hourly">Hourly Project</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedProjectType === "fixed" && (
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="fixed_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fixed Price *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter fixed price"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                              value={field.value ?? ""}
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {selectedProjectType === "hourly" && (
                  <>
                    <FormField
                      control={form.control}
                      name="min_hourly_rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min Hourly Rate *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Minimum hourly rate"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                              value={field.value ?? ""}
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="max_hourly_rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Hourly Rate *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Maximum hourly rate"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                              value={field.value ?? ""}
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="management_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Management Type *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="self">Self</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="oneday">1 Day</SelectItem>
                          <SelectItem value="twoday">2 Days</SelectItem>
                          <SelectItem value="oneweek">1 Week</SelectItem>
                          <SelectItem value="2-3days">2-3 Days</SelectItem>
                          <SelectItem value="2-3hours">2-3 Hours</SelectItem>
                          <SelectItem value="2-3week">2-3 Weeks</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
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
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <FormField
                control={form.control}
                name="project_des"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter description"
                        className="min-h-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h2 className="text-sm font-semibold">Attachment *</h2>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="project_doc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attach Project Document / Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*,.pdf,.doc,.docx"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="attachmentImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attachment Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...field}
                          onChange={(e) => field.onChange(e.target.files[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h2 className="text-sm font-semibold">Skills</h2>
        </CardHeader>
        <Separator />
        <CardContent className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* SKILLS FIELD */}
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
              <Button
                type="submit"
                className="mt-4 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ClientProject;
