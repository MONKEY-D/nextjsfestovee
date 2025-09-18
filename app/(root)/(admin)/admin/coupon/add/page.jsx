"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
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
import { zSchema } from "@/lib/zodSchema";
import { ADMIN_COUPON_SHOW, ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_COUPON_SHOW, label: "Coupons" },
  { href: "", label: "Add Coupon" },
];

const AddCoupon = () => {
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);

  // Fetch admin shops
  const { data: getShop } = useFetch("/api/shop?deleteType=SD&&size=10000");
  useEffect(() => {
    if (getShop?.success) {
      const options = getShop.data.map((shop) => ({
        label: shop.name,
        value: shop._id,
      }));
      setShops(options);
    }
  }, [getShop]);

  const formSchema = zSchema.pick({
    code: true,
    discountPercentage: true,
    minShoppingAmount: true,
    validity: true,
    shopId: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPercentage: "",
      minShoppingAmount: "",
      validity: "",
      shopId: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.post("/api/coupon/create", values);
      if (!response.success) throw new Error(response.message);

      form.reset();
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
          <h4 className="text-xl font-semibold">Add Coupon</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                {/* Coupon Code */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Code <span className="text-red-500 font-bold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Discount Percentage */}
                <FormField
                  control={form.control}
                  name="discountPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discount Percentage{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Discount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Min Shopping Amount */}
              <FormField
                control={form.control}
                name="minShoppingAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Min. Shopping Amount{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Min. Shopping Amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Validity */}
              <FormField
                control={form.control}
                name="validity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Validity <span className="text-red-500 font-bold">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Enter Validity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Shop Selector */}
              <FormField
                control={form.control}
                name="shopId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Select Shop{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        options={shops}
                        selected={field.value}
                        setSelected={(val) => field.onChange(val)}
                        isMulti={false}
                        placeholder="Select Shop"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-3 mt-5">
                <ButtonLoading
                  type="submit"
                  text="Add Coupon"
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

export default AddCoupon;
