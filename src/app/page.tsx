
"use client";

import EmailAnalysis from "@/components/EmailAnalysis";
import URLAnalysis from "@/components/URLAnalysis";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [emailContent, setEmailContent] = useState("");

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 bg-phishguard-secondary">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6 text-gray-800">PhishGuard</h1>

      <EmailAnalysis />

      <URLAnalysis />

      <section className="mt-8 w-full max-w-2xl p-6 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Community Reporting
        </h2>
        <p className="text-gray-700">
          Report suspected phishing emails or URLs for community review and model
          retraining.
        </p>
        {/* Add a form here to submit emails/URLs */}
      </section>
    </div>
  );
}
