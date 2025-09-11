"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { zSchema } from "@/lib/zodSchema";
import axios from "axios";
import z from "zod";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const UpdatePassword = ({ email }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and confirm password must be same.",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
  });

  const handlePasswordUpdate = async (values) => {
    try {
      setLoading(true);
      const { data: passwordUpdate } = await axios.put(
        "/api/auth/reset-password/update-password",
        values
      );

      if (!passwordUpdate.success) {
        const errMsg =
          typeof passwordUpdate.message === "string"
            ? passwordUpdate.message
            : passwordUpdate.message?.message || "Password update failed";

        throw new Error(errMsg);
      }

      form.reset();

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: passwordUpdate.message,
        confirmButtonColor: "#6366f1",
      });
      router.push(WEBSITE_LOGIN);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-sky-100 via-white to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Update Password
            </h1>
            <p className="text-sm text-gray-600">
              Enter your new password below
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePasswordUpdate)}
              className="space-y-6"
            >
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={isTypePassword ? "password" : "text"}
                        placeholder="********"
                        {...field}
                        className="rounded-lg px-4 py-2 border focus:ring-2 focus:ring-indigo-300 focus:outline-none transition w-full"
                      />
                    </FormControl>
                    <button
                      className="absolute top-9 right-3 cursor-pointer"
                      type="button"
                      onClick={() => setIsTypePassword(!isTypePassword)}
                    >
                      {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="rounded-lg px-4 py-2 border focus:ring-2 focus:ring-indigo-300 focus:outline-none transition w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-1">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Update Password"
                  className="w-full rounded-lg cursor-pointer"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePassword;
