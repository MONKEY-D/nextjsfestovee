"use client";

import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";

const UploadMedia = ({ isMultiple }) => {
  const handleOnError = () => {
    Swal.fire({
      icon: "error",
      title: "Upload Failed",
      text: error?.statusText || "Something went wrong!!",
    });
  };

  const handleOnQueueEnd = async (results) => {
    console.log(results);
  };

  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onError={handleOnError}
      onQueuesEnd={handleOnQueueEnd}
      config={{
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
      }}
      options={{
        multiple: isMultiple,
        sources: ["local", "url", "unsplash", "google_drive"],
      }}
    >
      {({ open }) => {
        return (
          <Button className="button" onClick={() => open()}>
            <FiPlus />
            Upload Media
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadMedia;
