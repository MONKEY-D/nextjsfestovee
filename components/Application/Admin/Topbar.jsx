"use client";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { RiMenu4Fill } from "react-icons/ri";
import { useSidebar } from "@/components/ui/sidebar";
import AdminSearch from "./AdminSearch";
import Logo from "../../../public/assets/FESTOVEE_LOGO_ONLY.png";
import Image from "next/image";
import AdminMobileSearch from "./AdminMobileSearch";
import Link from "next/link";
import { USER_DASHBOARD } from "@/routes/WebsiteRoute";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed border h-16 w-full top-0 left-0 z-30 md:ps-72 md:pe-8 px-5 flex justify-between items-center bg-white dark:bg-card">
      <div className="flex items-center md:hidden">
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
      <div className="ml-65 md:block hidden">
        <AdminSearch />
      </div>
      <Button>
        <Link href={USER_DASHBOARD}>Switch to User</Link>
      </Button>

      <div className="flex items-center gap-2 mr-5">
        <AdminMobileSearch />
        <ThemeSwitch />
        <UserDropdown />
        <Button
          onClick={toggleSidebar}
          type="button"
          size="icon"
          className="ms-2 md:hidden"
        >
          <RiMenu4Fill />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
