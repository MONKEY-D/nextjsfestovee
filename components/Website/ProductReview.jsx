"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { IoStar } from "react-icons/io5";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ButtonLoading from "../Application/ButtonLoading";
import { showToast } from "@/lib/showToast";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const ProductReview = ({ productId }) => {
  const auth = useSelector((store) => store.authStore.auth);

  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isReview, setIsReview] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const formSchema = zSchema.pick({
    product: true,
    userId: true,
    rating: true,
    title: true,
    review: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: productId,
      userId: auth?._id,
      rating: 0,
      title: "",
      review: "",
    },
  });

  useEffect(() => {
    form.setValue("userId", auth?._id);
  }, [auth]);

  const handleReviewSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.post("/api/review/create", values);
      if (!response.success) {
        throw new Error(response.message);
      }

      form.reset();
      showToast("success", response.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReview = async (pageParam) => {
    const { data: getReviewData } = await axios.get(
      `/api/review/get?productId=${productId}&page=${pageParam}`
    );

    console.log("Review API response:", getReviewData);

    if (!getReviewData.success) {
      return { reviews: [], nextPage: null, totalReview: 0 };
    }

    return {
      reviews: getReviewData.reviews || [],
      nextPage: getReviewData.nextPage ?? null,
      totalReview: getReviewData.totalReview ?? 0,
    };
  };

  const { error, data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["product-review"],
      queryFn: async ({ pageParam }) => await fetchReview(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    });

  console.log(data?.pages);
  return (
    <div className="shadow rounded border mb-20">
      <div className="p-3 bg-gray-50 border-b">
        <h2 className="font-semibold text-2xl">Rating & Reviews</h2>
      </div>

      <div className="p-3">
        <div className="flex justify-between flex-wrap items-center">
          <div className="md:w-1/2 w-full md:flex md:gap-10 md:mb-0 mb-5">
            <div className="md:w-[200px] w-full md:mb-0 mb-5">
              <h4 className="text-center text-8xl font-semibold">0.0</h4>
              <div className="flex justify-center gap-2">
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
              </div>

              <p className="text-center mt-3">(0 Rating & Reviews)</p>
            </div>
            <div className="md:w-[calc(100%-200px)] flex items-center">
              <div className="w-full">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <p className="w-3">{rating}</p>
                      <IoStar />
                    </div>
                    <Progress value={20} />
                    <span className="text-sm">20</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full md:text-end text-center">
            <Button
              onClick={() => setIsReview(!isReview)}
              type="button"
              variant="outline"
              className="md:w-fit w-full py-6 px-10"
            >
              Write review
            </Button>
          </div>
        </div>

        {isReview && (
          <div className="my-5">
            <hr className="mb-5" />
            <h4 className="text-xl font-semibold mb-3">Write a review</h4>
            {!auth ? (
              <>
                <p>Login to give review</p>
                <Button type="button" asChild>
                  <Link href={`${WEBSITE_LOGIN}?callback=${currentUrl}`}>
                    Login
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleReviewSubmit)}>
                    <div className="mb-5">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Rating
                                value={field.value}
                                size="large"
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
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                type="text"
                                placeholder="Review Title"
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
                        name="review"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Write your comment here....."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <ButtonLoading
                        type="submit"
                        text="Submit Review"
                        className="cursor-pointer"
                        loading={loading}
                      />
                    </div>
                  </form>
                </Form>
              </>
            )}
          </div>
        )}

        <div className="mt-10 border-t pt-5">
          <h5 className="text-xl font-semibold">
            {data?.pages[0]?.totalReview || 0} Reviews
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
