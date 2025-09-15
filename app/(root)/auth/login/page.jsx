"use client";
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
import z from "zod";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import {
  USER_DASHBOARD,
  WEBSITE_REGISTER,
  WEBSITE_RESETPASSWORD,
} from "@/routes/WebsiteRoute";
import Swal from "sweetalert2";
import axios from "axios";
import OTPVerificationForm from "@/components/Application/OTPVerification";
import { showToast } from "@/lib/showToast";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";

const LoginPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState();
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);

  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(3, "Password field is required."),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: loginResponse } = await axios.post(
        "/api/auth/login",
        values
      );

      if (!loginResponse.success) {
        throw new Error(loginResponse.message || "Invalid credentials");
      }

      setOtpEmail(values.email);
      form.reset();
      showToast("success", loginResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (values) => {
    try {
      setOtpVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        "/api/auth/verify-otp",
        values
      );

      if (!otpResponse.success) {
        throw new Error(otpResponse.message || "Invalid credentials");
      }

      setOtpEmail("");
      showToast("success", otpResponse.message);

      dispatch(login(otpResponse.data));

      if (searchParams.has("callback")) {
        router.push(searchParams.get("callback"));
      } else {
        router.push(USER_DASHBOARD); // default dashboard
      }
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificationLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardContent>
        <div className="flex justify-center">
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
        {!otpEmail ? (
          <>
            <div className="text-center mb-4">
              <h1 className="text-2xl font-semibold">Login to Festovee</h1>
            </div>
            <div className="mt-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleLoginSubmit)}
                  className="space-y-4"
                >
                  <div className="mb-5">
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
                  </div>
                  <div className="mb-5">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type={isTypePassword ? "password" : "text"}
                              placeholder="*****************"
                            />
                          </FormControl>
                          <button
                            className="absolute top-9 right-3 cursor-pointer"
                            type="button"
                            onClick={() => setIsTypePassword(!isTypePassword)}
                          >
                            {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                          </button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <ButtonLoading
                      type="submit"
                      text={loading ? "Logging in..." : "Login"}
                      className="w-full cursor-pointer"
                      disabled={loading}
                    />
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-1">
                      <p>Don't have an account</p>
                      <Link
                        href={WEBSITE_REGISTER}
                        className="text-primary underline"
                      >
                        Create Account!
                      </Link>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="text-primary underline"
                        onClick={() =>
                          Swal.fire(
                            "Forgot Password",
                            "Reset flow goes here.",
                            "info"
                          )
                        }
                      >
                        <Link
                          href={WEBSITE_RESETPASSWORD}
                          className="text-primary"
                        >
                          Reset Password
                        </Link>
                      </button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <OTPVerificationForm
            email={otpEmail}
            onSubmit={handleOtpVerification}
            loading={otpVerificationLoading}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LoginPage;
