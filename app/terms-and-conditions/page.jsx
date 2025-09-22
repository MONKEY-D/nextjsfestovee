"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">Terms & Conditions</h1>
      <p className="text-sm text-gray-600 text-center">
        Effective Date: [Insert Date] | Last Updated: [Insert Date]
      </p>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Welcome</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            Welcome to Festovee Private Limited (“Festovee,” “we,” “our,” or
            “us”). These Terms & Conditions (“Terms”) govern your access to and
            use of our website{" "}
            <a
              href="https://www.festovee.com"
              className="underline text-blue-600"
            >
              www.festovee.com
            </a>{" "}
            (“Website”) and any related services, applications, or platforms
            (collectively, the “Services”).
          </p>
          <p>
            By accessing or using our Website, registering as a buyer or seller,
            or engaging in transactions on Festovee, you acknowledge that you
            have read, understood, and agreed to be bound by these Terms, as
            well as our{" "}
            <a href="/privacy-policy" className="underline text-blue-600">
              Privacy Policy
            </a>
            . If you do not agree, please do not use our Website or Services.
          </p>
        </CardContent>
      </Card>

      {/* Repeat Cards for each section for readability */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">1. Definitions</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            <strong>User:</strong> Any person or entity accessing or using the
            Website, including buyers, factories, suppliers, and visitors.
          </p>
          <p>
            <strong>Buyer:</strong> Any registered business purchasing products
            through Festovee.
          </p>
          <p>
            <strong>Supplier/Factory:</strong> Any registered entity selling
            products through Festovee.
          </p>
          <p>
            <strong>Account:</strong> The unique profile created by a User to
            access Festovee’s Services.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">2. Eligibility</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            You must be 18 years or older and capable of forming a legally
            binding contract under applicable law.
          </p>
          <p>
            If registering on behalf of a business, you represent that you have
            the authority to bind that business to these Terms.
          </p>
          <p>
            Festovee may request proof of identity, business registration, GST
            details, or other documentation to verify eligibility.
          </p>
        </CardContent>
      </Card>

      {/* Example for other sections */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            3. Account Registration & Responsibilities
          </h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            You must create an account and provide accurate, complete, and
            current information.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your
            login credentials and for all activities under your account.
          </p>
          <p>
            Notify us immediately at{" "}
            <a
              href="mailto:support@festovee.com"
              className="underline text-blue-600"
            >
              support@festovee.com
            </a>{" "}
            if you suspect unauthorized use of your account.
          </p>
          <p>
            Festovee reserves the right to suspend or terminate accounts if
            false, misleading, or fraudulent information is provided.
          </p>
        </CardContent>
      </Card>

      {/* Continue with Cards for Platform Nature, User Obligations, Product Listings, etc. */}

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">18. Contact Us</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            For any questions, concerns, or complaints regarding these Terms,
            please contact:
          </p>
          <ul className="list-disc list-inside">
            <li>Festovee Private Limited</li>
            <li>
              Email:{" "}
              <a
                href="mailto:support@festovee.com"
                className="underline text-blue-600"
              >
                support@festovee.com
              </a>
            </li>
            <li>
              Website:{" "}
              <a
                href="https://www.festovee.com"
                className="underline text-blue-600"
              >
                www.festovee.com
              </a>
            </li>
            <li>[Insert Physical Office Address]</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage;
