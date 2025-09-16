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
import React, { useState } from "react";
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

  const formSchema = shopCreateSchema.pick({
    name: true,
    description: true,
    visible: true,
    phone: true,
    gstId: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      visible: "",
      phone: "",
      gstId: "",
    },
  });

  const { control, handleSubmit, setValue, reset, formState } = form;

  const editorChange = (event, editor) => {
    setValue("description", editor.getData(), { shouldValidate: true });
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      if (selectedMedia.length <= 0) {
        return showToast("error", "Please select at least one media");
      }

      const mediaData = selectedMedia.map((media) => media._id);
      values.media = mediaData;

      const { data: response } = await axios.post("/api/shop/create", values);
      if (!response.success) throw new Error(response.message);

      form.reset();
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
                  control={control}
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
                  control={control}
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
                  control={control}
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
                  control={control}
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
                    {selectedMedia.map((media) => (
                      <div key={media._id} className="h-24 w-24 border">
                        <Image
                          src={media.url}
                          height={100}
                          width={100}
                          alt=""
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div
                  onClick={() => setOpen(true)}
                  className="bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer"
                >
                  <span className="font-semibold">Select Shop Images</span>
                </div>
                <FormMessage>{formState.errors.media?.message}</FormMessage>
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
