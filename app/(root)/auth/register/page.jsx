// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import React, { useState } from "react";
// import logo from "@/public/assets/FESTOVEE_LOGO_ONLY.png";
// import Image from "next/image";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import ButtonLoading from "@/components/Application/ButtonLoading";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { FaRegEye } from "react-icons/fa6";
// import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
// import { zSchema } from "@/lib/zodSchema";
// import axios from "axios";
// import z from "zod";
// import Swal from "sweetalert2";

// const RegisterPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [isTypePassword, setIsTypePassword] = useState(true);

//   const formSchema = zSchema
//     .pick({
//       name: true,
//       email: true,
//       password: true,
//     })
//     .extend({
//       confirmPassword: z.string(),
//     })
//     .refine((data) => data.password === data.confirmPassword, {
//       message: "Password and confirm password must be same.",
//       path: ["confirmPassword"],
//     });

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const handleRegisterSubmit = async (values) => {
//     try {
//       setLoading(true);
//       console.log("Register Payload:", values);
//       const { data: registerResponse } = await axios.post(
//         "/api/auth/register",
//         values
//       );

//       if (!registerResponse.success) {
//         const errMsg =
//           typeof registerResponse.message === "string"
//             ? registerResponse.message
//             : registerResponse.message?.message || "Registration failed";

//         throw new Error(errMsg);
//       }

//       form.reset();

//       Swal.fire({
//         icon: "success",
//         title: "A verification link will be sent to you shortly!!",
//         text: registerResponse.message,
//         confirmButtonColor: "#6366f1",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Registration Failed",
//         text: error.message || "Something went wrong. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-tr from-sky-100 via-white to-indigo-100 flex items-center justify-center px-4">
//       <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 bg-white/80 backdrop-blur-sm">
//         <CardContent className="p-6">
//           {/* Logo */}
//           <div className="flex justify-center mb-4">
//             <div className="relative w-[110px] h-[110px] rounded-full bg-gradient-to-br from-indigo-200 via-white to-sky-200 p-1 shadow-lg">
//               <div className="w-full h-full rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
//                 <Image
//                   src={logo}
//                   alt="Logo"
//                   width={50}
//                   height={50}
//                   className="dark:hidden"
//                 />
//                 <Image
//                   src={logo}
//                   alt="Logo"
//                   width={50}
//                   height={50}
//                   className="hidden dark:block dark:invert"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Header */}
//           <div className="text-center mb-6">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Register to Festovee
//             </h1>
//           </div>

//           {/* Form */}
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleRegisterSubmit)}
//               className="space-y-6"
//             >
//               {/* Full Name */}
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium text-gray-700">
//                       Full Name
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="John Doe"
//                         {...field}
//                         className="rounded-lg px-4 py-2 border focus:ring-2 focus:ring-indigo-300 focus:outline-none transition w-full"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-xs text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               {/* Email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium text-gray-700">
//                       Email
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="you@example.com"
//                         {...field}
//                         className="rounded-lg px-4 py-2 border focus:ring-2 focus:ring-indigo-300 focus:outline-none transition w-full"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-xs text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem className="relative">
//                     <FormLabel className="text-sm font-medium text-gray-700">
//                       Password
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type={isTypePassword ? "password" : "text"}
//                         placeholder="********"
//                         {...field}
//                         className="rounded-lg px-4 py-2 border focus:ring-2 focus:ring-indigo-300 focus:outline-none transition w-full"
//                       />
//                     </FormControl>
//                     <button
//                       className="absolute top-1/2 right-2 cursor-pointer"
//                       type="button"
//                       onClick={() => setIsTypePassword(!isTypePassword)}
//                     >
//                       {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
//                     </button>
//                     <FormMessage className="text-xs text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               {/* Confirm Password */}
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium text-gray-700">
//                       Confirm Password
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="********"
//                         {...field}
//                         className="rounded-lg px-4 py-2 border focus:ring-2 focus:ring-indigo-300 focus:outline-none transition w-full"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-xs text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               {/* Submit Button */}
//               <div className="pt-1">
//                 <ButtonLoading
//                   loading={loading}
//                   type="submit"
//                   text="Register"
//                   className="w-full rounded-lg cursor-pointer"
//                 />
//               </div>
//             </form>
//           </Form>

//           {/* Login Link */}
//           <div className="mt-4 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <a href={WEBSITE_LOGIN} className="text-indigo-600 hover:underline">
//               Login
//             </a>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default RegisterPage;

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
import logo from "@/public/assets/FESTOVEE_LOGO_ONLY.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { zSchema } from "@/lib/zodSchema";
import axios from "axios";
import z from "zod";
import Swal from "sweetalert2";
import Link from "next/link";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({
      name: true,
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: registerResponse } = await axios.post(
        "/api/auth/register",
        values
      );

      if (!registerResponse.success) {
        const errMsg =
          typeof registerResponse.message === "string"
            ? registerResponse.message
            : registerResponse.message?.message || "Registration failed";
        throw new Error(errMsg);
      }

      form.reset();

      Swal.fire({
        icon: "success",
        title: "A verification link will be sent to you shortly!!",
        text: registerResponse.message,
        confirmButtonColor: "#6366f1",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardContent>
        <div className="flex justify-center mb-4">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="dark:hidden"
          />
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="hidden dark:block dark:invert"
          />
        </div>

        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold">Register to Festovee</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
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
                      placeholder="********"
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute top-8 right-3"
                    onClick={() => setIsTypePassword(!isTypePassword)}
                  >
                    {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div>
              <ButtonLoading
                type="submit"
                text={loading ? "Registering..." : "Register"}
                className="w-full"
                disabled={loading}
              />
            </div>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href={WEBSITE_LOGIN} className="text-primary underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
