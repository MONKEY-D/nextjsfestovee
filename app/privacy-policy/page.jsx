"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">Privacy Policy</h1>
      <p className="text-sm text-gray-600 text-center">
        Effective Date: [Insert Date] | Last Updated: [Insert Date]
      </p>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Introduction</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            Festovee Private Limited (“Festovee,” “we,” “our,” or “us”) respects
            your privacy and is committed to protecting the personal information
            you share with us. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website{" "}
            <a
              href="https://www.festovee.com"
              className="underline text-blue-600"
            >
              www.festovee.com
            </a>{" "}
            (the “Website”) and when you use any related services. By accessing
            or using our Website, you agree to the terms of this Privacy Policy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <h3 className="font-semibold">a) Personal Information</h3>
          <p>
            Information you voluntarily provide when you register, subscribe,
            fill forms, or participate in surveys. May include: Name, business
            name, job title, email, phone, address, business registration, login
            credentials.
          </p>

          <h3 className="font-semibold">b) Business & Transactional Data</h3>
          <p>
            Product listings, pricing, transaction history, order details,
            payment preferences, and shipping information (if applicable).
          </p>

          <h3 className="font-semibold">
            c) Automatically Collected Information
          </h3>
          <p>
            IP address, browser type, operating system, pages viewed, time spent
            on site, referring URLs, device identifiers, and location (if
            enabled) via cookies and analytics tools.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            2. How We Use Your Information
          </h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            We use your data to operate and maintain the Website, onboard
            factories and suppliers, process transactions, respond to inquiries,
            send marketing updates (with consent), improve user experience, and
            comply with legal obligations.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">3. Sharing & Disclosure</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Business partners & service providers</li>
            <li>Legal authorities as required by law</li>
            <li>Business transfers in case of merger or acquisition</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">4. Cookies & Tracking</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            We use cookies, pixels, and analytics tools to remember preferences,
            track usage, and deliver targeted marketing. You can control cookies
            in your browser, but some features may not function.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">5. Data Retention</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            We retain data only as long as needed to fulfill purposes, comply
            with legal requirements, and resolve disputes. Data is securely
            deleted or anonymized when no longer needed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">6. Data Security</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            Industry-standard security measures are implemented to protect your
            data, but no method is 100% secure.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">7. Your Privacy Rights</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            Depending on your jurisdiction, you may access, update, or delete
            your information, withdraw consent, restrict processing, or request
            a copy. Contact:{" "}
            <a
              href="mailto:privacy@festovee.com"
              className="underline text-blue-600"
            >
              privacy@festovee.com
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Additional sections: Third-Party Links, Children’s Privacy, International Transfers, Changes, Contact Us */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">12. Contact Us</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            Festovee Private Limited
            <br />
            Email:{" "}
            <a
              href="mailto:privacy@festovee.com"
              className="underline text-blue-600"
            >
              privacy@festovee.com
            </a>
            <br />
            Website:{" "}
            <a
              href="https://www.festovee.com"
              className="underline text-blue-600"
            >
              www.festovee.com
            </a>
            <br />
            [Insert Physical Office Address]
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
