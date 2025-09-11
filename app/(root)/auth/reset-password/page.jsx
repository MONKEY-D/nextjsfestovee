"use client";
import React, { useState } from "react";
import { CardContent, Card } from "@/components/ui/card";
import Logo from "@/public/assets/FESTOVEE_LOGO_ONLY.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import axios from "axios";
import OTPVerificationForm from "@/components/Application/OTPVerification";
import { showToast } from "@/lib/showToast";
import { useDispatch } from "react-redux";
import UpdatePassword from "@/components/Application/UpdatePassword";

const ResetPassword = () => {
  const dispatch = useDispatch();

  // steps: 1 = email, 2 = otp, 3 = new password
  const [step, setStep] = useState(1);

  const [emailVerificationLoading, setEmailVerificationLoading] =
    useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  // only for step 1 form
  const formSchema = zSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // step 1: send OTP
  const handleEmailVerification = async (values) => {
    try {
      setEmailVerificationLoading(true);
      const { data: sendOtpResponse } = await axios.post(
        "/api/auth/reset-password/send-otp",
        values
      );

      if (!sendOtpResponse.success) {
        throw new Error(sendOtpResponse.message);
      }

      setOtpEmail(values.email);
      setStep(2); // move to OTP step
      showToast("success", sendOtpResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  // step 2: verify OTP
  const handleOtpVerification = async (values) => {
    try {
      setOtpVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        values
      );

      if (!otpResponse.success) {
        throw new Error(otpResponse.message || "Invalid credentials");
      }

      showToast("success", otpResponse.message);
      setStep(3); // move to new password
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificationLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardContent>
          <div className="flex justify-center mb-4">
            <Image
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="dark:hidden"
            />
            <Image
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="hidden dark:block dark:invert"
            />
          </div>

          {step === 1 && (
            <>
              <div className="text-center mb-4">
                <h1 className="text-2xl font-semibold">Reset Password</h1>
                <p>Enter your email for password reset</p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleEmailVerification)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ButtonLoading
                    type="submit"
                    text="Send OTP"
                    className="w-full cursor-pointer"
                    loading={emailVerificationLoading}
                  />

                  <div className="text-center">
                    <Link
                      href={WEBSITE_LOGIN}
                      className="text-primary underline"
                    >
                      Back to login
                    </Link>
                  </div>
                </form>
              </Form>
            </>
          )}

          {step === 2 && (
            <OTPVerificationForm
              email={otpEmail}
              onSubmit={handleOtpVerification}
              loading={otpVerificationLoading}
            />
          )}

          {step === 3 && <UpdatePassword email={otpEmail} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
