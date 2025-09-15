import React from "react";
import logo from "@/public/assets/FESTOVEE_LOGO_ONLY.png";
import Image from "next/image";
import Link from "next/link";
import { WEBSITE_LOGIN, WEBSITE_REGISTER } from "@/routes/WebsiteRoute";
import { IoLocation, IoPhoneLandscape } from "react-icons/io5";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 border-t">
      <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4">
        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <Image
            width={55}
            height={55}
            alt="s"
            src={logo.src}
            className="mb-2"
          />
          <p className="text-gray-500 text-sm">
            Welcome to Festovee Multi Tenant E-Commerce. Lets grow together!!
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Categories</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href="">Handlooms</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Raw Materials</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Spare Parts</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Textiles</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Pharmacuticles</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Useful Links</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href="">Home</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">About</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_REGISTER}>Register</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_LOGIN}>Login</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Testamonials</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Help Center</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href="">My Account</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Privacy Policy</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Terms and Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Contact</h4>
          <ul>
            <li className="mb-2 text-gray-500 flex gap-2">
              <IoLocation size={20} />
              <span className="text-sm">E-Store Uttarakhand, India 248002</span>
            </li>
            <li className="mb-2 text-gray-500 flex gap-2">
              <MdOutlinePhone size={20} />
              <Link href="" className="text-sm">
                tel: +91-9516950840
              </Link>
            </li>
            <li className="mb-2 text-gray-500 flex gap-2">
              <MdOutlineMail size={20} />
              <Link href="" className="text-sm">
                support@estore.com
              </Link>
            </li>
          </ul>
          <div className="flex gap-5 mt-5">
            <Link href="">
              <FaYoutube className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaInstagram className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaWhatsapp className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaFacebook className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaTwitter className="text-primary" size={25} />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-5 bg-gray-100">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Festovee. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
