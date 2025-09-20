"use client";
import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/assets/FESTOVEE_LOGO_ONLY.png";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import Cart from "./Cart";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import userIcon from "@/public/assets/user.png";
import { HiMiniBars3 } from "react-icons/hi2";
import Search from "./Search";

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const auth = useSelector((store) => store.authStore.auth);

  return (
    <header className="bg-gray-100 border-b">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-3">
        {/* Logo */}
        <Link href={WEBSITE_HOME} className="flex-shrink-0">
          <Image
            alt="Festovee Logo"
            src={logo}
            width={120}
            height={50}
            className="w-auto h-10 sm:h-12"
            priority
          />
        </Link>

        {/* Nav + Actions */}
        <div className="flex items-center gap-6 lg:gap-10">
          {/* Nav Menu */}
          <nav
            className={`fixed inset-0 z-50 bg-white transition-transform duration-500 lg:relative lg:inset-auto lg:bg-transparent
              ${
                isMobileMenu ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0`}
          >
            {/* Mobile Nav Header */}
            <div className="lg:hidden flex justify-between items-center bg-gray-50 py-3 border-b px-4">
              <Image
                alt="Festovee Logo"
                src={logo}
                width={110}
                height={40}
                className="w-auto h-10"
              />
              <button type="button" onClick={() => setIsMobileMenu(false)}>
                <IoMdClose
                  size={28}
                  className="text-gray-600 hover:text-primary"
                />
              </button>
            </div>

            {/* Nav Links */}
            <ul className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 px-4 lg:px-0 py-6 lg:py-0">
              {[
                { name: "Home", href: WEBSITE_HOME },
                { name: "About", href: "#" },
                { name: "Shop", href: WEBSITE_SHOP },
                { name: "Products", href: "#" },
                { name: "Factories", href: "#" },
                { name: "Quotations", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="block py-2 text-gray-700 hover:text-primary hover:font-semibold transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="p-1"
            >
              <IoIosSearch
                size={24}
                className="text-gray-600 hover:text-primary"
              />
            </button>

            {/* Cart */}
            <Cart />

            {/* Auth */}
            {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount
                  size={24}
                  className="text-gray-600 hover:text-primary"
                />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                </Avatar>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden block"
              onClick={() => setIsMobileMenu(true)}
            >
              <HiMiniBars3
                size={26}
                className="text-gray-600 hover:text-primary"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <Search isShow={showSearch} />
    </header>
  );
};

export default Header;
