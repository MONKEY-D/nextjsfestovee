import React from "react";
import Image from "next/image";

const ModalMediaBlock = ({
  media,
  selectedMedia,
  setSelectedMedia,
  isMultiple,
}) => {
  const isSelected = selectedMedia.some((m) => m._id === media._id);

  const toggleSelect = () => {
    setSelectedMedia((prev) => {
      if (isMultiple) {
        if (isSelected) {
          // remove
          return prev.filter((m) => m._id !== media._id);
        } else {
          // add full media object
          return [...prev, media];
        }
      } else {
        // single select → replace
        return [media];
      }
    });
  };

  return (
    <div
      onClick={toggleSelect}
      className={`relative border cursor-pointer rounded overflow-hidden ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      <Image
        src={media.secure_url || media.thumbnail_url}
        alt={media.alt || "Media"}
        height={200}
        width={200}
        className="object-cover w-full h-[150px]"
      />
      {isSelected && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold">
          ✓
        </div>
      )}
    </div>
  );
};

export default ModalMediaBlock;
