"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DataTableWrapper from "@/components/Application/Admin/DataTableWrapper";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import EditAction from "@/components/Application/Admin/EditAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ADMIN_DASHBOARD,
  ADMIN_SHOP_ADD,
  ADMIN_SHOP_EDIT,
  ADMIN_SHOP_SHOW,
  ADMIN_TRASH,
} from "@/routes/AdminPanelRoute";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";

// columns strictly according to shop.model.js
const SHOP_COLUMNS = [
  {
    header: "Owner",
    accessorKey: "owner",
    cell: ({ row }) => row.original.owner?.name || row.original.owner?._id,
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Media",
    accessorKey: "media",
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.media?.slice(0, 2).map((m) => (
          <Image
            key={m._id || m.url}
            src={m.url}
            alt="shop"
            width={40}
            height={40}
            className="object-cover rounded border"
          />
        ))}
      </div>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Visible",
    accessorKey: "visible",
    cell: ({ row }) => (row.original.visible ? "Yes" : "No"),
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "GST ID",
    accessorKey: "gstId",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_SHOP_SHOW, label: "Shop" },
];

const ShowShop = () => {
  const columns = useMemo(() => SHOP_COLUMNS, []);

  const action = useCallback((row, deleteType, handleDelete) => {
    return [
      <EditAction
        key="edit"
        href={`${ADMIN_SHOP_EDIT.replace(":id", row.original._id)}`}
      />,
      <DeleteAction
        key="delete"
        handleDelete={handleDelete}
        row={row}
        deleteType={deleteType}
      />,
    ];
  }, []);

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm gap-0">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Show Shop</h4>
            <Button asChild>
              <Link href={ADMIN_SHOP_ADD} className="flex items-center gap-1">
                <FiPlus /> New Shop
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <DataTableWrapper
            queryKey="shop-data"
            fetchUrl="/api/shop"
            initialPageSize={10}
            columnsConfig={columns}
            exportEndPoint="/api/shop/export"
            deleteEndPoint="/api/shop/delete"
            deleteType="SD"
            trashView={`${ADMIN_TRASH}?trashOf=shop`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowShop;
