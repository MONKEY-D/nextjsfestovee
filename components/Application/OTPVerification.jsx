"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zSchema } from "@/lib/zodSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { showToast } from "@/lib/showToast";
import axios from "axios";

const OTPVerificationForm = ({ email, onSubmit, loading }) => {
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  const handleOtpVerification = async (values) => {
    await onSubmit(values);
  };

  const resendOTP = async () => {
    try {
      setIsResendingOtp(true);
      const { data: otpResendingResponse } = await axios.post(
        "/api/auth/resend-otp",
        { email }
      );

      if (!otpResendingResponse.success) {
        throw new Error(otpResendingResponse.message || "Invalid credentials");
      }
      showToast("success", otpResendingResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setIsResendingOtp(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOtpVerification)}
        className="space-y-6 w-2/3 mx-auto"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            Please complete verification
          </h1>
          <p>
            We have sent a One Time Password to your registered email address.
            The OTP is valid for 10 minutes only.
          </p>
        </div>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One Time Password</FormLabel>
              <FormControl>
                <input
                  type="text"
                  maxLength={6}
                  {...field}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter OTP"
                />
              </FormControl>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
        <div className="text-card mt-0">
          {!isResendingOtp ? (
            <button
              onClick={resendOTP}
              type="button"
              className="w-full text-blue-500 cursor-pointer hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <span className="teotpResending">Resending . . . .</span>
          )}
        </div>
      </form>
    </Form>
  );
};

export default OTPVerificationForm;
