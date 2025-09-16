"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import Editor from "@/components/Application/Admin/Editor";
import MediaModal from "@/components/Application/Admin/MediaModal";
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
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ADMIN_DASHBOARD, ADMIN_SHOP_SHOW } from "@/routes/AdminPanelRoute";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_SHOP_SHOW, label: "Shop" },
  { href: "", label: "Edit Shop" },
];

const formSchema = z.object({
  owner: z.string().min(1, "Owner is required"),
  name: z.string().min(1, "Name is required"),
  media: z.array(z.string()).min(1, "At least one image is required"),
  description: z.string().optional(),
  visible: z.boolean().default(true),
  phone: z.string().optional(),
  gstId: z.string().optional(),
});

const EditShop = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner: "",
      name: "",
      media: [],
      description: "",
      visible: true,
      phone: "",
      gstId: "",
    },
  });

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const { data: response } = await axios.get(`/api/shop/${id}`);
        if (!response.success) throw new Error(response.message);

        const shop = response.shop;

        form.reset({
          owner: shop.owner?._id || "",
          name: shop.name,
          media: shop.media.map((m) => m._id),
          description: shop.description || "",
          visible: shop.visible,
          phone: shop.phone || "",
          gstId: shop.gstId || "",
        });

        setSelectedMedia(shop.media);
      } catch (error) {
        showToast("error", error.message || "Failed to load shop");
      }
    };

    if (id) fetchShop();
  }, [id, form]);

  const editor = (event, editor) => {
    form.setValue("description", editor.getData());
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      if (selectedMedia.length <= 0) {
        return showToast("error", "Please select at least one image");
      }

      values.media = selectedMedia.map((m) => m._id);

      const { data: response } = await axios.put(`/api/shop/${id}`, values);

      if (!response.success) throw new Error(response.message);

      showToast("success", response.message);
      router.push(ADMIN_SHOP_SHOW);
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
          <h4 className="text-xl font-semibold">Edit Shop</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Owner <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter owner ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name="visible"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mb-0">Visible</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-5 md:col-span-2">
                <FormLabel>Description</FormLabel>
                <Editor
                  onChange={editor}
                  data={form.getValues("description")}
                />
                <FormMessage />
              </div>

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
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Shop"}
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditShop;
