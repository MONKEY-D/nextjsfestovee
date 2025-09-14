import { Chip } from "@mui/material";
import dayjs from "dayjs";

export const DT_CATEGORY_COLUMN = [
  { accessorKey: "name", header: "Category Name" },
  {
    accessorKey: "slug",
    header: "slug",
  },
];

export const DT_PRODUCT_COLUMN = [
  { accessorKey: "name", header: "Product Name" },
  {
    accessorKey: "slug",
    header: "slug",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "mrp",
    header: "MRP",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
  },
];
export const DT_PRODUCT_VARIANT_COLUMN = [
  { accessorKey: "product", header: "Product Name" },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "mrp",
    header: "MRP",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
  },
];

export const DT_COUPON_COLUMN = [
  { accessorKey: "code", header: "Code" },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
  },
  {
    accessorKey: "minShoppingAmount",
    header: "Min. Shopping Amount",
  },
  {
    accessorKey: "validity",
    header: "Validity",
    Cell: ({ renderedCellValue }) => {
      const date = dayjs(renderedCellValue);

      return new Date() > date.toDate() ? (
        <Chip color="error" label={date.format("DD/MM/YYYY")} />
      ) : (
        <Chip color="success" label={date.format("DD/MM/YYYY")} />
      );
    },
  },
];
