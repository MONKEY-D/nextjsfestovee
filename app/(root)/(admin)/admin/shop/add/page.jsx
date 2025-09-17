"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import Editor from "@/components/Application/Admin/Editor";
import MediaModal from "@/components/Application/Admin/MediaModal";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showToast } from "@/lib/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ADMIN_DASHBOARD,
  ADMIN_SHOP_ADD,
  ADMIN_SHOP_SHOW,
} from "@/routes/AdminPanelRoute";
import { shopCreateSchema } from "@/lib/zodSchema";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_SHOP_SHOW, label: "Shop" },
  { href: ADMIN_SHOP_ADD, label: "Add Shop" },
];

const AddShop = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedMedia, setSelectedMedia] = useState([]);

  const form = useForm({
    resolver: zodResolver(
      shopCreateSchema.pick({
        name: true,
        description: true,
        visible: true,
        phone: true,
        gstId: true,
        media: true,
      })
    ),
    defaultValues: {
      name: "",
      description: "",
      visible: false,
      phone: "",
      gstId: "",
      media: [],
    },
    mode: "onTouched",
  });

  const { handleSubmit, setValue, reset, getValues, formState } = form;

  useEffect(() => {
    // selectedMedia is array of media objects ({ _id, secure_url, thumbnail_url, ... })
    const ids = selectedMedia
      .map((m) => (m && m._id ? String(m._id) : null))
      .filter(Boolean);
    setValue("media", ids, { shouldValidate: true, shouldDirty: true });
  }, [selectedMedia, setValue]);

  const editorChange = (event, editor) => {
    setValue("description", editor.getData(), { shouldValidate: true });
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      if (!values.media || values.media.length <= 0) {
        return showToast("error", "Please select at least one media");
      }

      const payload = {
        ...values,
        media: values.media,
      };

      console.log("Submitting payload:", payload);

      const { data: response } = await axios.post("/api/shop/create", payload);

      if (!response.success) throw new Error(response.message || "Failed");

      reset();
      setSelectedMedia([]);
      showToast("success", response.message);
    } catch (error) {
      showToast("error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className="text-xl font-semibold">Add Shop</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                {/* Shop Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Shop Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter shop name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter shop phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* GST ID */}
                <FormField
                  control={form.control}
                  name="gstId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter GST ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Visible */}
                <FormField
                  control={form.control}
                  name="visible"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value || false}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      </FormControl>
                      <FormLabel className="mb-0">Visible</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <div className="mb-5 md:col-span-2">
                <FormLabel>Description *</FormLabel>
                <Editor onChange={editorChange} />
                <FormMessage />
              </div>

              {/* Media */}
              <div className="md:col-span-2 border border-dashed rounded p-5 text-center">
                <MediaModal
                  open={open}
                  setOpen={setOpen}
                  selectedMedia={selectedMedia}
                  setSelectedMedia={setSelectedMedia}
                  isMultiple={true}
                />

                {selectedMedia.length > 0 && (
                  <div className="flex justify-center items-center flex-wrap mb-3 gap-2">
                    {selectedMedia.map((media) => {
                      // Ensure the src is valid (not empty string)
                      const rawSrc =
                        media?.secure_url || media?.thumbnail_url || "";
                      const imageSrc =
                        rawSrc && rawSrc.trim().length > 0 ? rawSrc : null;

                      return (
                        <div key={media._id} className="h-24 w-24 border">
                          {imageSrc ? (
                            <Image
                              src={imageSrc}
                              height={100}
                              width={100}
                              alt={media.alt || "Shop media"}
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div
                  onClick={() => setOpen(true)}
                  className="bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer"
                >
                  <span className="font-semibold">Select Shop Images</span>
                </div>

                {/* show validation error (zod) for media */}
                <div className="text-sm text-red-600 mt-2">
                  {formState.errors.media?.message}
                </div>
              </div>

              {/* Submit */}
              <div className="mt-5">
                <ButtonLoading
                  type="submit"
                  text={loading ? "Adding..." : "Add Shop"}
                  className="cursor-pointer"
                  disabled={loading}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddShop;
