"use client";

import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import MediaModal from "@/components/Application/Admin/MediaModal";
import ButtonLoading from "@/components/Application/ButtonLoading";
import Select from "@/components/Application/Select";
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
import useFetch from "@/hooks/useFetch";
import { showToast } from "@/lib/showToast";
import { sizes } from "@/lib/utils";
import { zSchema } from "@/lib/zodSchema";
import {
  ADMIN_DASHBOARD,
  ADMIN_PRODUCT_VARIANT_SHOW,
} from "@/routes/AdminPanelRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_VARIANT_SHOW, label: "Product Variants" },
  { href: "", label: "Add Product Variants" },
];

const AddProductVariant = () => {
  const [loading, setLoading] = useState(false);
  const [productOption, setProductOption] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("variant");
  const { data: getProduct } = useFetch(
    "/api/product?deleteType=SD&&size=10000"
  );

  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  useEffect(() => {
    if (getProduct && getProduct.success) {
      const options = getProduct.data.map((product) => ({
        label: product.name,
        value: product._id,
      }));
      setProductOption(options);
    }
  }, [getProduct]);

  const formSchema = zSchema.pick({
    product: true,
    sku: true,
    color: true,
    size: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    media: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      sku: "",
      color: "",
      size: "",
      mrp: "",
      sellingPrice: "",
      discountPercentage: "",
      media: [],
    },
  });

  // Auto-calculate discount
  useEffect(() => {
    const subscription = form.watch((values) => {
      const mrp = Number(values.mrp) || 0;
      const sellingPrice = Number(values.sellingPrice) || 0;
      if (mrp > 0 && sellingPrice > 0) {
        const discount = Math.round(((mrp - sellingPrice) / mrp) * 100);
        if (discount !== form.getValues("discountPercentage")) {
          form.setValue("discountPercentage", discount);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle product selection
  const handleProductChange = async (productId) => {
    form.setValue("product", productId);

    if (!productId) {
      setSelectedProductType("variant");
      return;
    }

    try {
      const { data } = await axios.get(`/api/product/type/${productId}`);
      if (data.success) {
        setSelectedProductType(data.data.product.type);
        showToast("success","This product is Non-Variant type.")
      } else {
        showToast("error", "Failed to fetch product type");
        setSelectedProductType("variant");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error fetching product info");
      setSelectedProductType("variant");
    }
  };

  const onSubmit = async (values) => {
    if (selectedProductType === "non-variant") {
      return showToast("error", "Cannot add variant to a non-variant product");
    }

    setLoading(true);
    try {
      if (selectedMedia.length <= 0) {
        return showToast("error", "Please select media");
      }

      values.media = selectedMedia.map((media) => media._id);

      const { data: response } = await axios.post(
        "/api/product-variant/create",
        values
      );

      if (!response.success) throw new Error(response.message);

      form.reset();
      setSelectedMedia([]);
      showToast("success", response.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className="text-xl font-semibold">Add Product Variant</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                {/* Product */}
                <FormField
                  control={form.control}
                  name="product"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Product <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          options={productOption}
                          selected={form.watch("product")}
                          setSelected={handleProductChange}
                          isMulti={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Non-variant warning */}
                {selectedProductType === "non-variant" && (
                  <div className="md:col-span-2 p-3 bg-yellow-100 text-yellow-800 rounded">
                    This is a non-variant product. You cannot add variants.
                  </div>
                )}

                {/* SKU */}
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        SKU <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter SKU"
                          disabled={selectedProductType === "non-variant"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Color */}
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Color <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Color"
                          disabled={selectedProductType === "non-variant"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Size */}
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Size <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          options={sizes}
                          selected={field.value}
                          setSelected={field.onChange}
                          isMulti={false}
                          disabled={selectedProductType === "non-variant"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* MRP */}
                <FormField
                  control={form.control}
                  name="mrp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        MRP <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Enter MRP"
                          disabled={selectedProductType === "non-variant"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Selling Price */}
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Selling Price <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Enter Selling Price"
                          disabled={selectedProductType === "non-variant"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Discount */}
                <FormField
                  control={form.control}
                  name="discountPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discount % <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={
                            field.value === undefined ||
                            field.value === null ||
                            isNaN(field.value)
                              ? ""
                              : field.value
                          }
                          readOnly
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Media Selection */}
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
                        {media.secure_url || media.url ? (
                          <Image
                            src={media.secure_url || media.url}
                            alt={media.alt || "Media"}
                            height={100}
                            width={100}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex justify-center items-center h-full w-full bg-gray-200 text-gray-500 text-sm">
                            No Image
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div
                  onClick={() => setOpen(true)}
                  className="bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer"
                >
                  <span className="font-semibold">Select Media</span>
                </div>
              </div>

              <div className="mt-5">
                <ButtonLoading
                  type="submit"
                  text="Add Product Variant"
                  className="cursor-pointer"
                  loading={loading}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductVariant;
