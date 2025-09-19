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

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const auth = useSelector((store) => store.authStore.auth);
  return (
    <div className="bg-white border-b lg:px-32 px-4">
      <div className="flex justify-between items-center lg:py-3 py-3">
        <Link href={WEBSITE_HOME}>
          <Image alt="" src={logo} sizes={10} className="lg:w-13 w-13" />
        </Link>

        <div className="flex justify-between gap-20">
          <nav
            className={`fixed z-50 top-0 w-full h-screen bg-white transition-all duration-500
    lg:ml-[-90] lg:relative lg:w-auto lg:h-auto lg:top-0 lg:p-0
    ${isMobileMenu ? "left-0" : "-left-full"}`}
          >
            <div className="lg:hidden flex justify-between items-center bg-gray-50 py-3 border-b px-3">
              <Image alt="" src={logo} sizes={10} className="lg:w-17 w-14" />
              <button type="button">
                <IoMdClose
                  size={25}
                  className="text-gray-500 hover:text-primary"
                  onClick={() => setIsMobileMenu(false)}
                />
              </button>
            </div>

            <ul className="lg:flex justify-between items-center gap-10 px-3">
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME} className="block py-2">
                  Home
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href="" className="block py-2">
                  About
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_SHOP} className="block py-2">
                  Shop
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href="" className="block py-2">
                  Products
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href="" className="block py-2">
                  Factories
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href="" className="block py-2">
                  Quotations
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex justify-between items-center gap-8">
            <button type="button">
              <IoIosSearch
                size={25}
                className="text-gray-500 hover:text-primary cursor-pointer"
              />
            </button>
            <Cart />

            {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount
                  size={25}
                  className="text-gray-500 hover:text-primary cursor-pointer"
                />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                </Avatar>
              </Link>
            )}

            <button
              type="button"
              className="lg:hidden block"
              onClick={() => setIsMobileMenu(true)}
            >
              <HiMiniBars3
                size={25}
                className="text-gray-500 hover:text-primary"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
