"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://vibey-backend-production-5589.up.railway.app";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [license, setLicense] = useState<{ key: string; plan: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchLicense() {
      if (!sessionId) {
        setError("No session ID found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/license/${sessionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch license");
        }
        const data = await response.json();
        setLicense(data);
      } catch (err) {
        setError("Could not retrieve license. Please contact support.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLicense();
  }, [sessionId]);

  const copyToClipboard = () => {
    if (license?.key) {
      navigator.clipboard.writeText(license.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <h1 className="font-[family-name:var(--font-lexend)] font-bold text-2xl text-white mb-4">
        Welcome to Vibey!
      </h1>

      {loading ? (
        <div className="text-[#d0d0d1] mb-6">Loading your license...</div>
      ) : error ? (
        <div className="text-red-400 mb-6">{error}</div>
      ) : license ? (
        <>
          <p className="text-[#d0d0d1] mb-4">
            Thank you for subscribing! Here&apos;s your license key:
          </p>

          {/* License Key Display */}
          <div className="bg-[#121418] border-2 border-[#0459fe] rounded-lg p-4 mb-6">
            <p className="font-mono text-xl text-[#0459fe] font-bold tracking-wider mb-2">
              {license.key}
            </p>
            <p className="text-sm text-[#d0d0d1]/60">
              {license.plan === "monthly" ? "Monthly" : "Yearly"} Plan
            </p>
            <button
              onClick={copyToClipboard}
              className="mt-3 text-sm text-[#0459fe] hover:underline"
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>

          <div className="bg-[#121418] border border-[#242529] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#d0d0d1]/60 mb-2">Next steps:</p>
            <ol className="text-left text-sm text-[#d0d0d1] space-y-2">
              <li className="flex gap-2">
                <span className="text-[#0459fe]">1.</span>
                Download Vibey for your Mac
              </li>
              <li className="flex gap-2">
                <span className="text-[#0459fe]">2.</span>
                Open the app and enter your license key
              </li>
              <li className="flex gap-2">
                <span className="text-[#0459fe]">3.</span>
                Start building with Claude Code!
              </li>
            </ol>
          </div>

          <p className="text-xs text-[#d0d0d1]/40 mb-6">
            Save this key somewhere safe!
          </p>
        </>
      ) : null}
    </>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#121418] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1c1e22] border border-[#242529] rounded-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <Suspense fallback={<div className="text-[#d0d0d1]">Loading...</div>}>
          <SuccessContent />
        </Suspense>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-[#0459fe] text-white py-3 rounded-lg font-[family-name:var(--font-atkinson)] hover:bg-[#0349d4] transition-colors inline-block"
          >
            Download Vibey
          </Link>
          <Link href="/" className="text-[#0459fe] text-sm hover:underline">
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
