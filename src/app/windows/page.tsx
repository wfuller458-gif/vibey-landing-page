"use client";

import { useState } from "react";
import Link from "next/link";

export default function WindowsWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, platform: "windows" }),
      });
      setSubmitted(true);
    } catch {
      // Still show success - we'll handle storage separately
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121418] overflow-x-hidden overflow-y-auto">
      {/* Header - identical to main page */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 max-w-[1280px] mx-auto backdrop-blur-sm">
        <Link href="/">
          <img src="/vibeycodeslogo.png" alt="Vibey.codes" className="h-8" />
        </Link>
        {/* Empty div to maintain justify-between spacing like main page */}
        <div></div>
      </header>

      {/* Content centered vertically */}
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)] px-4 md:px-8">
        <div className="max-w-md w-full text-center">
        <h1 className="font-[family-name:var(--font-lexend)] font-bold text-3xl md:text-4xl text-white mb-4">
          Windows Coming Soon
        </h1>

        <p className="font-[family-name:var(--font-atkinson)] text-[#d0d0d1]/80 mb-8">
          Sorry, the Windows app is not quite ready yet. If you want a Windows version of Vibey.code, sign up to the waitlist to register your interest.
        </p>

        {submitted ? (
          <div className="bg-[#1c1e22] border border-[#28c840] rounded-lg p-6">
            <p className="font-[family-name:var(--font-atkinson)] text-[#28c840]">
              Thanks! We&apos;ll let you know when the Windows version is ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-[#1c1e22] border border-[#242529] rounded-lg px-4 py-3 text-white placeholder-[#d0d0d1]/40 focus:outline-none focus:border-[#0459fe]"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0459fe] text-white py-3 rounded-lg font-[family-name:var(--font-atkinson)] hover:bg-[#0349d4] transition-colors disabled:opacity-50"
            >
              {loading ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}
